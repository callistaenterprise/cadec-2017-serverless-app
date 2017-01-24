import {wrapCallback} from '../utils/lambda_utils';
import reduce from './reducer';
/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
const ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Lambda Handler
export default async function message(event, context, callback) {
  console.log('--- message event', JSON.stringify(event, null, 2));
  // pass the event through the reducer
  wrapCallback(event, callback, reduce);
};
