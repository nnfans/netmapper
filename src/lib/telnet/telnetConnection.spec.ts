import telnetConnection, { makeCreateConnection } from './telnetConnection';
import {
  TelnetClient,
  ITelnet,
  ICreateConnection
} from './telnetConnection.interface';

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
    let mockTelnet: TelnetClient;
    let mockTelnetObject: ITelnet;
    let createConnection: ICreateConnection;
    beforeEach(function() {
      mockTelnetObject = {
        connect: jest.fn(),
        exec: jest.fn()
      };
      mockTelnet = jest.fn().mockReturnValue(mockTelnetObject);
      createConnection = makeCreateConnection(
        mockTelnet,
        defaultTelnetParameter
      );
    });

    it('return telnet object as function call success', async function() {
      const override = {
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
