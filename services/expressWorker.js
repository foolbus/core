console.log("expressWorker started")

const queue = require('../store/queue');
const redis = require('../store/redis');

function processExpressJob(){

  //Deque and process job
  queue.process(function (job, done) {
    console.log(`Processing Job ${job.id}`);
    console.log(`Process Data: ${job.data}`)
    return done(null,job.data.framework);
  })
}



processExpressJob();
process.on('SIGINT', function() {
   db.stop(function(err) {
     process.exit(err ? 1 : 0);
   });
});
