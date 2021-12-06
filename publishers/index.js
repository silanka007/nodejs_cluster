const amqp = require("amqplib");
const { RABBITMQ_PROTOCOL, FIB_QUEUE2, FIB_QUEUE1 } = require("../constants");

async function publisher1(num) {
  try {
    const connection = await amqp.connect(RABBITMQ_PROTOCOL);
    const channel = await connection.createChannel();
    await channel.assertQueue(FIB_QUEUE1);
    await channel.sendToQueue(FIB_QUEUE1, num);
  } catch (error) {
    console.log(error);
  }
}

async function publisher2(num) {
  try {
    const connection = await amqp.connect(RABBITMQ_PROTOCOL);
    const channel = await connection.createChannel();
    await channel.assertQueue(FIB_QUEUE2);
    await channel.sendToQueue(num);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { publisher1, publisher2 };
