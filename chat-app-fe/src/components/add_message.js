import React from 'react';
import {compose, withHandlers, withState} from 'recompose';
import Input from 'react-toolbox/lib/input/Input';

const style = {
  padding: '15px',
  margin: '10px',
}

const AddMessage = ({newMessage = '', handleUpdateNewMessage, handleAddNewMessage}) =>
  <div style={style} className="header">
    <Input
      key='message_add'
      className='message_add'
      type='text'
      label='Write a message'
      onChange={handleUpdateNewMessage}
      onKeyDown={handleAddNewMessage}
      value={newMessage}
    />
  </div>;


const AddMessageWithState = compose(
  withState('newMessage', 'setNewMessage', undefined),
  withHandlers({
    handleUpdateNewMessage: ({newMessage, setNewMessage}) => value => {
      console.log('--, name, value', value);
      setNewMessage(value)
    },
    handleAddNewMessage: ({handleAddMessage, newMessage, setNewMessage}) => (proxy, event) => {

      if (proxy.which === 13) {
        // handleAddMessage is passed down from chat_list_container
        handleAddMessage(newMessage);
        setNewMessage('');
      }
    }
  })
)(AddMessage);

export default AddMessageWithState;
