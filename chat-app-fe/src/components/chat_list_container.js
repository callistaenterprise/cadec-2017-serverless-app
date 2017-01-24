import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {compose, withHandlers, withReducer, lifecycle} from 'recompose';
import {messageSelectors} from '../reducers';
// import {list, editing, isFetching, stateMessage, stateMessages, requestState} from '../reducers/messages';
import ChatListBranch from './chat_list_branch';
import * as actions from '../actions';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';

const ChatListContainer = props =>
  <div className="flexCol">
    <AppBar title="Cadec-2017 Chat App" className="header"/>
    <ChatListBranch {...props} className="content"/>
  </div>;

const mapStateToProps = (state, {params}) => ({
  messages: messageSelectors.getMessages(state),
  isFetching: messageSelectors.getIsFetching(state),
  editingState: state.messages.editing
});

const _lifecycle = lifecycle({
  componentDidMount() {
    this.props.handleRequestChats();
  },
  componentWillReceiveProps(props) {
  }
});

export default compose(
  withRouter,
  // withReducer('messages', 'dispatchToMessages',
  // list, []),
  // withReducer('editingState', 'dispatchToMessage',
  // editing, stateMessage),
  // withReducer('isFetching', 'dispatchToIsFetching',
  // isFetching, false),
  connect(
    mapStateToProps,
    actions
  ),
  withHandlers({
      handleAddMessage: ({createMessage}) => newMessage => createMessage({message: newMessage}),
      handleAddUpdateMessage: ({clearEditMessage, updateMessage}) => message => (proxy, event) => {
        console.log('---add update', proxy.target);
        if (proxy.which === 13) {
          // dispatchToMessage(clearEditMessage());
          clearEditMessage();
          updateMessage({...message, message: proxy.target.value}, true);
        }
      },
      handleUpdateMessage: ({clearEditMessage, updateMessage}) => message => value => {
        console.log('---update', value);
        updateMessage({...message, message: value}, false);
      },
      handleDeleteMessage: ({deleteMessage}) => id => () => deleteMessage(id),
      handleEditMessage: ({editMessage}) => id => () => editMessage(id),
      handleRequestChats: ({listMessages, receiveMessages}) => () => {
        listMessages();
      }
    }
  ),

  _lifecycle,
)(ChatListContainer);
