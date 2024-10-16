const { Kafka } = require('kafkajs');

//creating a kafka client
exports.kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

