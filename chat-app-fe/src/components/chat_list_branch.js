import React from 'react';
import {branch} from 'recompose';
import ChatList from './chat_list';
import Waiting from './loading';

export default
  branch(
    ({isFetching}) => isFetching,
    () => props => <Waiting {...props} />,
    () => props => <ChatList {...props} />
  )(bc => props => bc);
