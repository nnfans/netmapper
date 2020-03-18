import makeFakeDevice from '../../../__test__/fixtures/Device';
import buildMakeDevice from './Device';

describe('Device', function() {
  describe('makeDevice constructor', function() {
    let makeDevice;
    let isValidIp: jest.Mock;
    let isValidMac: jest.Mock;
    beforeEach(function() {
      isValidIp = jest.fn().mockImplementation(ip => {
        return ip !== 'invalid';
      });
      isValidMac = jest.fn().mockImplementation(ip => {
        return ip !== 'invalid';
      });
      makeDevice = buildMakeDevice({ isValidIp, isValidMac });
    });

    it('makeDevice return device as ip and location ip is valid', function() {
      const deviceArg = makeFakeDevice();
      const device = makeDevice(deviceArg);

      expect(device).toEqual({
        isValidIp: expect.any(Function),
        getIp: expect.any(Function),
        setIp: expect.any(Function),
        getMacAddress: expect.any(Function),
        isValidLocationIp: expect.any(Function),
        getLocationIp: expect.any(Function),
        setLocationIp: expect.any(Function),
        getLocationPort: expect.any(Function)
      });
    });

    it('makeDevice throws as ip invalid', function() {
      const invalid = makeFakeDevice({ ip: 'invalid' });

      expect(() => makeDevice(invalid)).toThrowError(
        'ip must be valid ip address'
      );
      expect(isValidIp).toBeCalledWith('invalid');
      expect(isValidIp).toBeCalledTimes(1);
    });

    it('makeDevice throws as locationIp invalid', function() {
      const invalid = makeFakeDevice({ locationIp: 'invalid' });

      expect(() => makeDevice(invalid)).toThrowError(
        'locationIp must be valid ip address'
      );
      expect(isValidIp).toBeCalledWith('invalid');
      expect(isValidIp).toBeCalledTimes(2);
    });
  });
});
