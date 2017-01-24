import {getEntity, getEntities, getRelatedEntities, createEntity, updateEntity, deleteEntity} from '../utils/dynamo_adapter' 

const messageTable = process.env.Messages_Table;

const message = [
  'id',
  'message',
  'createdAt',
  'userId'
];

export async function createMessage({message}) {
  console.log('--- createMessage', message, messageTable);
  return createEntity(messageTable, message);
}

export async function updateMessage({message}) {
  return updateEntity(messageTable, message);
}

export async function getMessages(args) {
  const {userId, attributesToGet = message, limit = 200} = args ? args : {};
  console.log('--- getMessages', args, userId, limit);
  return userId ? getRelatedEntities('userId', [userId], messageTable, attributesToGet) :
    getEntities(messageTable, attributesToGet).then((res = []) => res
      .sort((a, b) => b.createdAt - a.createdAt)
      .splice(0, limit));
}

export async function getMessage({id, attributesToGet = message}) {
  return getEntity(messageTable, id, attributesToGet);
}

export async function deleteMessage({id}) {
  return deleteEntity(messageTable, id);
}
