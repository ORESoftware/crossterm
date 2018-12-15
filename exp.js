

const cp = require('child_process');
const json = JSON.stringify(['foo','bar']);

const k = cp.spawn('bash');

const cmd = `
  bash -c "export foo='${json}'";
`;

k.stdin.end(`
    ${cmd}
    echo "foo is: $foo"; exit 0;
`);


k.stdout.pipe(process.stdout);
k.stderr.pipe(process.stderr);
