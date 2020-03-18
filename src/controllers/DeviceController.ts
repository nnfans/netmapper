import { makeDetectConnectedDevice } from '../use-cases/Device/detect';
import { isIPv4 } from 'net';
import {
  makeCreateConnection,
  makeSetTerminalLength,
  makeGetMacAddressTable
} from '../lib/telnet/telnetConnection';
import * as Telnet from 'telnet-client';
import * as parser from 'table-parser';
import { IDevice } from '../entities/Device/Device.interface';

const defaultTelnetParameter = {
  timeout: 10000,
  shellPrompt: /.?>/,
  failedLoginMatch: 'Login invalid',
  loginPrompt: /Username:/i,
  passwordPrompt: /Password:/i,
  initialLFCR: false,
  execTimeout: 10000
};

const setTerminalLengthZero = makeSetTerminalLength(0);
const getMacAddressTable = makeGetMacAddressTable(parser.parse);

export const detectDevice = async function(
  l2: {
    ipAddress: string | string[];
    telnetParameter: {};
  },
  l3: {
    ipAddress: string | string[];
    telnetParameter: {};
  }
): Promise<IDevice[]> {
  if (!Array.isArray(l2.ipAddress)) {
    l2.ipAddress = [l2.ipAddress];
  }

  if (!Array.isArray(l3.ipAddress)) {
    l3.ipAddress = [l3.ipAddress];
  }

  const createL2Connection = makeCreateConnection(Telnet, {
    ...defaultTelnetParameter,
    ...l2.telnetParameter
  });

  const detectConnectedDevice = makeDetectConnectedDevice({
    isValidIp: isIPv4,
    createConnection: createL2Connection,
    setTerminalLengthZero,
    getMacAddressTable
  });

  const connectedDevicesPromises: Promise<IDevice[]> = l2.ipAddress
    .map(detectConnectedDevice)
    .reduce(function(prev, curr) {
      return prev.then(resPrev => {
        return curr.then(function(resCurr) {
          return [...resPrev, ...resCurr];
        });
      });
    }, Promise.resolve([]));

  const connectedDevices = await connectedDevicesPromises;

  return connectedDevices;
};

export default { detectDevice };
