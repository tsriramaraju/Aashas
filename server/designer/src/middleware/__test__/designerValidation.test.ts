import { BadRequestError } from '@aashas/common';
import { NextFunction, Request, Response } from 'express';
import { designerValidation } from '../designerValidation';
describe('Designer validation middleware test group', () => {
  it('should throw error on giving invalid email', async () => {
    const mockRequest = {
      body: { email: 'john' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid bio', async () => {
    const mockRequest = {
      body: { bio: 1234 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid mobile', async () => {
    const mockRequest = {
      body: { mobile: '123' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should throw error on giving invalid name', async () => {
    const mockRequest = {
      body: { name: 1234 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrow(BadRequestError);
  });
  it('should not throw error on giving valid email', async () => {
    const mockRequest = {
      body: { email: 'john@test.com' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should not throw error on giving valid bio', async () => {
    const mockRequest = {
      body: { bio: 'this is bio' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should not throw error on giving valid mobile', async () => {
    const mockRequest = {
      body: { mobile: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should not throw error on giving valid name', async () => {
    const mockRequest = {
      body: { name: 'John doe' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      designerValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
});
