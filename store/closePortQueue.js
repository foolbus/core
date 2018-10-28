const Queue = require('bee-queue');

console.log("Creating Close port Queue");

const queue = new Queue('closePortQueue',{
  delayedDebounce: 1000
});


module.exports = queue;
