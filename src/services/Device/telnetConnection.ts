import {
  ICreateConnection,
  ISetTerminalLength,
  TelnetClient,
  ITelnet,
  IGetConnectedDevice,
  ITableParser
} from '../../services/Device/telnetConnection.interface';

export const makeCreateConnection = function(
  Telnet: TelnetClient,
  defaultParameter
): ICreateConnection {
  return async function createConnection(override): Promise<ITelnet> {
    const telnet: ITelnet = new Telnet();
    defaultParameter = { ...defaultParameter, ...override };
    await telnet.connect(defaultParameter);
    return telnet;
  };
};

export const makeSetTerminalLength = function(length = 0): ISetTerminalLength {
  const terminalLength = length;

  return async function setTerminalLength(telnet: ITelnet): Promise<ITelnet> {
    // Execute command in telnet connection
    await telnet.exec(`terminal length ${terminalLength}\r\n`);
    return telnet;
  };
};

export const makeGetConnectedDevice = function(
  tableParser: ITableParser
): IGetConnectedDevice {
  return async function getConnectedMacAddress(
    telnet: ITelnet
  ): Promise<object[]> {
    // Execute command in telnet connection
    const rawResult = await telnet.exec('show mac address-table\r\n');

    return tableParser.parse(rawResult).slice(1);
  };
};

export default {
  makeCreateConnection,
  makeSetTerminalLength,
  makeGetConnectedDevice
};
