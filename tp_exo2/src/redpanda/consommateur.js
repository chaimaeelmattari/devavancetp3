import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    brokers: ['localhost:19092'],
});

const consommateur = kafka.consumer({ groupId: 'my-consumer-group' });

export const connect = async (topic) => {
    await consommateur.connect();
    await consommateur.subscribe({ topic: topic, fromBeginning: true });
    console.log(`Connecté au topic: ${topic}`);
};

export const startConsumer = async () => {
    await consommateur.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            const words = message.value.toString().split(/\s+/);
            words.forEach(word => {
                console.log({
                    key: message.key ? message.key.toString() : null,
                    word: word,
                    headers: message.headers,
                });
            });

            await heartbeat();
        },
    });
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
    return `${formattedDate} at ${formattedTime}`;
};
