import {combineReducers} from 'redux';
import { v4 } from 'node-uuid';

export const stateMessages = [
  {
    id: 1,
    message: 'wake up'
  },
  {
    id: 2,
    message: 'bagpuss oh here what I sing!'
  },
  {
    id: 3,
    message: 'we will fix it'
  },
  {
    id: 4,
    message: 'gabrielle the frog'
  },
];

export const stateMessage = {
  id: undefined,
  isEditing: false
};

export const requestState = {
  isLoading: false,
  error: undefined
};

export const list = (state = [], action) => {
  // console.log('-------------- messages');
  // console.log('--- action', action);
  // console.log('-----------------------');
  switch (action.type) {
    case 'REQUEST_MESSAGES':
      return [...state];
    case 'UPDATE_MESSAGE':
      return state.map(message => message.id === action.message.id ? {
        ...message,
        message: action.message.message
      } : message);
    case 'DELETE_MESSAGE':
      return state.filter(message => message.id !== action.id);
    case 'ADD_MESSAGE':
      console.log('--- ADD_MESSAGE reducer');
      return [...state, action.message];
    case 'RECEIVE_MESSAGES':
      return [...action.messages];
    default:
      return state;
  }
};

export const editing = (state = stateMessage, action) => {
  // console.log('-------------- editingMessage');
  // console.log('--- action', action);
  // console.log('-----------------------');
  switch (action.type) {
    case 'EDIT_MESSAGE':
      return {
        ...state,
        id: action.id,
        isEditing: true
      };
    case 'CLEAR_EDIT_MESSAGE':
      return {
        id: undefined,
        isEditing: false
      };
    default:
      return state;
  }
};

export const isFetching = (state = true, action) => {
  // console.log('-------------- isFetching');
  // console.log('--- action', action);
  // console.log('-----------------------');
  switch (action.type) {
    case 'REQUEST_MESSAGES':
      return true;
      // also used in the request
    case 'RECEIVE_MESSAGES':
      return false;
    default:
      return state;
  }
};

export default combineReducers({list, isFetching, editing});

// --- selectors
const getMessages = state => {
  console.log('--- getMessages', state.messages.list);
  return (state.messages.list || []).sort((a, b) => b.createdAt-a.createdAt);
};

const getIsFetching = state => state.messages.isFetching;

export const selectors = {
  getMessages,
  getIsFetching
};
