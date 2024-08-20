import Users from '../models/user.js';

import express from 'express';
const router = express.Router();

// Create or Update number
router.post('/number',async (req, res) => {
  try {

    const { userId, number } = req.body;

    if (!userId || userId.trim() === '') {
      return res.status(400).json({ error: 'userId is required' });
    }

    const numberRegex = /^[1-9]\d*$/;
    if (!number || !numberRegex.test(number)) {
      return res.status(400).json({ error: 'number is required' });
    }

    const user = await Users.findOneAndUpdate({ userId: userId }, { userId:userId, number:number }, { upsert: true, new: true })

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create or Update character
router.post('/character',async (req, res) => {
  try {

    const { userId, character } = req.body;

    if (!userId || userId.trim() === '') {
      return res.status(400).json({ error: 'userId is required' });
    }

    const characterRegex = /^[a-zA-Z]$/;
    if (!character || !characterRegex.test(character)) {
      return res.status(400).json({ error: 'Single character is required' });
    }
    
    const user = await Users.findOneAndUpdate({ userId: userId }, { userId, character }, { upsert: true, new: true })
    

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
      const users = await Users.find();
      res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await Users.findOne({userId: req.params.id});
    if (!user) {
      return res.status(400).json({ message: 'Users not found' });
    }

    let errorMessage=''
    const characterError = 'Missing Character' 
    const numberError = 'Missing number' 
    if (!user.character) {
      errorMessage = characterError ;
    }

    if (!user.number) {
      errorMessage ? errorMessage = errorMessage + ", " + numberError : numberError
    }
    if (errorMessage) {
      return res.status(400).json({ error: errorMessage });
    }

    res.json(`result: ${user.character}_${user.number}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
