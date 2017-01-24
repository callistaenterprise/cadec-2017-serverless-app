import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {chatSelectors} from '../reducers';
import ChatListBranch from './chat_list_branch';
import ChatMessage from './chat_message';
import * as actions from '../actions';

class ChatListMonster extends Component{

  _fetchData({requestMessages, fetchChats}){
    requestChats();
    fetchChats();
  }

  componentDidMount() {
    _fetchData(this.props);
  }

  render() {
    return (<div style={{margin: '40px'}}>
      <h1>Chat App</h1>
      <ChatMessage {...this.props}/>
      <ChatListBranch {...this.props}/>
    </div>);
  }
}

const mapStateToProps = (state, {params}) => ({
  chats: chatSelectors.getChats(state)
});

export default connect(
  mapStateToProps,
  actions
)(ChatListContainer);
