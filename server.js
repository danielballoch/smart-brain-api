const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
//import controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

//get database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'j*bl6sS',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});


app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send(db.users);
})

//dependency injection (req, res) => {regi... (req, res, db, bcrypt)} means we don't have to import in the file itself, like passing props.

//link controllers
//sign in
//two ways of refactoring
app.post('/signin', signin.handleSignin(db, bcrypt))
//register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
//user
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
//image
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

//set local port
app.listen(3000, () => {
    console.log('app is running on port 3000')
})


/*
API Plan: 

--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT = user/count




*/