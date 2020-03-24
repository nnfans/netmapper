import { isIPv4 } from 'net';
import buildMakeDevice from './Device';

const isValidMac = function(mac: string): boolean {
  if (typeof mac !== 'string') return false;
  return !!mac.match(/([0-9a-z]{4}.[0-9a-z]{4}.[0-9a-z]{4})/);
};

export const makeDevice = buildMakeDevice({ isValidIp: isIPv4, isValidMac });

export default makeDevice;
