import React from 'react';
import {compose, withProps, branch, renderComponent} from 'recompose';
import ListItem from 'react-toolbox/lib/list/ListItem';
import Input from 'react-toolbox/lib/input/Input';
import IconButton from 'react-toolbox/lib/button/IconButton';

// --- ChatItem components
export const EditableChatItem = ({message, handleUpdateMessage, handleAddUpdateMessage}) =>
  <Input
  key={`message_edit_${message.id}`}
  id={`message_edit_${message.id}`}
  className='flexLeft'
  type='text'
  value={message.message}
  onChange={handleUpdateMessage(message)}
  onKeyDown={handleAddUpdateMessage(message)}
/>;

export const LinkChatItem = ({message}) => <span className="message">{message.message}</span>;

// --- using branch to do control which component is shown based on the editing state.
export const BranchedChatItem = compose(
  withProps(ownProps => ({
    isEditing: ownProps.message && ownProps.editingState
    && ownProps.message.id === ownProps.editingState.id
  })),
  branch(
    ({isEditing}) => isEditing,
    c => c,
    renderComponent(LinkChatItem)
  )
)(EditableChatItem);

export const DeleteChatItem = ({message, handleDeleteMessage}) => <IconButton
  className='flexRight'
  key={`message_delete_${message.id}`}
  id={`message_delete_${message.id}`}
  onClick={handleDeleteMessage(message.id)}
  icon="delete"
/>

const ChatItemContent = props =>
  <span className="flexRow">
    <span className="flexLeft"><BranchedChatItem {...props} /></span>
    <DeleteChatItem {...props} className="flexRight"/>
  </span>;

export const ChatItem = ({message, handleEditMessage, ...rest}) =>
  <ListItem
  id={`message-${message.id}`}
  key={message.id}
  onClick={handleEditMessage(message.id)}
  itemContent={<ChatItemContent message={message} {...rest} />}
  />;

  export default ChatItem;
