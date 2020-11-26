import { Model, Types, Document } from 'mongoose';
import { BinaryOperatorToken, NumberLiteralType } from 'typescript';
import { paymentStatus, paymentModes, size } from './enums';
import { address } from './UsersModel';

/**
 * An interface that describes the properties
 * that are required to create a new Order model
 */
interface orderAttrs {
  userId: Types.ObjectId;
  payment: {
    status: paymentStatus;
    method?: paymentModes;
  };
  email?: string;
  mobile?: number;
  items: {
    tile: string;
    description: string;
    size: size;
    price: number;
    color: string;
    category: {
      main: string;
      sub: string;
    };
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
  findByEvent(event: {
    id: Types.ObjectId;
    version: number;
  }): Promise<OrderDoc | null>;
}

/**
 * An interface that describes the properties
 * hat a Order Document has
 */
interface OrderDoc extends Document {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  payment: {
    status: paymentStatus;
    method?: paymentModes;
  };
  email?: string;
  mobile?: number;
  items: {
    tile: string;
    description: string;
    size: size;
    price: number;
    color: string;
    category: {
      main: string;
      sub: string;
    };
    images: string[];
    discount: number;
    inOffer: boolean;
  }[];
  note?: string;
  status: string;
  estDelivery?: Date;
  address: address;
  orderDate: Date;
  deliveryDate?: Date;
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

export { orderAttrs, OrderDoc, OrderModel };
