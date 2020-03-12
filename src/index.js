const parser = require('table-parser');

console.dir(
  parser.parse(`Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
  51    0000.0c07.ac01    DYNAMIC     Gi1/0/50
  51    0000.0c07.ac02    DYNAMIC     Gi1/0/50
  51    0000.0c07.ac03    DYNAMIC     Gi1/0/50
  51    0000.0c07.ac04    DYNAMIC     Gi1/0/50
  51    0000.0c07.ac05    DYNAMIC     Gi1/0/50
  51    0000.0c07.ac06    DYNAMIC     Gi1/0/50
  51    0000.cd34.572a    DYNAMIC     Gi1/0/50
  51    0000.ab2f.8a61    DYNAMIC     Gi1/0/50`)
);
