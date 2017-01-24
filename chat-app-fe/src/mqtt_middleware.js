import AWSMqtt from 'aws-mqtt-client';

const AWS_SESSION_TOKEN = '';
const AWS_ACCESS_KEY = '<your access key>';
const AWS_SECRET_ACCESS_KEY = '<your secret key>';
const AWS_IOT_ENDPOINT_HOST = '<your endpoint>';
const mqttClient = new AWSMqtt({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  // sessionToken: AWS_SESSION_TOKEN,
  endpointAddress: AWS_IOT_ENDPOINT_HOST,
  region: 'eu-west-1'
});

export const subscribe = dispatch => {
  mqttClient.on('connect', () => {
    mqttClient.subscribe('$aws/things/dev-cadec-messagesX/state');
    console.log('connected to iot mqtt websocket');
  });

  mqttClient.on('message', (topic, action) => {
    console.log('--- received message', action.toString());
    dispatch(JSON.parse(action.toString()));
  });

};

export const middleware = store => next => action => {
  if (action && action.remote) {
    console.log('--- about to publish to $aws/things/dev-cadec-messagesX/shadow/update');
    console.log('--- action', action);
    mqttClient.publish('$aws/things/dev-cadec-messagesX/shadow/update', JSON.stringify(action));
  }
  return next(action);
};
