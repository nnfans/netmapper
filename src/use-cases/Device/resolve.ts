import {
  ICreateConnection,
  ISetTerminalLength,
  IGetArpIp,
  ArpTableData
} from '../../lib/telnet/telnetConnection.interface';

export const makeGetArpTable = function({
  isValidIp,
  createConnection,
  setTerminalLengthZero,
  getArpIp
}: {
  isValidIp: Function;
  createConnection: ICreateConnection;
  setTerminalLengthZero: ISetTerminalLength;
  getArpIp: IGetArpIp;
}) {
  return async function getArpTable(address: string): Promise<ArpTableData[]> {
    // Throw as l2Address is an invalid ip address
    if (!isValidIp(address)) {
      throw new Error('address must be valid ip address');
    }

    const result = await createConnection({ host: address })
      .then(setTerminalLengthZero)
      .then(getArpIp)
      .catch(() => []);

    return result;
  };
};

export default { makeGetArpTable };
