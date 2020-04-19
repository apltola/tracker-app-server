const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
  
    const token = jwt.sign({ userId: user._id }, 'super_salainen_avain');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid email or password' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'super_salainen_avain');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid email or password' });
  }
});

module.exports = router;