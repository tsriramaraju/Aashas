import {
  orderAttrs,
  OrderDoc,
  OrderModel,
  paymentModes,
  paymentStatus,
  size,
} from '@aashas/common';
import { model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const ordersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    payment: {
      status: {
        type: String,
        enum: [paymentStatus.failed, paymentStatus.paid, paymentStatus.pending],
        required: true,
      },
      method: {
        type: String,
        enum: [
          paymentModes.UPI,
          paymentModes.creditCard,
          paymentModes.debitCard,
          paymentModes.paytm,
        ],
      },
    },
    email: String,
    mobile: Number,
    items: [
      {
        prodId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        size: {
          type: String,
          required: true,
          enum: [size.L, size.M, size.S, size.XL, size.XS, size.XXL],
        },
        price: { type: Number, required: true },
        color: { type: String, required: true },
        outfit: {
          type: { type: String, required: true },
          occasion: { type: Object, required: true },
        },
        images: [{ type: String, required: true }],
        discount: { type: Number, required: true },
        inOffer: Boolean,
      },
    ],
    note: String,
    status: String,
    estDelivery: { type: Date },
    address: {
      name: { type: String, required: true },
      house: { type: String, required: true },
      location: { type: String, required: true },
      street: { type: String, required: true },
      pin: { type: Number, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    orderDate: { type: Date, required: true },
    deliveryDate: Date,
    price: {
      productTotal: { type: Number, required: true },
      discountPrice: { type: Number, required: true },
      totalAfterDiscount: { type: Number, required: true },
      tax: { type: Number, required: true },
      shippingCharges: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
  },
  {
    autoIndex: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ordersSchema.set('versionKey', 'version');
ordersSchema.plugin(updateIfCurrentPlugin);

ordersSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Order.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

ordersSchema.statics.build = (attrs: orderAttrs) => {
  return new Order(attrs);
};

const Order = model<OrderDoc, OrderModel>('order', ordersSchema);

export { Order };
