import { makeDetectConnectedDevice } from '../use-cases/Device/detect';
import { isIPv4, isIP } from 'net';
import telnetConnection, {
  makeCreateConnection,
  makeSetTerminalLength,
  makeGetMacAddressTable,
  makeGetArpIp
} from '../lib/telnet/telnetConnection';
import * as Telnet from 'telnet-client';
import * as parser from 'table-parser';
import { IDevice } from '../entities/Device/Device.interface';
import { makeGetArpTable } from '../use-cases/Device/resolve';
import { ArpTableData } from '../lib/telnet/telnetConnection.interface';

const defaultTelnetParameter = {
  timeout: 5000,
  shellPrompt: /.+>/,
  failedLoginMatch: 'Login invalid',
  loginPrompt: /Username:/i,
  passwordPrompt: /Password:/i,
  initialLFCR: false,
  port: 23
};

const setTerminalLengthZero = makeSetTerminalLength(0);
const getMacAddressTable = makeGetMacAddressTable(parser.parse);
const getArpIp = makeGetArpIp(parser.parse);

export const detectDevice = async function(
  l2: {
    ipAddress: string | string[];
    telnetParameter?: {};
  },
  l3: {
    ipAddress: string | string[];
    telnetParameter?: {};
  },
  filterPort: string[] = []
): Promise<IDevice[]> {
  if (!Array.isArray(l2.ipAddress)) {
    l2.ipAddress = [l2.ipAddress];
  }

  if (!Array.isArray(l3.ipAddress)) {
    l3.ipAddress = [l3.ipAddress];
  }

  const createL2Connection = makeCreateConnection(Telnet, {
    ...defaultTelnetParameter,
    ...(l2.telnetParameter || {})
  });

  const createL3Connection = makeCreateConnection(Telnet, {
    ...defaultTelnetParameter,
    ...(l3.telnetParameter || {})
  });

  const detectConnectedDevice = makeDetectConnectedDevice({
    isValidIp: isIPv4,
    createConnection: createL2Connection,
    setTerminalLengthZero,
    getMacAddressTable
  });

  const getArpTable = makeGetArpTable({
    isValidIp: isIPv4,
    createConnection: createL3Connection,
    setTerminalLengthZero,
    getArpIp
  });

  const connectedDevicesPromises: Promise<IDevice[]> = l2.ipAddress
    .map(detectConnectedDevice)
    .reduce(function(prev, curr) {
      return prev.then(resPrev => {
        return curr
          .then(function(resCurr) {
            return [...resPrev, ...resCurr];
          })
          .catch(function(err) {
            return [...resPrev];
          });
      });
    }, Promise.resolve([]));

  const arpTable: ArpTableData[] = await l3.ipAddress
    .map(getArpTable)
    .reduce(function(prev, curr) {
      return prev.then(resPrev => {
        return curr.then(function(resCurr) {
          return [...resPrev, ...resCurr];
        });
      });
    }, Promise.resolve([]));

  const connectedDevices = await connectedDevicesPromises;
  const filteredConnectedDevice = connectedDevices.filter(
    device => !filterPort.includes(device.getLocationPort())
  );

  const devices = filteredConnectedDevice.map(function(device) {
    const found = arpTable.find(arp => arp.Hardware === device.getMacAddress());
    if (found && found.Address) {
      device.setIp(found.Address);
    }
    return device;
  });

  return devices;
};

export = { detectDevice };
