import { Model, Document } from 'mongoose';
import { paymentStatus, paymentModes, size } from './enums';
import { outfit } from './ProductsModel';
import { address } from './UsersModel';

/**
 * An interface that describes the properties
 * that are required to create a new Order model
 */
interface orderAttrs {
  userId: string;
  payment: {
    status: paymentStatus;
    method?: paymentModes;
  };
  email?: string;
  mobile?: number;
  items: {
    prodId: string;
    title: string;
    description: string;
    size: size;
    price: number;
    color: string;
    outfit: outfit;
    images: string[];
    discount: number;
    inOffer: boolean;
  }[];
  note?: string;
  status: string;
  estDelivery?: string;
  address: address;
  orderDate: string;
  deliveryDate?: string;
  price: {
    productTotal: number;
    discountPrice: number;
    totalAfterDiscount: number;
    tax: number;
    shippingCharges: number;
    totalAmount: number;
  };
}

/**
 * An interface that describes the properties
 * that a Order Model has
 */
interface OrderModel extends Model<OrderDoc> {
  build(attrs: orderAttrs): OrderDoc;
  findByEvent(event: { id: string; version: number }): Promise<OrderDoc | null>;
}

/**
 * An interface that describes the properties
 * hat a Order Document has
 */
interface OrderDoc extends Document {
  userId: string;
  payment: {
    status: paymentStatus;
    method?: paymentModes;
  };
  email?: string;
  mobile?: number;
  items: {
    prodId: string;
    title: string;
    description: string;
    size: size;
    price: number;
    color: string;
    outfit: outfit;
    images: string[];
    discount: number;
    inOffer: boolean;
  }[];
  note?: string;
  status: string;
  estDelivery?: string;
  address: address;
  orderDate: string;
  deliveryDate?: string;
  version: number;
  price: {
    productTotal: number;
    discountPrice: number;
    totalAfterDiscount: number;
    tax: number;
    shippingCharges: number;
    totalAmount: number;
  };
}

interface paymentStatusUpdate {
  payment: {
    status: paymentStatus;
    method?: paymentModes;
  };
}
interface orderStatusUpdate {
  status: string;
}

export {
  orderAttrs,
  OrderDoc,
  OrderModel,
  paymentStatusUpdate,
  orderStatusUpdate,
};
