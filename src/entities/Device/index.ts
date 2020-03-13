import { isIPv4 } from 'net';
import buildMakeDevice from './Device';

const isValidMac = (mac: string): boolean =>
  !!mac.match(/([0-9a-z]{4}.[0-9a-z]{4}.[0-9a-z]{4})/);

export const makeDevice = buildMakeDevice({ isValidIp: isIPv4, isValidMac });

export default makeDevice;
