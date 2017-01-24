import AWSMqtt from 'aws-mqtt-client';
import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import R from 'ramda';


const AWS_SESSION_TOKEN = '';
const AWS_ACCESS_KEY = 'AKIAJVDETT6EWV2H5Q6A';
const AWS_SECRET_ACCESS_KEY = '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';
const AWS_IOT_ENDPOINT_HOST = 'a31ovqfkmg1ev8.iot.eu-west-1.amazonaws.com';
const mqttClient = new AWSMqtt({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  // sessionToken: AWS_SESSION_TOKEN,
  endpointAddress: AWS_IOT_ENDPOINT_HOST,
  region: 'eu-west-1'
});

const MessageLog = ({messages}) => <ul>{messages.map(message => <li>{message.message}</li>)}</ul>

export default compose(
  withState('message', 'setMessage', {}),
  withState('messages', 'addToMessages', []),
  lifecycle({
    componentDidMount() {
      const {setMessage} = this.props;
      mqttClient.on('connect', () => {
        mqttClient.subscribe('$aws/things/dev-cadec-messagesX/shadow/update');
        console.log('connected to iot mqtt websocket');
      });
      mqttClient.on('message', (topic, message) => {
        console.log(message.toString());
        setMessage(JSON.parse(message.toString()));
      });
    },
    componentWillReceiveProps({message, messages, addToMessages}) {
      console.log('message', message);
      if (!R.equals(message, this.props.message)) {
        console.log('addToMessage', messages);
        addToMessages([message, ...messages]);
      }
    }
  })
)(MessageLog);
