import { Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}
/**
 * Base event listener
 */
export abstract class Publisher<T extends Event> {
  abstract readonly subject: T['subject'];
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }

        process.env.NODE_ENV !== 'test' &&
          console.log('Event published to subject', this.subject, data);
        resolve();
      });
    });
  }
}
