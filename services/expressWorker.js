console.log("expressWorker started")

const queue = require('../store/queue');
const redis = require('../store/redis');
const models = require('../models');
const async = require('async');
const fs = require('fs');


function processExpressJob(){

  //Deque and process job
  queue.process(function (job, done) {
    console.log(`Processing Job ${job.id}`);

    const prefixCode =
      models.PrefixCodes.find({
        where: {
          framework: 'Express'
        }
      })


    const suffixCode =
      models.SuffixCodes.find({
        where: {
          framework: 'Express'
        }
      })


    async function formResponse() {
      var file = ""
      var prefix = await prefixCode;

      file = await file.concat(prefix.code);
      file = await file.concat(job.data.code);

      var suffix = await suffixCode;
      file = await file.concat(suffix.code);
      await fs.writeFileSync("ExpressDriver/routes/runCode.js", file);

    }

    formResponse().then( () => {
        return done(null,"Success");

      });


    //return done(null,job.data.framework);
  })
}



processExpressJob();

process.on('SIGINT', function() {
   db.stop(function(err) {
     process.exit(err ? 1 : 0);
   });
});
