import { IDevice } from '../../entities/Device/Device.interface';
import makeDevice from '../../entities/Device';
import {
  ICreateConnection,
  ISetTerminalLength,
  IGetMacAddressTable,
  MacAddressTableData
} from '../../lib/telnet/telnetConnection.interface';
import { isArray } from 'util';

export const makeDetectConnectedDevice = function({
  isValidIp,
  createConnection,
  setTerminalLengthZero,
  getMacAddressTable
}: {
  isValidIp: Function;
  createConnection: ICreateConnection;
  setTerminalLengthZero: ISetTerminalLength;
  getMacAddressTable: IGetMacAddressTable;
}) {
  return async function detectConnectedDevice(
    address: string
  ): Promise<IDevice[]> {
    // Throw as l2Address is an invalid ip address
    if (!isValidIp(address)) {
      throw new Error('address must be valid ip address');
    }

    let result: MacAddressTableData[] = await createConnection({
      host: address
    })
      .then(setTerminalLengthZero)
      .then(getMacAddressTable)
      .catch(err => {
        console.dir({ error: err });
        return [];
      });

    return result
      .map(function(device) {
        try {
          return makeDevice({
            ip: null,
            mac: device.Mac,
            locationIp: address,
            locationPort: device.Ports
          });
        } catch (error) {
          return null;
        }
      })
      .filter(device => !!device);
  };
};

export default { makeDetectConnectedDevice };
