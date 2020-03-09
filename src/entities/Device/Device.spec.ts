import makeFakeDevice from '../../../__test__/fixtures/Device';
import buildMakeDevice from './Device';

describe('Device', function() {
  describe('makeDevice constructor', function() {
    let makeDevice;
    let isValidIp: jest.Mock;
    beforeEach(function() {
      isValidIp = jest.fn().mockImplementation(ip => {
        return ip !== 'invalid';
      });
      makeDevice = buildMakeDevice({ isValidIp });
    });

    it('makeDevice return device', function() {
      const deviceArg = makeFakeDevice({ ip: 'ip' });
      const device = makeDevice(deviceArg);

      expect(device).toEqual({
        getIp: expect.any(Function),
        getMacAddress: expect.any(Function),
        getCreatedBy: expect.any(Function),
        getCreatedAt: expect.any(Function),
        getUpdatedAt: expect.any(Function),
        getLocationIp: expect.any(Function)
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
