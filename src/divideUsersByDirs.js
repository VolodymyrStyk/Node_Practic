const fs = require('fs');
const path = require('path');

const divideUsersByDirs=(users)=>{
    users.forEach(user => {
        let userDir;
        const {gender, age} = user;

        if (gender === 'female') {
            age >= 20 ? userDir = 'womanOlder20' : userDir = 'womanYonger20';
        }
        if (gender === 'male') {
            age >= 20 ? userDir = 'manOlder20' : userDir = 'manYonger20';
        }

        const userFile = path.join(__dirname,'..',userDir, `${user.name}.txt`);
        const fileData = JSON.stringify(user);

        fs.writeFile(userFile, fileData, (err) => {
            if (err) console.log(err);
        })
    })
}

module.exports = divideUsersByDirs;
