import * as grpc from '@grpc/grpc-js';
import { loadProto } from './utils/grpcLoader';
import { addressBookHandlers } from './handlers/addressBook';

function startServer() {
  const server = new grpc.Server();
  const proto = loadProto();

  server.addService(proto.AddressBookService.service, addressBookHandlers);

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(`Server binding failed: ${err.message}`);
      return;
    }
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
