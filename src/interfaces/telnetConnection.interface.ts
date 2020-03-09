export interface TelnetClient {}

export interface ICreateConnection {
  (address: string): Promise<object>;
}

export interface ISetTerminalLength {
  (connection: object): Promise<object>;
}
