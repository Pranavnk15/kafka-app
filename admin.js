const {kafka} = require('./client');

//admin does the work of seting up the kafka, partition, topics 

async function init() {
    const admin = kafka.admin();
    console.log('Admin Connecting...');
    await admin.connect();
    console.log("Admin Connected");

    console.log("Creating topic [rider-updates]");
    await admin.createTopics({
        topics: [{
            topic: "rider-updates",
            numPartitions: 2,
        }]
    })
    console.log("Created topic Success [rider-updates]");

    console.log("disconnecting admin..");
    
    await admin.disconnect();
}

init();