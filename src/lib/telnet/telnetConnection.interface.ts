export interface ITelnet {
  connect(TelnetParameter: object): Promise<void>;
  exec(command: string): Promise<string>;
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

export interface MacAddressTableData {
  Vlan: string;
  Mac: string;
  Type: string;
  Ports: string;
}

export interface ArpTableData {
  Protocol: string;
  Address: string;
  Age: string;
  Hardware: string;
  Type: string;
  Interface: string;
}

export interface IGetMacAddressTable {
  (connection: ITelnet): Promise<MacAddressTableData[]>;
}

export interface IGetArpIp {
  (connection: ITelnet): Promise<ArpTableData[]>;
}
