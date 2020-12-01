import { BadRequestError } from '@aashas/common';
import { NextFunction, Request, Response } from 'express';
import { bannerValidation } from '../bannerValidation';
describe('Banner validation middleware test group', () => {
  const banner = {
    discount: 12,
    img:
      'https://www.theprettydresscompany.com/images/the-pretty-dress-company-end-of-line-dani-bardot-pencil-dress-p280-28563_medium.jpg',
    title: 'title',
    type: 'percentage',
  };
  it('should throw error on giving invalid title', async () => {
    const mockRequest = {
      body: { title: 1234 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      bannerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid image', async () => {
    const mockRequest = {
      body: { img: 1234 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      bannerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid discount', async () => {
    const mockRequest = {
      body: { discount: '123' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      bannerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid type', async () => {
    const mockRequest = {
      body: { type: 'percentages' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      bannerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid type', async () => {
    const mockRequest = {
      body: { type: 1234 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      bannerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid type', async () => {
    const mockRequest = { body: {} } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      bannerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should not throw error on giving valid details', async () => {
    const mockRequest = {
      body: banner,
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      bannerValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
});
