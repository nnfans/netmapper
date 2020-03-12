import { IDevice } from '../../entities/Device/interface';
import makeDevice from '../../entities/Device';
import {
  ICreateConnection,
  ISetTerminalLength,
  IGetConnectedMacAddress
} from '../../services/Device/telnetConnection.interface';
import { isString } from 'util';

export default function makeDetectDevices({
  isValidIp,
  createConnection,
  setTerminalLengthZero,
  getConnectedMacAddress
}: {
  isValidIp: Function;
  createConnection: ICreateConnection;
  setTerminalLengthZero: ISetTerminalLength;
  getConnectedMacAddress: IGetConnectedMacAddress;
}): Function {
  return async function detectDevices(
    l3Address: string,
    l2Addresses: string[]
  ): Promise<object[]> {
    // Throw as l3Address is invalid
    if (!isValidIp(l3Address)) {
      throw new Error('l3Address must be valid ip address');
    }

    // Check wheter l2Addresses has invalid ip address
    const hasInvalidL2Address = l2Addresses.some(
      address => !isValidIp(address)
    );

    // Throw as l2Addresses has invalid ip address
    if (hasInvalidL2Address) {
      throw new Error('l2Address must be valid ip address');
    }

    const promiseAddress = await l2Addresses.map(async function(address) {
      const result = await createConnection({ host: address })
        .then(setTerminalLengthZero)
        .then(getConnectedMacAddress)
        .catch(error => error);

      return result;
    });

    const addresses = await Promise.all(promiseAddress);
    const addressesFound = addresses
      .filter((addr): addr is object[] => typeof addr !== 'string')
      .reduce((prev, curr) => [...prev, ...curr]);

    return addressesFound;
  };
}
