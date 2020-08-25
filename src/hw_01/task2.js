const fs = require('fs');
const csv = require('csvtojson');
const {pipeline} = require('stream');

const filePath = './csv/file.csv';
const filePathTxt = './hw_01/file.txt';

pipeline(
    csv().fromFile(filePath),
    fs.createWriteStream(filePathTxt),
    (error) => {
        console.error(error)
    }
);
