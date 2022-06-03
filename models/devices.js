const { Schema, model } = require('mongoose');

const opts = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

const device = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  opts,
);

device.method('toClient', function () {
  const device = this.toObject();
  device.id = device._id;
  delete device._id;
  return device;
});

module.exports = model('Devices', device);

// const { v4: uuidv4 } = require("uuid");
// const fs = require("fs");
// const path = require("path");

// class Devices {
//   constructor(type, price, img) {
//     this.type = type;
//     this.price = price;
//     this.img = img;
//     this.id = uuidv4();
//   }

//   toJSON() {
//     return ({
//       type: this.type,
//       price: this.price,
//       img: this.img,
//       id: this.id,
//     });
//   }

//   async save() {
//     const devices = await Devices.getAll();
//     devices.push(this.toJSON());
//     return new Promise((res,rej)=>{
//       fs.writeFile(
//         path.join(__dirname, '..', 'data', 'devices.json'),
//         JSON.stringify(devices,null,2),
//         (err)=>{
//           if(err){
//             rej(err)
//           }else{
//             res()
//           }
//         }
//       )

//     })
//   }

//   static async update(changedDevice) {
//     const devices = await Devices.getAll();
//     const index = devices.findIndex(device=> device.id === changedDevice.id)
//     devices[index] = changedDevice
//     return new Promise((res,rej)=>{
//       fs.writeFile(
//         path.join(__dirname, '..', 'data', 'devices.json'),
//         JSON.stringify(devices, null, 2),
//         (err)=>{
//           if(err){
//             rej(err)
//           }else{
//             res()
//           }
//         }
//       )
//     })
//   }

//   static getAll() {
//     return new Promise((res, rej) => {
//       fs.readFile(
//         path.join(__dirname, "..", "data", "devices.json"),
//         "utf-8",
//         (err, content) => {
//           if (err) {
//             rej(err);
//           } else {
//             res(JSON.parse(content));
//           }
//         }
//       );
//     });
//   }
//   static async getById(id){
//     console.log(id, 'ID');
//     const devices = await Devices.getAll()
//     return devices.find(device=> device.id === id)
//   }
// }

// module.exports = Devices;
