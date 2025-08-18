const Agent = require('../models/AgentModel');

// Add a new agent
exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    let agent = await Agent.findOne({ email });
    if (agent) {
      return res.status(400).json({ msg: 'Agent already exists' });
    }

    agent = new Agent({ name, email, mobile, password });
    await agent.save();

    res.status(201).json({ msg: 'Agent created successfully', agent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
    try {
        const agents = await Agent.find().select('-password');
        res.json(agents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};