// import { BadRequestError } from '@aashas/common';
// import { NextFunction, Request, Response } from 'express';
// import { maleProductData } from '../../dummy data/Product';
// import { removeProperty } from '../../utils/removeProperty';
// import { productValidation } from '../orderValidation';
describe('Product validation middleware test group', () => {
  it('should ', async () => {});
  //   it('should give Bad request error on submitting product title', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'title'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product title as number', async () => {
  //     const mockRequest = {
  //       body: { ...maleProductData, title: 123 },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product description', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'description'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product description as number', async () => {
  //     const mockRequest = {
  //       body: { ...maleProductData, description: 123 },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product color', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'color'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product color as number', async () => {
  //     const mockRequest = {
  //       body: { ...maleProductData, color: 123 },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product size', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'size'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product size as number', async () => {
  //     const mockRequest = {
  //       body: { ...maleProductData, size: [123] },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product price', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'price'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product price as string', async () => {
  //     const mockRequest = {
  //       body: { ...maleProductData, price: '123' },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product quantity', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'quantity'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product quantity as string', async () => {
  //     const mockRequest = {
  //       body: { ...maleProductData, quantity: '123' },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product outfit', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'outfit'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product outfit without proper category', async () => {
  //     const mockRequest = {
  //       body: {
  //         ...maleProductData,
  //         outfit: {},
  //       },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product keywords', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'keywords'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product keywords as numbers array', async () => {
  //     const mockRequest = {
  //       body: {
  //         ...maleProductData,
  //         keywords: [123, 123],
  //       },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product images', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'images'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product images as numbers array', async () => {
  //     const mockRequest = {
  //       body: {
  //         ...maleProductData,
  //         images: [123, 123],
  //       },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product gender', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'gender'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product gender other than male or female', async () => {
  //     const mockRequest = {
  //       body: {
  //         ...maleProductData,
  //         gender: '123',
  //       },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product isNewProduct', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'isNewProduct'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product isNewProduct other than boolean', async () => {
  //     const mockRequest = {
  //       body: {
  //         ...maleProductData,
  //         isNewProduct: 'male',
  //       },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product designerCollection', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'designerCollection'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product designerCollection other than boolean', async () => {
  //     const mockRequest = {
  //       body: {
  //         ...maleProductData,
  //         designerCollection: 'male',
  //       },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product trending', async () => {
  //     const mockRequest = {
  //       body: removeProperty(maleProductData, 'trending'),
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
  //   it('should give Bad request error on submitting product trending other than boolean', async () => {
  //     const mockRequest = {
  //       body: {
  //         ...maleProductData,
  //         trending: 'male',
  //       },
  //     } as Request;
  //     let mockResponse = {} as Response;
  //     let nextFunction: NextFunction = jest.fn();
  //     await expect(
  //       productValidation(mockRequest, mockResponse, nextFunction)
  //     ).rejects.toThrow(BadRequestError);
  //   });
});
