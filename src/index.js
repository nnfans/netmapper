const parser = require('table-parser');

const parsed = parser.parse(`Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
  51    000b.ab38.4921    DYNAMIC     Gi1/0/1
  51    000b.ab3d.80d2    DYNAMIC     Gi1/0/1
  51    000b.ab87.2424    DYNAMIC     Gi1/0/1
  51    000b.ab87.261c    DYNAMIC     Gi1/0/1
  51    0010.f33c.58d0    DYNAMIC     Gi1/0/6
  51    0010.f33c.59e2    DYNAMIC     Gi1/0/14
  51    0010.f33c.5b03    DYNAMIC     Gi1/0/16
  51    0010.f33c.5b75    DYNAMIC     Gi1/0/15
  51    0010.f33e.b821    DYNAMIC     Gi1/0/9
  51    0010.f33e.b97b    DYNAMIC     Gi1/0/7
  51    0010.f33e.bb6e    DYNAMIC     Gi1/0/3
  51    0010.f33e.bb71    DYNAMIC     Gi1/0/4
  51    0010.f33e.bba9    DYNAMIC     Gi1/0/1
  51    0010.f341.583e    DYNAMIC     Gi1/0/11
  51    0010.f341.5842    DYNAMIC     Gi1/0/24
  51    0010.f341.584a    DYNAMIC     Gi1/0/11
  51    0010.f341.58f1    DYNAMIC     Gi1/0/11
  51    0010.f367.1f6b    DYNAMIC     Gi1/0/6
  51    0010.f369.1741    DYNAMIC     Gi1/0/5
  51    0010.f369.1765    DYNAMIC     Gi1/0/1
  51    0010.f369.176f    DYNAMIC     Gi1/0/1
  51    0010.f36a.b0c1    DYNAMIC     Gi1/0/20
  51    0010.f36a.b171    DYNAMIC     Gi1/0/13
  51    0010.f374.35cf    DYNAMIC     Gi1/0/6
  51    0010.f376.f0a0    DYNAMIC     Gi1/0/1
  51    0010.f37e.73c3    DYNAMIC     Gi1/0/6
  51    0010.f387.e0a3    DYNAMIC     Gi1/0/1
  51    005f.8661.b7e7    DYNAMIC     Gi1/0/1
  51    08cc.a73d.6135    DYNAMIC     Gi1/0/6
  51    1c1b.0d55.049d    DYNAMIC     Gi1/0/27
  51    7085.c212.953e    DYNAMIC     Gi1/0/1
  51    7085.c212.ab52    DYNAMIC     Gi1/0/1
  51    7085.c212.ac94    DYNAMIC     Gi1/0/1
  51    7085.c21d.8069    DYNAMIC     Gi1/0/1
  51    7085.c21d.dc6f    DYNAMIC     Gi1/0/1
  51    7085.c21d.dca8    DYNAMIC     Gi1/0/1
  51    c444.a07a.bfd4    DYNAMIC     Gi1/0/1`);

console.dir(parsed);
