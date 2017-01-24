import React, {PropTypes} from 'react';
import ChatItem from './chat_item';
import AddMessageWithState from './add_message';
// import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import List from 'react-toolbox/lib/list/List';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import ListItem from 'react-toolbox/lib/list/ListItem';

const ChatList = ({messages, ...rest}) =>
  <div className="flexCol">
    <AddMessageWithState {...rest}/>
    <ListDivider/>
    <List className="flexList" ripple={false} selectable={false}>
      {messages.map(
        message => {
          return <ChatItem key={`ci-${message.id}`} message={message} {...rest}/>
        })
      }
    </List>
  </div>;

ChatList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string
  }).isRequired).isRequired
};

export default ChatList;
