import {
  BadRequestError,
  NotAuthorizedError,
  verification,
} from '@aashas/common';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { generateJWT } from '../../utils';
import { isAdmin } from '../isAdmin';

describe('Admin authorization middleware test group', () => {
  it('should throw Bad request error if Admin is not present', async () => {
    const id = Types.ObjectId();
    const token = generateJWT({
      id,
      name: 'john',
      emailVerified: verification.yes,
      mobileVerified: verification.yes,
      email: 'john@test.com',
      isAdmin: true,
    });

    const mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();

    await expect(
      isAdmin(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(BadRequestError);
  });

  it('should throw not authorized error if  user accessed this route', async () => {
    const user = await global.userLogin();

    const mockRequest = {
      headers: {
        authorization: `Bearer ${user}`,
      },
    } as Request;
    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();

    await expect(
      isAdmin(mockRequest, mockResponse, nextFunction)
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
      isAdmin(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(BadRequestError);
  });

  it('should Throw Bad Request error if Authorization header is not present', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const nextFunction: NextFunction = jest.fn();

    expect(
      isAdmin(mockRequest, mockResponse, nextFunction)
    ).rejects.toThrowError(BadRequestError);
  });

  it('should succeed if admin tries to access this middleware', async () => {
    const token = await global.adminLogin();
    const user = await User.find({});
    const mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } as Request;

    let mockResponse = {} as Response;
    let nextFunction: NextFunction = jest.fn();
    expect(
      isAdmin(mockRequest, mockResponse, nextFunction)
    ).rejects.not.toThrowError(BadRequestError);
    expect(
      isAdmin(mockRequest, mockResponse, nextFunction)
    ).rejects.not.toThrowError(NotAuthorizedError);
  });
});
