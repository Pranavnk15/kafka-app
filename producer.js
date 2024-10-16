const { kafka } = require('./client');
const readline = require('readline');

//basincally creating a cmd interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

//producer send the data to the partition, to the topic

async function init() {
    //creating a producer
    const producer = kafka.producer();

    //coneecting producer
    console.log('Connecting Producer');
    await producer.connect();
    console.log('Connected Producer successfuly');

    //seting the start of the prompt in the cmd
    rl.setPrompt('> ');
    rl.prompt();

    //taking input from the user
    rl.on('line', async function (line) {
        const [riderName, location] = line.split(' ');
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: 'location-update',
                    value: JSON.stringify({ name: riderName, location }),
                },
            ]
        });
    }).on('close', async () => {
        await producer.disconnect();
        console.log("Producer disconnected");
    })

    //sending data to the topic
    // await producer.send({
    //     topic: 'rider-updates',
    //     messages: [
    //         {
    //             partition: 0,
    //             key: 'location-update',
    //             value: JSON.stringify({name: 'Tony stark', loc: "SOUTH"}),
    //         },
    //     ]
    // });
    //disconnecting producer
    // await producer.disconnect();
    // console.log("Producer disconnected");
}

init();