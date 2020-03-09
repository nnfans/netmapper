import { IDevice } from '../../entities/Device/interface';
import makeDevice from '../../entities/Device';
import { ICreateConnection } from '../../interfaces/createConnection.interface';

export default function makeDetectDevices({
  isValidIp,
  createConnection
}: {
  isValidIp: Function;
  createConnection: ICreateConnection;
}): Function {
  return async function detectDevices(
    l3Address: string,
    l2Addresses: string[]
  ): Promise<IDevice[]> {
    if (!isValidIp(l3Address)) {
      throw new Error('l3Address must be valid ip address');
    }

    const hasInvalidL2Address =
      l2Addresses.filter(address => !isValidIp(address)).length > 0;

    if (hasInvalidL2Address) {
      throw new Error('l2Address must be valid ip address');
    }

    const l2Connections = l2Addresses.map(createConnection).map();

    const l3Conn = new TelnetClient();
  };
}
