export interface IDevice {
  isValidIp(): boolean;
  getIp(): string;
  setIp(ip: string): void;
  getMacAddress(): string;
  isValidLocationIp(): boolean;
  getLocationIp(): string;
  setLocationIp(locationIp: string): void;
  getLocationPort(): string;
}
