const { Router } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const route = require('./route');
const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    id: Number,
  });

const User = mongoose.model('User', userSchema);

const silence = new User({ name: 'Silence' });
console.log(silence.name); 

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

route(app);

app.listen(3000);
console.log('started');