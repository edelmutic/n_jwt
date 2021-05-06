const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require('./authRouter');

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://qwerty:qwerty123@cluster0.lqroj.mongodb.net/auth_roles?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.get('/', (req, res) => res.send('Hello there!'));
    app.listen(PORT, () => console.log(`🚀 Server Started on ${PORT}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
