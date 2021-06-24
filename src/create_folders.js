const fs = require('fs');
const path = require('path');

const createDiretories = (directoriesName = []) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(
            directoriesName.forEach(dirName => {
                fs.mkdir(path.join(__dirname, '..', dirName), {recursive: true}, (err) => {
                    if (err) console.log(err);
                })
            })), 3000)
    })
}

module.exports = createDiretories;
