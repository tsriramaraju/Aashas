import { BadRequestError, NotAuthorizedError } from '@aashas/common';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { payloadData } from '../../dummyData/payload';
import { Account } from '../../models';
import { generateJWT } from '../../utils';
import { isUser } from '../isUser';

describe('User authorization middleware test group', () => {
  it('should throw Bad request error if user is not present', async () => {
    const id = Types.ObjectId();
    const token = generateJWT(payloadData);

    const mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();

    await expect(
      isUser(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(BadRequestError);
  });

  it('should throw not authorized error if  admin accessed this route', async () => {
    const user = await global.adminLogin();

    const mockRequest = {
      headers: {
        authorization: `Bearer ${user}`,
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();

    await expect(
      isUser(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(NotAuthorizedError);
  });

  it('should Throw Bad Request error if token is not present', async () => {
    const mockRequest = {
      headers: {
        authorization: '',
      },
    } as Request;
    const mockResponse = {} as Response;
    const nextFunction: NextFunction = jest.fn();

    expect(
      isUser(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(BadRequestError);
  });

  it('should Throw Bad Request error if Authorization header is not present', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const nextFunction: NextFunction = jest.fn();

    expect(
      isUser(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(BadRequestError);
  });

  it('should succeed if user tries to access this middleware', async () => {
    const token = await global.userLogin();
    const user = await Account.find({});
    const mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } as Request;

    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    expect(
      isUser(mockRequest, mockResponse, nextFunction)
    ).rejects.not.toThrowError(BadRequestError);
    expect(
      isUser(mockRequest, mockResponse, nextFunction)
    ).rejects.not.toThrowError(NotAuthorizedError);
  });
});
