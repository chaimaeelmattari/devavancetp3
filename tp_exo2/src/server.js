import { connect, startConsumer } from '../src/redpanda/consommateur.js';

const topic = 'mon-super-topic';

// Connectez-vous au topic
await connect(topic);

// Démarrer le consommateur
await startConsumer()