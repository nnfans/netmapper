export interface ITelnet {
  connect(TelnetParameter: object): Promise<void>;
  exec(command: string): Promise<string>;
}

export interface ITableParser {
  parse(text: string): object[];
}

export interface TelnetClient {
  new (): ITelnet;
}

export interface ICreateConnection {
  (override: object): Promise<ITelnet>;
}

export interface ISetTerminalLength {
  (connection: ITelnet): Promise<ITelnet>;
}

export interface IGetConnectedDevice {
  (connection: ITelnet): Promise<object[]>;
}
