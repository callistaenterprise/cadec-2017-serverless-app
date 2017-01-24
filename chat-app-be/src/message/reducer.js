import * as messageService from './service';

export default async action => {
  console.log('--- REDUCER', JSON.stringify(action), action.type);
  switch(action.type) {
    case 'CREATE_MESSAGE':
      console.log('--- reducer create message', action);
      return messageService.createMessage(action).then(
        message => ({type:'ADD_MESSAGE', message})
      );
     case 'UPDATE_MESSAGE':
      return messageService.updateMessage(action).then(
        message => ({type:'UPDATE_MESSAGE', message})
      );
     case 'DELETE_MESSAGE':
      return messageService.deleteMessage(action).then(() => ({...action, remote:false}));
     case 'LIST_MESSAGES':
      return messageService.getMessages(action).then(
        messages => ({type:'RECEIVE_MESSAGES', messages})
  ); 
     case 'GET_MESSAGE':
      return messageService.getMessage(action);
     default:
      return action;
  }
}

