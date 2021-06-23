const createDiretories = require('./src/create_folders');
const divideUsersByDirs = require('./src/divideUsersByDirs');
const users = require('./src/users');
const dirNameArr = ['manOlder20', 'manYonger20', 'womanOlder20', 'womanYonger20'];

createDiretories(dirNameArr);
divideUsersByDirs(users);
