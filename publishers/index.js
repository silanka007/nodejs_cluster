const amqp = require("amqplib");
const { RABBITMQ_PROTOCOL, FIB_QUEUE2, FIB_QUEUE1 } = require("../constants");

async function publisher1(num) {
  try {
    const connection = await amqp.connect(RABBITMQ_PROTOCOL);
    const channel = await connection.createChannel();
    await channel.assertQueue(FIB_QUEUE1);
    console.log("publisher1 reporting to duty...");
    const message = {
      queue: FIB_QUEUE1,
      payload: num,
    };
    channel.sendToQueue(FIB_QUEUE1, Buffer.from(JSON.stringify(message)));
  } catch (error) {
    console.log(error);
  }
}

async function publisher2(num) {
  try {
    const connection = await amqp.connect(RABBITMQ_PROTOCOL);
    const channel = await connection.createChannel();
    await channel.assertQueue(FIB_QUEUE2);
    console.log("publisher2 reporting to duty...");
    const message = {
      queue: FIB_QUEUE2,
      payload: num,
    };
    channel.sendToQueue(FIB_QUEUE2, Buffer.from(JSON.stringify(message)));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { publisher1, publisher2 };
