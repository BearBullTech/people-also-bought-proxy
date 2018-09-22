const fs = require('fs');
const path = require('path');
const companyArray = require('./companyID.js');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function timesAndPrice() {
  const x = 10;
  const times = [];
  let tt = 360;
  const ap = ['am', 'pm'];

  for (let i = 0; tt < 15.1 * 60; i++) {
    const hh = Math.floor(tt / 60);
    const mm = (tt % 60);
    const tempObj = {};
    tempObj.currentTime = `${(`0${hh % 12}`).slice(-2)}:${(`0${mm}`).slice(-2)}${ap[Math.floor(hh / 12)]}`;
    tempObj.currentPrice = parseFloat(((Math.random() * Math.floor(500)) + 50).toFixed(2));
    times.push(tempObj);
    // times.push(JSON.stringify(tempObj));
    tt += x;
  }
  return times;
}

const test = (x) => {
  const results = [];
  const groups = [1, 2, 3, 4, 5, 6, 7, 8];
  let j = 0;
  for (let i = 0; i < x; i++) {
    if (j === 8) {
      j = 0;
    }
    const obj = {
      _id: companyArray[i]._id,
      company: companyArray[i].companyName,
      companyAbbr: companyArray[i].companyAbbriev,
      percentage: getRandomIntInclusive(1, 99),
      group: groups[j],
      currentDay: timesAndPrice(),
    };
    j++;
    results.push(obj);
  }
  return results;
};

const output = test(100);

fs.writeFile(
  path.join(__dirname, 'companies.json'),
  JSON.stringify(output),
  (err) => {
    if (err) return console.log(err);
  },
);
