import { AddressBookServiceHandlers } from '../generated/AddressBookService';
import * as grpc from '@grpc/grpc-js';

const PERSONS = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];

export const addressBookHandlers: AddressBookServiceHandlers = {
  AddPerson(call, callback) {
    const person = {
      name: call.request.name,
      age: call.request.age,
    };
    PERSONS.push(person);
    callback(null, person);
  },
  GetPersonByName(call, callback) {
    const person = PERSONS.find((p) => p.name === call.request.name);
    if (!person) {
      return callback(
        { code: grpc.status.NOT_FOUND, details: 'Person not found' },
        null
      );
    }
    callback(null, person);
  },
};
