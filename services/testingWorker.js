console.log("Testing Worker Started");


const queue = require('../store/testingQueue');
const redis = require('../store/redis');
const models = require('../models');
const async = require('async');
const fs = require('fs');

const newman = require('newman');


function processTestingJob() {
  queue.process((job, done) => {
      const collection = job.data.collection_url;
      const port = job.data.port;
      console.log(port);
      console.log(collection)

      newman.run({
        collection: require('../collections/testingFoolbus.postman_collection.json'),
        environment: {
          	"id": "0f45bf17-42d9-48b7-8923-feda27a485b2",
          	"name": "foolBus testing",
          	"values": [
          		{
          			"key": "port",
          			"value":port,
          			"type": "text",
          			"description": "",
          			"enabled": true
          		}
          	],
          	"_postman_variable_scope": "environment",
          	"_postman_exported_at": "2018-11-01T23:25:19.041Z",
          	"_postman_exported_using": "Postman/6.4.4"
          }
      }).on('start', function(err, args) {
        console.log("running a collection");
      }).on('request',function(err,response){
        console.log(response.response);
        console.log(response.request);
      }).on('assertion',function(err, summ){
        console.log(summ);
      }).on('done', function(err, summary) {
        console.log(summary.run.stats)
        if (err || summary.error) {
          console.error('collection run encountered an error.');
        } else {
          console.log(summary.run.stats.assertions)
          return done(null, summary.run.stats.assertions);
        }
      })
    });
  }

  processTestingJob();
