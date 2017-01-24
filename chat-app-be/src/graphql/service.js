import {graphql} from 'graphql';
import getSchema from './schema';
import * as messageService from '../message/service';
import * as userService from '../user/service';
const aggregateServices = {...messageService, ...userService};

export function runGraphQL(event, cb) {
  let body = JSON.parse(event.body);
  console.log('--- body', event.body);
  let query = body.query;
  query = query.replace(/\n/g, ' ');
  query = query.replace(/\"/g, '"');
  console.log('--- query : ' + JSON.stringify(query));
  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  graphql(getSchema(aggregateServices
  ), query).then(function (result) {
    console.log('GQL RESULT: ', JSON.stringify(result));
    return cb(null, {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(result)
    });
  });

}

