import { BadRequestError } from '@aashas/common';
import { Request, Response, NextFunction } from 'express';
import { addressData } from '../../dummy data/user';
import { removeProperty } from '../../utils';
import { addressValidation } from '../addressValidation';
describe('Address validation middleware test group', () => {
  it('should throw Bad request error if no input is given', async () => {
    const mockRequest = {
      body: {},
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address name');
  });
  it('should throw Bad request error if name is not given', async () => {
    const mockRequest = {
      body: removeProperty(addressData, 'name'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address name');
  });
  it('should throw Bad request error if name is invalid', async () => {
    const mockRequest = {
      body: { ...addressData, name: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered address name is not String');
  });
  it('should not throw Bad request error if name is valid', async () => {
    const mockRequest = {
      body: { ...addressData, name: 'john' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should throw Bad request error if house is not given', async () => {
    const mockRequest = {
      body: removeProperty(addressData, 'house'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address house');
  });
  it('should throw Bad request error if house is invalid', async () => {
    const mockRequest = {
      body: { ...addressData, house: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered address house is not String');
  });
  it('should not throw Bad request error if house is valid', async () => {
    const mockRequest = {
      body: { ...addressData, house: 'john' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should throw Bad request error if location is not given', async () => {
    const mockRequest = {
      body: removeProperty(addressData, 'location'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address location');
  });
  it('should throw Bad request error if location is invalid', async () => {
    const mockRequest = {
      body: { ...addressData, location: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered address location is not String');
  });
  it('should not throw Bad request error if location is valid', async () => {
    const mockRequest = {
      body: { ...addressData, location: 'john' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should throw Bad request error if street is not given', async () => {
    const mockRequest = {
      body: removeProperty(addressData, 'street'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address street');
  });
  it('should throw Bad request error if street is invalid', async () => {
    const mockRequest = {
      body: { ...addressData, street: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered address street is not String');
  });
  it('should not throw Bad request error if street is valid', async () => {
    const mockRequest = {
      body: { ...addressData, street: 'john' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should throw Bad request error if city is not given', async () => {
    const mockRequest = {
      body: removeProperty(addressData, 'city'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address city');
  });
  it('should throw Bad request error if city is invalid', async () => {
    const mockRequest = {
      body: { ...addressData, city: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered address city is not String');
  });
  it('should not throw Bad request error if city is valid', async () => {
    const mockRequest = {
      body: { ...addressData, city: 'john' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should throw Bad request error if state is not given', async () => {
    const mockRequest = {
      body: removeProperty(addressData, 'state'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address state');
  });
  it('should throw Bad request error if state is invalid', async () => {
    const mockRequest = {
      body: { ...addressData, state: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered address state is not String');
  });
  it('should not throw Bad request error if state is valid', async () => {
    const mockRequest = {
      body: { ...addressData, state: 'john' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
  it('should throw Bad request error if pin is not given', async () => {
    const mockRequest = {
      body: removeProperty(addressData, 'pin'),
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Please enter address pin');
  });
  it('should throw Bad request error if pin is invalid', async () => {
    const mockRequest = {
      body: { ...addressData, pin: '123' },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError('Entered address pin is not Number');
  });
  it('should not throw Bad request error if pin is valid', async () => {
    const mockRequest = {
      body: { ...addressData, pin: 123 },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    await expect(
      addressValidation(mockRequest, mockResponse, nextFunction)
    ).resolves.not.toThrow(BadRequestError);
  });
});
