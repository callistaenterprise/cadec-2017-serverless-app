import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const getSchema = adapter => {

  const User = new GraphQLObjectType({
    name: 'User',
    description: 'The user that sends messages',
    fields: () => ({
      id: {type: GraphQLString},
      userName: {type: GraphQLString},
      messages: {
        type: new GraphQLList(Message),
        resolve(source, args) {
          return adapter.getMessages({userId: source.id});
        }
      }
    })
  });

  const Message = new GraphQLObjectType({
    name: 'Message',
    description: 'The message',
    fields: () => ({
      id: {type: GraphQLString},
      message: {type: GraphQLString},
      createdAt: {type: GraphQLString},
      userId: {type: GraphQLString},
      user: {
        type: User,
        resolve(source) {
          return adapter.getUser(source && source.userId && {id: source.userId});
        }
      }
    })
  });

  const Query = new GraphQLObjectType({
    name: 'MessageQueries',
    description: 'Root of the Messages Schema',
    fields: () => ({
      users: {
        type: new GraphQLList(User),
        description: 'List of users',
        resolve() {
          return adapter.getUsers({});
        }
      },
      user: {
        type: User,
        description: 'Get User by userName',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(source, args) {
          return adapter.getUser(args && {id: args.id});
        }
      },
      messages: {
        type: new GraphQLList(Message),
        description: 'List of messages',
        args: {
          userId: {type: GraphQLString}
        },
        resolve(source, args) {
          return adapter.getMessages(args && {userId: args.userId});
        }
      },
      message: {
        type: Message,
        description: 'Get message by id',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(source, args) {
          return adapter.getMessage(args && {id: args.id});
        }
      },
    })
  });

  const Mutuation = new GraphQLObjectType({
    name: 'MessageMutations',
    fields: {
      createUser: {
        type: User,
        description: 'Create user',
        args: {
          userName: {type: GraphQLString}
        },
        resolve: function (source, args) {
          return adapter.createUser({user:args});
        }
      },
      updateUser: {
        type: User,
        description: 'Update a user',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
          userName: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, args) {
          return adapter.updateUser({user: args});
        }
      },
      deleteUser: {
        type: User,
        description: 'Delete a user by userName',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, {id}) {
          return adapter.deleteUser({id});
        }
      },
      createMessage: {
        type: Message,
        description: 'Create message',
        args: {
          message: {type: GraphQLString},
          userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, args) {
          return adapter.createMessage({message: args});
        }
      },
      updateMessage: {
        type: Message,
        description: 'Update a message',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
          message: {type: new GraphQLNonNull(GraphQLString)},
          userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, args) {
          return adapter.updateMessage({message: args});
        }
      },
      deleteMessage: {
        type: Message,
        description: 'Delete a message by id',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, {id}) {
          return adapter.deleteMessage({id});
        }
      }

  }});

  const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutuation
  });

  return Schema;
};

export default getSchema;

