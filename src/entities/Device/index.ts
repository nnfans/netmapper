import { isIPv4, isIPv6 } from 'net';
import buildMakeDevice from './Device';

function isValidIp(ip): boolean {
  return isIPv4(ip) || isIPv6(ip);
}

const makeDevice = buildMakeDevice({ isValidIp });

export default makeDevice;
