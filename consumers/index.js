const amqp = require("amqplib");
const { RABBITMQ_PROTOCOL, FIB_QUEUE1, FIB_QUEUE2 } = require("../constants");


class Consumer {
  constructor(queueType) {
    this.queueType = queueType;
  }
  consume = async () => {
    try {
      const connection = await amqp.connect(RABBITMQ_PROTOCOL);
      const channel = await connection.createChannel();
      await channel.assertQueue(this.queueType);
      channel.consume(this.queueType, (message) => {
        const msg =  JSON.parse(message.content.toString());
        console.log(`payload at ${this.queueType}:  + ${msg}`);
        if (msg.queue === this.queueType) {
          console.log("acking messag from " + this.queueType);
          channel.ack(message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const consumer1 = new Consumer(FIB_QUEUE1);
consumer1.consume()
console.log(consumer1)

const consumer2 = new Consumer(FIB_QUEUE2);
consumer2.consume()

// module.exports = consumer1;
