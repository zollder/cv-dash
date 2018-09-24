const moment = require('moment');

const workload = [
    { x: '2018-09-11T01:00:00-0400', y: 65 },
    { x: '2018-09-11T02:00:00-0400', y: 59 },
    { x: '2018-09-11T03:00:00-0400', y: 80 },
    { x: '2018-09-11T04:00:00-0400', y: 81 },
    { x: '2018-09-11T05:00:00-0400', y: 56 },
    { x: '2018-09-11T06:00:00-0400', y: 55 },
    { x: '2018-09-11T07:00:00-0400', y: 40 },
    { x: '2018-09-11T08:00:00-0400', y: 15 },
    { x: '2018-09-11T09:00:00-0400', y: 80 },
    { x: '2018-09-11T10:00:00-0400', y: 90 },
    { x: '2018-09-11T11:00:00-0400', y: 34 },
    { x: '2018-09-11T12:00:00-0400', y: 2 },
    { x: '2018-09-11T13:00:00-0400', y: 0 },
    { x: '2018-09-11T14:00:00-0400', y: 0 },
    { x: '2018-09-11T15:00:00-0400', y: 0 },
    { x: '2018-09-11T16:00:00-0400', y: 0 },
    { x: '2018-09-11T17:00:00-0400', y: 0 },
    { x: '2018-09-11T18:00:00-0400', y: 0 },
    { x: '2018-09-11T19:00:00-0400', y: 0 },
    { x: '2018-09-11T20:00:00-0400', y: 0 },
    { x: '2018-09-11T21:00:00-0400', y: 0 },
    { x: '2018-09-11T22:00:00-0400', y: 0 },
    { x: '2018-09-11T23:00:00-0400', y: 0 },
    { x: '2018-09-11T24:00:00-0400', y: 0 }
];

function updateWorkload() {
    // add 5 min to last element's datetime
    const ts = moment(workload[workload.length -1].x).add(5, 'm');

    // generate value b/w 0 and 5
    const value = getRandomInt(0, 5);

    // add new object to the end, and remove the 1st one
    workload.push({ x: ts, y: value});
    workload.shift();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    workload,
    updateWorkload
};
