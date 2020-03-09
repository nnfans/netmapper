import Telnet from 'telnet-client';
import fs from 'fs';
import { format } from 'date-fns';

require('dotenv').config();

// // Schedule for every 10 minutes
// schedule.scheduleJob("*/10 * * * * *", async function(fireDate) {
async function exec(fireDate) {
  console.log('Execute L2 mac address at ' + fireDate);

  const logPath = __dirname + '/LOG/L2/' + format(fireDate, 'YYYY_MM') + '/';

  // Create log folder
  try {
    fs.mkdir(
      logPath,
      {
        recursive: true
      },
      err => {
        if (err) throw err;
      }
    );
  } catch (err) {
    console.dir(err);
    return;
  }

  // For every L2
  for (let iHost = 0; iHost < parseInt(process.env.L2_HOST_N); iHost++) {
    const connection = new Telnet();

    const hostAddress = process.env['L2_HOST_' + iHost];

    console.log('Check Endpoint of L2: ' + hostAddress);
    const connectionParameter = {
      host: hostAddress,
      timeout: 10000,
      shellPrompt: /.?>/,
      failedLoginMatch: 'Login invalid',
      loginPrompt: /Username:/i,
      passwordPrompt: /Password:/i,
      username: process.env.L2_USERNAME,
      password: process.env.L2_PASSWORD,
      initialLFCR: false,
      execTimeout: 10000
    };

    // Connect and login telnet
    try {
      await connection.connect(connectionParameter);
    } catch (error) {
      fs.appendFile(
        logPath + format(fireDate, 'error_DD') + '.log',
        format(fireDate, 'YYYYMMDD_HHmmss') +
          ' - ' +
          error.message +
          ' - ' +
          error.stack,
        function(err) {
          if (err) console.dir(err);
        }
      );
    }

    console.log(await connection.exec('terminal length 0\r\n'));

    await connection.exec('sh mac address-table\r\n');

    // List mac address
    const resConn = await connection.exec('terminal length 0\r\n');

    fs.appendFile(
      logPath + '/' + format(fireDate, 'DD') + '.txt',
      resConn,
      function(err) {
        if (err) console.dir(err);
        console.log('finish');
      }
    );
  }
}

exec(new Date());

// });
