// queue/turboQueue.js
import { Queue, QueueEvents } from "bullmq";

const connection = { host: '127.0.0.1', port: 6379 };

// Create QueueEvents first
export const queueEvents = new QueueEvents('turboQueue', { connection });

export const turboQueue = new Queue("turboQueue", {
  connection, events: queueEvents
});

// const turboQueue = new Queue("turboQueue", {
//   connection: { host: "127.0.0.1", port: 6379 }
// });

// export default turboQueue;
