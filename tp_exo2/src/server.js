import { connect, startConsumer } from '../src/redpanda/consommateur.js';

const topic = 'mon-super-topic';

await connect(topic);


await startConsumer()