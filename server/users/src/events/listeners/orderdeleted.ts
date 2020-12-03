// import { Listener, OrderDeletedEvent, Subjects } from '@aashas/common';
// import { Message } from 'node-nats-streaming';

// import { Order } from '../../models/Orders';
// import { queueGroupName } from '../queueGroupName';

// export class OrderDeletedListener extends Listener<OrderDeletedEvent> {
//   queueGroupName = queueGroupName;
//   readonly subject = Subjects.OrderDeleted;

//   async onMessage(data: OrderDeletedEvent['data'], msg: Message) {
//     try {
//       const { orderID, version } = data;

//       const order = await Order.findByEvent({
//         id: orderID,
//         version: version,
//       });

//       if (!order) throw new Error('order not found');

//       await order.remove();

//       process.env.NODE_ENV !== 'test' && console.log('Order Deleted');

//       msg.ack();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
