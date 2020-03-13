import { IDevice } from './Device.interface';

export default function buildMakeDevice({
  isValidIp,
  isValidMac
}: {
  isValidIp: (ip: string) => boolean;
  isValidMac: (mac: string) => boolean;
}) {
  return function makeDevice({
    ip,
    mac,
    locationIp,
    locationPort
  }: {
    ip: string;
    mac: string;
    locationIp: string;
    locationPort: string;
  }): IDevice {
    const _isValidIp = function(): boolean {
      return isValidIp(ip);
    };

    const isValidLocationIp = function(): boolean {
      return isValidIp(locationIp);
    };

    const setIp = function(_ip: string): void {
      if (!isValidIp(_ip)) {
        throw new Error('ip must be valid ip address');
      }
      ip = _ip;
    };

    const setLocationIp = function(_locationIp: string): void {
      if (!isValidIp(_locationIp)) {
        throw new Error('locationIp must be valid ip address');
      }
      locationIp = _locationIp;
    };

    if (!isValidMac(mac)) {
      throw new Error('mac must be valid mac address');
    }

    if (ip) {
      setIp(ip);
    }

    if (locationIp) {
      setLocationIp(locationIp);
    }

    return Object.freeze({
      isValidIp: _isValidIp,
      getIp: (): string => (isValidIp(ip) ? ip : null),
      setIp,
      getMacAddress: (): string => mac,
      isValidLocationIp,
      getLocationIp: (): string => (isValidIp(locationIp) ? locationIp : null),
      setLocationIp,
      getLocationPort: (): string => locationPort
    });
  };
}
