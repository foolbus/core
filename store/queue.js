const Queue = require('bee-queue');


console.log("Creating Queue")
const queue = new Queue('writeQueue');

console.log('*********',queue);


module.exports = queue;
