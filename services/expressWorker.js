console.log("expressWorker started")

const queue = require('../store/queue');
const testingQueue = require('../store/testingQueue');
const redis = require('../store/redis');
const models = require('../models');
const async = require('async');
const fs = require('fs');
const kill = require('kill-port')


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
      try{
        var file = ""
        var prefix = await prefixCode;

        file = await file.concat(prefix.code);
        file = await file.concat(job.data.code);

        var suffix = await suffixCode;
        file = await file.concat(suffix.code);


        await fs.writeFileSync("ExpressDriver/routes/runCode.js", file)

        console.log("File Written")
      }catch(err){
        console.log(err)
      }

    }

    formResponse().then( () => {
      var app = require('../ExpressDriver/app');
      const server = app.listen(0);
      var port = server.address().port;
      const jobData = {
        "port":port,
        "collection_url" : "collections/testingFoolbus.postman_collection.json"
      }
      console.log("Creating testing job!");
      const job = testingQueue.createJob(jobData);
      job.save();

      job.on('succeeded', (result) => {
        console.log("Succeeded testing phase");
        var retData = {
          "port": port,
          "assertion": result
        }
        return done(null,retData);
      });


    }).catch( (err) => {
      console.log(err);
    })


    //return done(null,job.data.framework);
  })
}

processExpressJob();
