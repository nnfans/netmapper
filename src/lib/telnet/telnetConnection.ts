import {
  ICreateConnection,
  ISetTerminalLength,
  ITelnet,
  IGetMacAddressTable,
  MacAddressTableData,
  IGetArpIp,
  ArpTableData
} from './telnetConnection.interface';

export const makeCreateConnection = function(
  Telnet: any,
  defaultParameter
): ICreateConnection {
  return async function createConnection(override): Promise<ITelnet> {
    const telnet: ITelnet = new Telnet();
    const telnetParameter = { ...defaultParameter, ...override };
    await telnet.connect(telnetParameter);
    return telnet;
  };
};

export const makeSetTerminalLength = function(length = 0): ISetTerminalLength {
  const terminalLength = length;

  return async function setTerminalLength(telnet: ITelnet): Promise<ITelnet> {
    // Execute command in telnet connection
    await telnet.exec(`terminal length ${terminalLength}`);
    return telnet;
  };
};

export const makeGetMacAddressTable = function(
  tableParser
): IGetMacAddressTable {
  return async function getMacAddressTable(
    telnet: ITelnet
  ): Promise<MacAddressTableData[]> {
    // Execute command in telnet connection
    const rawResult = await telnet.exec('show mac address-table');
    const firstVlanStringLoc = rawResult.indexOf('Vlan');
    const TotalMacStringLoc = rawResult.indexOf('Total Mac');
    const result = rawResult.substr(
      firstVlanStringLoc,
      TotalMacStringLoc - firstVlanStringLoc
    );
    const parsed = tableParser(result)
      .slice(1)
      .map(function(data) {
        return {
          Vlan: Array.isArray(data.Vlan) ? data.Vlan[0] : data.Vlan,
          Mac: Array.isArray(data.Mac) ? data.Mac[0] : data.Mac,
          Type: Array.isArray(data.Type) ? data.Type[0] : data.Type,
          Ports: Array.isArray(data.Ports) ? data.Ports[0] : data.Ports
        };
      });
    return parsed;
  };
};

export const makeGetArpIp = function(tableParser): IGetArpIp {
  return async function getArpIp(telnet: ITelnet): Promise<ArpTableData[]> {
    // Execute command in telnet connection
    const rawResult = await telnet.exec('show ip arp');
    const parsed = tableParser(rawResult)
      .slice(1)
      .map(function(data) {
        return {
          Protocol: Array.isArray(data.Protocol)
            ? data.Protocol[0]
            : data.Protocol,
          Address: Array.isArray(data.Address) ? data.Address[0] : data.Address,
          Age: Array.isArray(data.Age) ? data.Age[0] : data.Age,
          Hardware: Array.isArray(data.Hardware)
            ? data.Hardware[0]
            : data.Hardware,
          Type: Array.isArray(data.Type) ? data.Type[0] : data.Type,
          Interface: Array.isArray(data.Vlan) ? data.Vlan[0] : data.Vlan
        };
      });
    return parsed;
  };
};

export default {
  makeCreateConnection,
  makeSetTerminalLength,
  makeGetMacAddressTable
};
