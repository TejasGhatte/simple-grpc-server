import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ServiceClientConstructor } from '@grpc/grpc-js';
import { ProtoGrpcType } from './generated/a';
import { AddressBookServiceHandlers } from './generated/AddressBookService';

const packageDefination = protoLoader.loadSync(path.join(__dirname, 'a.proto'));

const personProto = grpc.loadPackageDefinition(packageDefination) as unknown as ProtoGrpcType;

const PERSONS = [
    {
        name: 'John',
        age: 30
    },
    {
        name: 'Jane',
        age: 25
    }
];

const handlers: AddressBookServiceHandlers = {
    AddPerson (call, callback) {
        let person = {
            name: call.request.name,
            age: call.request.age
        }
        PERSONS.push(person);
        callback(null, person);
    },
    GetPersonByName (call, callback) {
        let person = PERSONS.find(p => p.name === call.request.name);
        if (!person) {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Person not found'
            }, null);
        }
        callback(null, person);
    }
}

const server = new grpc.Server();

server.addService((personProto.AddressBookService).service, handlers)

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(`Server binding failed: ${err.message}`);
      return;
    }
    console.log(`Server is running on port ${port}`);
    server.start();
  });