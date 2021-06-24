const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const userPath = path.join(__dirname,'users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
