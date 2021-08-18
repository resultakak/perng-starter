var amqp = require("amqplib/callback_api");

const CONN_URL = "amqp://user:password@rabbitmq";

let ch = null;

amqp.connect(CONN_URL, function(error0, connection) {
  connection.createChannel(function(error1, channel) {
    ch = channel;
  });
});

const publishToQueue = async (queue, data) => {
  console.log("MQService", data);
  await ch.sendToQueue(queue, Buffer.from(data));
};

process.on("exit", () => {
  ch.close();
  console.log("Closing rabbitmq channel");
});

module.exports = publishToQueue;
