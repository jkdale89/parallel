'use strict'

let util = require('util')
    , events = require('events')
    , buffer = 3000 // in ms
    , range = 90
    , groupSize = 10
    , buckets = range / groupSize
    , cur = 0
    , totalTime = 0;


let para = function (jobs, start, width) {
  console.time("this job");
    let del = Math.floor(Math.random()* buffer) + 1000;
    setTimeout(function() {
        cur++;
        console.timeEnd("this job");
        for(let i = start + 1; i <= start + width; i++){
          console.log(i)
        }
        if(cur >= buckets) {
          console.log("Let's finish this up!");
          jobs.activate();
        }
    }, del);
}

function Jobs() {
    events.EventEmitter.call(this);
}

util.inherits(Jobs, events.EventEmitter);

Jobs.prototype.activate = function() {
    this.emit('ready');
}

let jobs = new Jobs();

jobs.on('ready', function(data) {
    for(let i = range + 1; i <= range + groupSize; i++){
      console.log(i);
    }
    console.timeEnd("Total Time")

});

console.time("Total Time")
for(let j = 0; j < 9; j++){
  para(jobs, j * groupSize, groupSize)
}
