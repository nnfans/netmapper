import { IDevice } from './interface';

export default function buildMakeDevice({
  isValidIp
}: {
  isValidIp: Function;
}) {
  return function makeDevice({
    ip,
    mac,
    createdBy,
    createdAt = new Date(),
    updatedAt = new Date(),
    locationIp
  }: {
    ip: string;
    mac: string;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
    locationIp: string;
  }): IDevice {
    if (!isValidIp(ip)) {
      throw new Error('ip must be valid ip address');
    }

    if (!isValidIp(locationIp)) {
      throw new Error('locationIp must be valid ip address');
    }

    return Object.freeze({
      getIp: (): string => ip,
      getMacAddress: (): string => mac,
      getCreatedBy: (): number => createdBy,
      getCreatedAt: (): Date => createdAt,
      getUpdatedAt: (): Date => updatedAt,
      getLocationIp: (): string => locationIp
    });
  };
}
