import AWS from 'aws-sdk';

export async function wrapCallback(event, callback, fn){
  try {
    const result = await fn(event);
    callback(null, result);
  } catch (e) {
    callback(e, null);
  }
}

const promiseCb = (resolve, reject) => (err, data) => {
  if (err) reject(err); // console.log(err, err.stack); // an error occurred
  else resolve(data);
};

export async function invokeLambda(FunctionName, event) {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName,
    Payload: JSON.stringify(event)
  };
  console.log('--- invoke lambda', params);
  return new Promise((resolve, reject) =>
    lambda.invoke(params, promiseCb(resolve, reject)));
}
