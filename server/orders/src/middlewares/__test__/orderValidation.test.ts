import {
  addressData,
  itemsData,
  orderData,
  priceData,
} from '../../dummy data/orders';
import { Request, Response, NextFunction } from 'express';
import { orderValidation } from '../orderValidation';
import { removeProperty } from '../../utils/removeProperty';
import { Types } from 'mongoose';
import {
  BadRequestError,
  categories,
  paymentStatus,
  size,
} from '@aashas/common';

describe('Order validation middleware test group', () => {
  it('should give Bad request error on not entering any input', async () => {
    const mockRequest = {
      body: {},
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order userId');
  });
  it('should give Bad request error on not entering userId ', async () => {
    const mockRequest = {
      body: removeProperty(orderData, 'userId'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order userId');
  });
  it('should give Bad request error on entering invalid userId ', async () => {
    const mockRequest = {
      body: { ...orderData, userId: '123' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order userId is not valid type');
  });
  it('should not give Bad request error on entering valid userId ', async () => {
    const mockRequest = {
      body: { ...orderData, userId: Types.ObjectId() },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on not entering status ', async () => {
    const mockRequest = {
      body: removeProperty(orderData, 'status'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order status');
  });
  it('should give Bad request error on entering invalid status ', async () => {
    const mockRequest = {
      body: { ...orderData, status: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order status is not String');
  });
  it('should not give Bad request error on entering valid status ', async () => {
    const mockRequest = {
      body: { ...orderData, status: 'updated' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on not entering orderDate ', async () => {
    const mockRequest = {
      body: removeProperty(orderData, 'orderDate'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order orderDate');
  });
  it('should give Bad request error on entering invalid orderDate ', async () => {
    const mockRequest = {
      body: { ...orderData, orderDate: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order orderDate is not String');
  });
  it('should not give Bad request error on entering valid orderDate ', async () => {
    const mockRequest = {
      body: { ...orderData, orderDate: Date.now().toString() },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on not entering payment ', async () => {
    const mockRequest = {
      body: removeProperty(orderData, 'payment'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order payment');
  });

  it('should give Bad request error on entering invalid payment status ', async () => {
    const mockRequest = {
      body: { ...orderData, payment: { status: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(
      'Entered order payment:status is not valid payment status'
    );
  });
  it('should give Bad request error on entering invalid payment status ', async () => {
    const mockRequest = {
      body: { ...orderData, payment: { status: '123' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(
      'Entered order payment:status is not valid payment status'
    );
  });

  it('should not give Bad request error on entering valid payment status ', async () => {
    const mockRequest = {
      body: { ...orderData, payment: { status: paymentStatus.paid } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on not entering price ', async () => {
    const mockRequest = {
      body: removeProperty(orderData, 'price'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order price');
  });

  it('should give Bad request error on entering invalid productTotal ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, productTotal: '123' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order price:productTotal is not Number');
  });
  it('should not give Bad request error on entering valid productTotal ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, productTotal: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid discountPrice ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, discountPrice: '123' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order price:discountPrice is not Number');
  });
  it('should not give Bad request error on entering valid discountPrice ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, discountPrice: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid totalAfterDiscount ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        price: { ...priceData, totalAfterDiscount: '123' },
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(
      'Entered order price:totalAfterDiscount is not Number'
    );
  });
  it('should not give Bad request error on entering valid totalAfterDiscount ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, totalAfterDiscount: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid tax ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, tax: '123' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order price:tax is not Number');
  });
  it('should not give Bad request error on entering valid tax ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, tax: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid shippingCharges ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, shippingCharges: '123' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order price:shippingCharges is not Number');
  });
  it('should not give Bad request error on entering valid shippingCharges ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, shippingCharges: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid totalAmount ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, totalAmount: '123' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order price:totalAmount is not Number');
  });
  it('should not give Bad request error on entering valid totalAmount ', async () => {
    const mockRequest = {
      body: { ...orderData, price: { ...priceData, totalAmount: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });

  it('should give Bad request error on not entering address ', async () => {
    const mockRequest = {
      body: removeProperty(orderData, 'address'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order address');
  });
  it('should give Bad request error on entering invalid house ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, house: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order address:house is not String');
  });
  it('should not give Bad request error on entering valid house ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, house: 'john doe' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid location ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, location: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order address:location is not String');
  });
  it('should not give Bad request error on entering valid location ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, location: 'john doe' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid street ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, street: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order address:street is not String');
  });
  it('should not give Bad request error on entering valid street ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, street: 'john doe' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid city ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, city: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order address:city is not String');
  });
  it('should not give Bad request error on entering valid city ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, city: 'john doe' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid state ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, state: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order address:state is not String');
  });
  it('should not give Bad request error on entering valid state ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, state: 'john doe' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid name ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, name: 123 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order address:name is not String');
  });
  it('should not give Bad request error on entering valid name ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, name: 'john doe' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid pin ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, pin: '123' } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order address:pin is not Number');
  });
  it('should not give Bad request error on entering valid pin ', async () => {
    const mockRequest = {
      body: { ...orderData, address: { ...addressData, pin: 123465 } },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on not entering items ', async () => {
    const mockRequest = {
      body: removeProperty(orderData, 'items'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter order items');
  });
  it('should give Bad request error on entering invalid prodId ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, prodId: '123' }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:prodId is not valid type');
  });
  it('should not give Bad request error on entering valid prodId ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, prodId: Types.ObjectId() }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid title ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, title: 123 }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:title is not String');
  });
  it('should not give Bad request error on entering valid title ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, title: 'product title' }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid description ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, description: 123 }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:description is not String');
  });
  it('should not give Bad request error on entering valid description ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, description: 'product description' }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid color ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, color: 123 }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:color is not String');
  });
  it('should not give Bad request error on entering valid color ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, color: 'product color' }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering size as number ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, size: 123 }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:size is not valid size');
  });
  it('should give Bad request error on entering size as string ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, size: '123' }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:size is not valid size');
  });
  it('should not give Bad request error on entering valid size ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, size: size.L }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering invalid outfit type as number ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, outfit: { type: 123, occasion: {} } }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(
      'Entered order items:outfit:type is not valid category'
    );
  });
  it('should give Bad request error on entering invalid outfit type as string ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, outfit: { type: '123', occasion: {} } }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(
      'Entered order items:outfit:type is not valid category'
    );
  });
  it('should give Bad request error on entering  outfit occasion as string ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [
          { ...itemsData, outfit: { type: categories.kids, occasion: '123' } },
        ],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(
      'Entered order items:outfit:occasion is not valid occasion'
    );
  });
  it('should give Bad request error on entering  outfit occasion as number ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [
          { ...itemsData, outfit: { type: categories.kids, occasion: 123 } },
        ],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(
      'Entered order items:outfit:occasion is not valid occasion'
    );
  });
  it('should not give Bad request error on entering valid outfit type ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [
          { ...itemsData, outfit: { type: categories.kids, occasion: {} } },
        ],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should not give Bad request error on entering valid outfit occasion ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [
          { ...itemsData, outfit: { type: categories.kids, occasion: {} } },
        ],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });

  it('should give Bad request error on entering images as non array string ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, images: 'string' }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:images is not Array');
  });
  it('should give Bad request error on entering images as non array number ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, images: 123 }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:images is not Array');
  });

  it('should give Bad request error on entering images as  number ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, images: ['string', 123, 'string'] }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:images is not String');
  });
  it('should not give Bad request error on entering valid images ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, images: ['string', '123', 'string'] }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should give Bad request error on entering inOffer as number ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, inOffer: 123 }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:inOffer is not Boolean');
  });
  it('should give Bad request error on entering inOffer as string ', async () => {
    const mockRequest = {
      body: { ...orderData, items: [{ ...itemsData, inOffer: '123' }] },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered order items:inOffer is not Boolean');
  });
  it('should not give Bad request error on entering valid inOffer ', async () => {
    const mockRequest = {
      body: {
        ...orderData,
        items: [{ ...itemsData, inOffer: true }],
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      orderValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
});
