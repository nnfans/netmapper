import { makeCreateConnection } from './telnetConnection';

const defaultTelnetParameter = {
  timeout: 10000,
  shellPrompt: /.?>/,
  failedLoginMatch: 'Login invalid',
  loginPrompt: /Username:/i,
  passwordPrompt: /Password:/i,
  initialLFCR: false,
  execTimeout: 10000
};

describe('telnetConnection', function() {
  describe('createConnection', function() {
    it('return telnet object as function call success', async function() {
      const mockTelnetObject = {
        connect: jest.fn()
      };
      const mockTelnet = jest.fn().mockReturnValue(mockTelnetObject);
      const createConnection = makeCreateConnection(
        mockTelnet,
        defaultTelnetParameter
      );

      const override = {
        address: '127.0.0.1',
        username: 'testUser',
        password: 'testPassword',
        timeout: 5000
      };

      const res = await createConnection(override);
      expect(res).toEqual(mockTelnetObject);
      expect(mockTelnet).toBeCalledWith();
      expect(mockTelnetObject.connect).toBeCalledWith({
        ...defaultTelnetParameter,
        ...override
      });
    });
  });
});
