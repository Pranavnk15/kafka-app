const {kafka} = require("./client");
const group = process.argv[2];

//consumer consumes the data from the topics associated with

async function init() {
    //creating consumer
    const consumer = kafka.consumer({groupId: group});
    //connecting consumer
    await consumer.connect();

    //subscribing the consumer with the topic, and making frombeginning from true, which \
    //means to gives the message from the start
    await consumer.subscribe({topics: ["rider-updates"], fromBeginning: true});

    //consumer runs, on topics, and fetches each message
    //and here the logic is performed on the data
    await consumer.run({
        eachMessage: async ({ topic, partition, message, hearetbeat, pause}) => {
            console.log(`${group}: [${topic}]: PART:${partition}:`, message.value.toString());
        }
    });

    //disconnecting the consumer
    // await consumer.disconnect();
}

init();