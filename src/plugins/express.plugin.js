const express = require('express');
const cors = require('cors'); // Importa CORS
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.static('public')); 

module.exports = app;
