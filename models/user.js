const { Schema, model } = require("mongoose");

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  card: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        deviceId: {
          type: Schema.Types.ObjectId,
          ref: "Devices",
          required: true,
        },
      },
    ],
  },
});

user.methods.addToCard = function (addedDevice) {
  const itemsCloned = [...this.card.items];
  const deviceIndex = itemsCloned.findIndex(
    (device) => device.deviceId.toString() === addedDevice.id.toString()
  );
  if (deviceIndex >= 0) {
    itemsCloned[deviceIndex].count = itemsCloned[deviceIndex].count + 1;
  } else {
    itemsCloned.push({
      count: 1,
      deviceId: addedDevice.id,
    });
  }
  this.card = {items: itemsCloned}
  return this.save()
}; 

module.exports = model("User", user);
