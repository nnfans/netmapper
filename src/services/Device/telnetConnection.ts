import {
  ICreateConnection,
  ISetTerminalLength
} from '../../interfaces/telnetConnection.interface';

export const makeCreateConnection = function(
  Telnet,
  telnetParameter
): ICreateConnection {
  return async function createConnection(address): Promise<object> {
    let conn = new Telnet();
    telnetParameter = { ...telnetParameter, host: address };
    await conn.connect(telnetParameter).catch(error => {
      conn = { error };
    });
    return conn;
  };
};

export const setTerminalLength: ISetTerminalLength = async function(
  connection
): Promise<object> {
  await connection.exec('terminal length 0\r\n').catch(error => {
    connection = { error };
  });
  return connection;
};

export default { makeCreateConnection };
