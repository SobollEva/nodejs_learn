const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (input) => {
    const inputArr = input.split(' ');
    let outputArr = [];
    inputArr.forEach(item => {
        outputArr.push(item.split('').reverse().join(''));
    });
    console.log(outputArr.join(' '));
});
