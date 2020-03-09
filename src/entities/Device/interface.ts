export interface IDevice {
  getIp(): string;
  getMacAddress(): string;
  getCreatedBy(): number;
  getCreatedAt(): Date;
  getUpdatedAt(): Date;
  getLocationIp(): string;
}
