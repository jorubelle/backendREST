const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {

  if(env('NODE_ENV') === 'production'){
    const config = parse(process.env.DATABASE_URL);
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
          },
          options: {
            ssl: false,
          },
        },
      },
    }
  }
  
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  }
};

















// const path = require('path');
// const parse = require('pg-connection-string').parse;
// const config = parse(process.env.DATABASE_URL)

// module.exports = ({ env }) => {
  
//   if(env('NODE_ENV') === 'production') {
    
//     return {
//       defaultConnection: 'default',
//       connections: {
//         default: {
//           connector: 'bookshelf',
//           settings: {
//             client: 'postgres',
//             host: config.host,
//             port: config.port,
//             database: config.database,
//             username: config.user,
//             password: config.password
//           },
//           options: {
//             ssl: {
//               rejectUnauthorized: false
//           },
//           }
//         }
//       }
//     }
//   }
  
//   return {
//     defaultConnection: 'default',
//     connection: {
//       client: 'postgres',
//       connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// }
// };

// // const { MongoClient } = require('mongodb');
// // const uri = "mongodb+srv://jorubelle:<password>@cluster0.m0jhnqd.mongodb.net/?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   client.close();
// // });
