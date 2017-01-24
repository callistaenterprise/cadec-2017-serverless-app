import * as api from '../api';
// --- actions
export const all = {
  type: 'all'
};

// --- requests
export const listMessages = () => ({
  type: 'LIST_MESSAGES',
  remote: true,
  limit: 200
});

// also used in messages reducer
// const receiveMessages = response => ({
//   type: 'RECEIVE_MESSAGES',
//   response,
// });

// --- messages
export const updateMessage = (message, remote = true) => ({
  type: 'UPDATE_MESSAGE',
  remote,
  message
});
export const createMessage = message => ({
  type: 'CREATE_MESSAGE',
  remote: true,
  message
});
export const deleteMessage = id => ({
  type: 'DELETE_MESSAGE',
  remote: true,
  id
});
export const addMessage = message => ({
  type: 'ADD_MESSAGE',
  remote: false,
  message
});
export const receiveMessages = messages => ({
  type: 'RECEIVE_MESSAGES',
  messages
});

// --- message
export const editMessage = id => ({
  type: 'EDIT_MESSAGE',
  id
});
export const clearEditMessage = () => ({
  type: 'CLEAR_EDIT_MESSAGE'
});

// thunks
export const fetchChats = () =>
  api.fetchChats().then(response => response);

