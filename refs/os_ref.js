const os = require('os')

//platform linux, win, ios
console.log(os.platform());

//architecture
console.log(os.arch());

// common info of CPU
console.log(os.cpus());

//free memory
console.log(os.freemem());

//total memory
console.log(os.totalmem());

//root directory
console.log(os.homedir());

//work system time
console.log(os.uptime());