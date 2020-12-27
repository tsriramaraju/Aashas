import { Dispatch } from 'redux';
import { NavigateAction } from '../../interfaces/storeInterfaces';
import { actionTypes } from './types';

export const navigate = (path: string): NavigateAction => {
  return {
    type: actionTypes.navigate,
    payload: path,
  };
};
