import { Action, actionTypes } from '../actions/types';

const path = (state: string = '', action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.navigate:
      return payload;
    default:
      return state;
  }
};

export { path };
