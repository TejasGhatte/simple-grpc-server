import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../generated/a';

export function loadProto(): ProtoGrpcType {
  const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, '../../src/proto/a.proto')
  );
  return grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
}
