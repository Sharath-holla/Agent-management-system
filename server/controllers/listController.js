const xlsx = require('xlsx');
const Agent = require('../models/AgentModel');
const ListItem = require('../models/ListItemModel');

exports.uploadAndDistribute = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // 1. Fetch agents
    const agents = await Agent.find();
    if (agents.length < 5) {
      return res.status(400).json({ msg: `Need at least 5 agents to distribute. Found only ${agents.length}.` });
    }
    // As per requirement, distribute among 5 agents.
    const agentsForDistribution = agents.slice(0, 5);
    const agentCount = agentsForDistribution.length;

    // 2. Parse the uploaded file
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
        return res.status(400).json({ msg: "CSV file is empty or in an incorrect format." });
    }

    // 3. Validate format (check for required headers)
    const requiredHeaders = ['FirstName', 'Phone', 'Notes'];
    const headers = Object.keys(data[0]);
    const hasRequiredHeaders = requiredHeaders.every(header => headers.includes(header));
    
    if (!hasRequiredHeaders) {
        return res.status(400).json({ msg: `Invalid file format. Required headers are: ${requiredHeaders.join(', ')}` });
    }

    // 4. Clear previous list items to avoid duplicates on re-upload
    await ListItem.deleteMany({});

    // 5. Distribute items and create documents
    const listItemsToSave = data.map((row, index) => {
      const agentIndex = index % agentCount;
      const assignedAgentId = agentsForDistribution[agentIndex]._id;

      return {
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
        assignedAgent: assignedAgentId,
      };
    });

    // 6. Save to database
    await ListItem.insertMany(listItemsToSave);

    res.status(200).json({ msg: `${data.length} items have been successfully uploaded and distributed among ${agentCount} agents.` });
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).send('Server error during file processing.');
  }
};

// Get all distributed lists grouped by agent
exports.getDistributedLists = async (req, res) => {
    try {
        const lists = await ListItem.find().populate('assignedAgent', 'name email');
        
        // Group by agent
        const groupedByAgent = lists.reduce((acc, item) => {
            const agentId = item.assignedAgent._id.toString();
            if (!acc[agentId]) {
                acc[agentId] = {
                    agent: item.assignedAgent,
                    items: []
                };
            }
            acc[agentId].items.push(item);
            return acc;
        }, {});

        res.json(Object.values(groupedByAgent)); // Return as an array of groups
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}