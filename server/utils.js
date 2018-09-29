const moment = require('moment');

const workload = {
    today: [
        { x: '2018-09-11T24:00:00-0400', y: 10 },
        { x: '2018-09-11T23:00:00-0400', y: 15 },
        { x: '2018-09-11T22:00:00-0400', y: 25 },
        { x: '2018-09-11T21:00:00-0400', y: 50 },
        { x: '2018-09-11T20:00:00-0400', y: 65 },
        { x: '2018-09-11T19:00:00-0400', y: 87 },
        { x: '2018-09-11T18:00:00-0400', y: 49 },
        { x: '2018-09-11T17:00:00-0400', y: 35 },
        { x: '2018-09-11T16:00:00-0400', y: 20 },
        { x: '2018-09-11T15:00:00-0400', y: 15 },
        { x: '2018-09-11T14:00:00-0400', y: 6 },
        { x: '2018-09-11T13:00:00-0400', y: 3 },
        { x: '2018-09-11T12:00:00-0400', y: 2 },
        { x: '2018-09-11T11:00:00-0400', y: 34 },
        { x: '2018-09-11T10:00:00-0400', y: 90 },
        { x: '2018-09-11T09:00:00-0400', y: 80 },
        { x: '2018-09-11T08:00:00-0400', y: 15 },
        { x: '2018-09-11T07:00:00-0400', y: 40 },
        { x: '2018-09-11T06:00:00-0400', y: 55 },
        { x: '2018-09-11T05:00:00-0400', y: 56 },
        { x: '2018-09-11T04:00:00-0400', y: 81 },
        { x: '2018-09-11T03:00:00-0400', y: 80 },
        { x: '2018-09-11T02:00:00-0400', y: 59 },
        { x: '2018-09-11T01:00:00-0400', y: 65 }
    ],
    historical: [
        { x: '2018-09-11T24:00:00-0400', y: 20 },
        { x: '2018-09-11T23:00:00-0400', y: 43 },
        { x: '2018-09-11T22:00:00-0400', y: 12 },
        { x: '2018-09-11T21:00:00-0400', y: 8 },
        { x: '2018-09-11T20:00:00-0400', y: 18 },
        { x: '2018-09-11T19:00:00-0400', y: 34 },
        { x: '2018-09-11T18:00:00-0400', y: 39 },
        { x: '2018-09-11T17:00:00-0400', y: 48 },
        { x: '2018-09-11T16:00:00-0400', y: 67 },
        { x: '2018-09-11T15:00:00-0400', y: 56 },
        { x: '2018-09-11T14:00:00-0400', y: 14 },
        { x: '2018-09-11T13:00:00-0400', y: 6 },
        { x: '2018-09-11T12:00:00-0400', y: 19 },
        { x: '2018-09-11T11:00:00-0400', y: 20 },
        { x: '2018-09-11T10:00:00-0400', y: 63 },
        { x: '2018-09-11T09:00:00-0400', y: 87 },
        { x: '2018-09-11T08:00:00-0400', y: 49 },
        { x: '2018-09-11T07:00:00-0400', y: 31 },
        { x: '2018-09-11T06:00:00-0400', y: 68 },
        { x: '2018-09-11T05:00:00-0400', y: 59 },
        { x: '2018-09-11T04:00:00-0400', y: 76 },
        { x: '2018-09-11T03:00:00-0400', y: 77 },
        { x: '2018-09-11T02:00:00-0400', y: 63 },
        { x: '2018-09-11T01:00:00-0400', y: 31 }
    ]
}

function updateWorkload() {
    // add 5 min to last element's datetime
    const ts = moment(workload.today[0].x).add(60, 'm');

    // generate value b/w 0 and 5
    let randomToday = getRandomInt(0, 6);
    let valueToday = workload.today[0].y;
    valueToday += randomToday % 2 ? randomToday : -randomToday;

    // add new object to the end, and remove the 1st one
    workload.today.unshift({ x: ts, y: valueToday});
    workload.today.pop();

    let randomHist = getRandomInt(0, 6);
    let valueHist = workload.historical[0].y;
    valueHist += randomHist % 2 ? randomHist : -randomHist;

    // add new object to the end, and remove the 1st one
    workload.historical.unshift({ x: ts, y: valueHist});
    workload.historical.pop();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    workload,
    updateWorkload
};
