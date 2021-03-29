const path = require('path');
const execFile = require('child_process').execFile;
// get from node-gyp 7.1.2
let findVisualStudio2017OrNewer = function (cb) {
  let ps = path.join(process.env.SystemRoot, 'System32',
    'WindowsPowerShell', 'v1.0', 'powershell.exe');
  let csFile = path.join(__dirname, 'Find-VisualStudio.cs');
  let psArgs = [
    '-ExecutionPolicy',
    'Unrestricted',
    '-NoProfile',
    '-Command',
    '&{Add-Type -Path \'' + csFile + '\';'
    + '[VisualStudioConfiguration.Main]::PrintJson()}'
  ];
  // this.log.silly('Running', ps, psArgs);
  let child = execFile(ps, psArgs, {encoding: 'utf8'},
    (err, stdout, stderr) => {
      // this.parseData(err, stdout, stderr, cb);
      console.log(JSON.stringify(err),
        JSON.stringify(stdout),
        JSON.stringify(stderr));
    });
  child.stdin.end();
};
findVisualStudio2017OrNewer();

