import { config } from 'dotenv';
import { detectDevice } from './controllers/DeviceController';

config();

detectDevice(
  {
    ipAddress: '107.102.87.4',
    telnetParameter: {
      username: process.env.L2_USERNAME,
      password: process.env.L2_PASSWORD
    }
  },
  {
    ipAddress: '107.102.87.2',
    telnetParameter: {
      username: process.env.L3_USERNAME,
      password: process.env.L3_PASSWORD
    }
  }
);
