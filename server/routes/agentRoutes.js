const express = require('express');
const router = express.Router();
const { addAgent, getAgents } = require('../controllers/agentController');
const auth = require('../middlewares/authMiddleware'); // We'll create this next

// @route   POST api/agents
// @desc    Add a new agent
// @access  Private
router.post('/', auth, addAgent);

// @route   GET api/agents
// @desc    Get all agents
// @access  Private
router.get('/', auth, getAgents);


module.exports = router;