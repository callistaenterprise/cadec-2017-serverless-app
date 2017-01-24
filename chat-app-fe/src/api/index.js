import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  chatList: [
    {
      id: v4(),
      message: 'Wake up and look at this thing that I bring'
    },
    {
      id: v4(),
      message: 'Wake up, be bright, be golden and light'
    },
    {
      id: v4(),
      message: 'All in all, hes just an old, saggy cloth cat.'
    },
    {
      id: v4(),
      message: 'Baggy, and a bit loose at the seams.'
    },
    {
      id: v4(),
      message: 'When he wakes up, all his friends come to life',
    },
    {
      id: v4(),
      message: 'the mice on the mouse organ',
    },
    {
      id: v4(),
      message: 'professor Yafle',
    },
    {
      id: v4(),
      message: 'gabrielle the frog',
    }
  ],
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchChats = (filter = 'all') => delay(3000).then(() => {
  console.log('----- fakedb', fakeDatabase.chatList);
  return fakeDatabase.chatList;
});
