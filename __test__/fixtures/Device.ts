import * as faker from 'faker';

export default function makeFakeDevice(
  overrides
): {
  ip: string;
  mac: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  locationIp: string;
} {
  const device = {
    ip: faker.internet.ip(),
    mac: faker.internet.mac(),
    createdBy: faker.random.number(5000),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    locationIp: faker.internet.ip()
  };

  // Override device attributes with "overrides" attributes variable
  return { ...device, ...overrides };
}
