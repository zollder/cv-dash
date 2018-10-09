const moment = require('moment');

const workload = {
    current: { x: '2018-09-11T12:00:00-0400', y: 0 },
    today: [
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
};

function updateWorkload() {
    updateCurrent();
    updateToday();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateCurrent() {
    let time = moment(workload.current.x).add(5, 'm');
    let value = time.minutes() !== 0 ? workload.current.y + getRandomInt(0, 6) : getRandomInt(0, 6);
    let current = { x: time.toString(), y: value };
    console.log('Updating current to: ', current);
    workload.current = current;
}

function updateToday() {
    console.log('Updating today to: ', JSON.stringify(workload.current));
    let todayHour = moment(workload.today[0].x).hours();
    let current = moment(workload.current.x).minutes(0).seconds(0).milliseconds(0);
    if (current.hours() > todayHour) {
        workload.today.unshift({ x:current, y: workload.current.y });
        workload.today.pop();
        updateHistorical();
    } else {
        workload.today[0] = { x:current, y:workload.current.y };
    }
}

function updateHistorical() {
    let time = moment(workload.historical[0].x).add(60, 'm');
    let value = getRandomInt(0, 90);
    workload.historical.unshift({ x: time.toString(), y: value });
    workload.historical.pop();
    console.log('Updating historical to: ', JSON.stringify(workload.historical[0]));
}

module.exports = {
    workload,
    updateWorkload
};
