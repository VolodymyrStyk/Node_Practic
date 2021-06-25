const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const userPath = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    const data = await fs.readFile(userPath, 'utf-8');
    let dataResponse = JSON.parse(data);
    const {sortParam, findName, findAge} = req.query;
    switch (sortParam) {
        case 'ageAsc':
            dataResponse.sort((a, b) => Number(a.age) - Number(b.age));
            break;
        case 'ageDesc':
            dataResponse.sort((a, b) => Number(b.age) - Number(a.age));
            break;
        case 'nameAsc':
            dataResponse.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            break;
        case 'nameDesc':
            dataResponse.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
            break;
    }
    if (findName) {
        dataResponse = dataResponse.filter(user => user.name === findName);
    }

    if (findAge) {
        dataResponse = dataResponse.filter(user => user.age === findAge);
    }

    res.json(dataResponse);
});

app.get('/:id', async (req, res) => {
    const data = await fs.readFile(userPath, 'utf-8');
    const dataResponse = JSON.parse(data);
    const {id} = req.params;
    const userData = dataResponse[id];

    res.json(userData);
});

app.put('/:id', async (req, res) => {
    const data = await fs.readFile(userPath, 'utf-8');
    const body = req.body;
    const dataResponse = JSON.parse(data);
    const {id} = req.params;
    dataResponse[id] = body;

    const writeData = await fs.writeFile(userPath, JSON.stringify(dataResponse), 'utf-8');

    res.json(body);
});

app.post('/', async (req, res) => {
    const body = req.body;
    const dataRead = await fs.readFile(userPath, 'utf-8');
    const users = JSON.parse(dataRead);
    users.push(body);

    const writeData = await fs.writeFile(userPath, JSON.stringify(users), 'utf-8');

    res.json(body);
});

app.delete('/:id', async (req, res) => {
    const data = await fs.readFile(userPath, 'utf-8');
    const dataResponse = JSON.parse(data);
    const {id} = req.params;
    dataResponse.splice(id, 1);

    const writeData = await fs.writeFile(userPath, JSON.stringify(dataResponse), 'utf-8');

    res.json(dataResponse);
});

app.listen(3000, () => {
    console.log('App listen 3000');
});