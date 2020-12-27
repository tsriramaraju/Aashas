import { combineReducers } from 'redux';
import { storeState } from '../../interfaces/storeInterfaces';
import { path } from './path';

export default combineReducers<storeState>({
  path: path,
});
