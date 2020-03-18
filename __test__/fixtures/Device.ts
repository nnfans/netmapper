import * as faker from 'faker';

export default function makeFakeDevice(
  overrides = {}
): {
  ip: string;
  mac: string;
  locationIp: string;
  locationPort: string;
} {
  const device = {
    ip: faker.internet.ip(),
    mac: faker.internet.mac(),
    locationIp: faker.internet.ip(),
    locationPort: faker.random.alphaNumeric(4)
  };

  // Override device attributes with "overrides" attributes variable
  return { ...device, ...overrides };
}
