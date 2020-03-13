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

const createConnection = makeCreateConnection(Telnet, defaultTelnetParameter);
const setTerminalLengthZero = makeSetTerminalLength(0);
const getMacAddressTable = makeGetMacAddressTable(parser.parse);

const detectConnectedDevice = makeDetectConnectedDevice({
  isValidIp: isIPv4,
  createConnection,
  setTerminalLengthZero,
  getMacAddressTable
});

export default {
  async detectDevices(
    l2IpAddress: string | string[],
    l3IpAddress: string | string[]
  ): Promise<IDevice[]> {
    if (!Array.isArray(l2IpAddress)) {
      l2IpAddress = [l2IpAddress];
    }

    if (!Array.isArray(l3IpAddress)) {
      l3IpAddress = [l3IpAddress];
    }

    const connectedDevicesPromises: Promise<IDevice[]> = l2IpAddress
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
  }
};
