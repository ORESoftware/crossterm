// const cp = require('child_process');
// const k = cp.spawn('bash');
//
// k.stdin.end(`
//
//    export array=( foo 'bar s' )
//
//    ( echo " \${array[@]} " )
//
// `);
//
// k.stdout.pipe(process.stdout);
// k.stderr.pipe(process.stderr);


const foo = function(a,b,c){
  console.log(Array.from(arguments));
};

const bar = foo.bind(null,'this is 1');

bar(2,3);
