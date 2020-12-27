import { actionTypes } from '../redux/actions/types';

export interface storeState {
  path: string;
}

export interface NavigateAction {
  type: actionTypes.navigate;
  payload: string;
}
