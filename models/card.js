const { json } = require("express/lib/response");
const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "card.json");

class Card {
  static async add(addedDevice) {
    const card = await Card.fetch();
    const index = card.devices.findIndex(
      (device) => device.id === addedDevice.id
    );
    const candidate = card.devices[index];
    if (candidate) {
      //increment count
      
      candidate.count++;
      card.devices[index] = candidate;
    } else {
      // add device
      addedDevice.count = 1;
      card.devices.push(addedDevice);
    }
    card.sumPrice += +addedDevice.price;
    return new Promise((res, rej) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }

  static async remove(id){
    const card = await Card.fetch()
    const index = card.devices.findIndex(
      (device) => device.id === id
    );
    const device = card.devices[index]
    if(device.count === 1){
      //delete
      card.devices = card.devices.filter(device => device.id !== id)
      card.sumPrice -= +device.price
    }else{
      //change count
      device.count--
      card.sumPrice -= +device.price
    }
    return new Promise((res, rej) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) {
          rej(err);
        } else {
          res(card);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((res, rej) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          rej(err);
        } else {
          res(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;
