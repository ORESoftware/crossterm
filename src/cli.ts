#!/usr/bin/env node
'use strict';

import * as cp from 'child_process';


const index = process.argv.indexOf('--');

if (index < 2) {
  throw 'Cannot find index of -- argument.';
}

const args = process.argv.slice(index + 1);

const values = [
  {
    title: 'static-server',
    file: '/home/oleg/codes/typeaware/doc-gen/scripts/static-server.sh',
    args: ['foo']
  },
  {
    title: 'static-server',
    file: '/home/oleg/codes/typeaware/doc-gen/scripts/tsc-watch-api-dev.sh',
    args: ['foo']
  },
  {
    title: 'static-server',
    file: '/home/oleg/codes/typeaware/doc-gen/scripts/start-ts-node.sh',
    args: ['foo']
  },
  {
    title: 'static-server',
    file: '/home/oleg/codes/typeaware/doc-gen/scripts/dev-api-app.sh',
    args: ['foo']
  }
]
  .map(v => {
    return `--tab --title="${v.title}" -e "bash -c 'echo "${v.file}";` +
    ` add_traps; export ocmdf=( "${String(v.file || '').trim()}" ${v.args.join(' ')} );  ocmd  2> >(r2g_stderr) 1> >(r2g_stdout);'"`
  });

// const cmd = `
// gnome-terminal --geometry=73x16+0+0 --window --title="Main Tab" \
//  --tab --title="111" -e "bash -c 'add_traps; export ocmdf=( );  ocmd  2> >(r2g_stderr) 1> >(r2g_stdout);'" \
//  --tab --title="222" -e "bash -c 'add_traps; export ocmdf=( /home/oleg/codes/typeaware/doc-gen/scripts/tsc-watch-api-dev.sh ); ocmd 2> >(r2g_stderr) 1> >(r2g_stdout);'" \
//  --tab --title="333" -e "bash -c 'add_traps; export ocmdf=(  ); ocmd 2> >(r2g_stderr) 1> >(r2g_stdout);'" \
//  --tab --title="444" -e "bash -c 'add_traps; export ocmdf=(  ); ocmd 2> >(r2g_stderr) 1> >(r2g_stdout);'"
// `;

const cmd = `gnome-terminal --geometry=73x16+0+0 --window --title="Main Tab" ${values.join(' ')}`;

const k = cp.spawn('bash',[],{
  env: Object.assign({}, process.env, {
    FORCE_COLOR: 1
  }),
  stdio: ['pipe', 1, 2]
});

k.stdin.end(`

  export r2g_gray='\\033[1;30m'
  export r2g_magenta='\\033[1;35m'
  export r2g_cyan='\\033[1;36m'
  export r2g_orange='\\033[1;33m'
  export r2g_yellow='\\033[1;33m'
  export r2g_green='\\033[1;32m'
  export r2g_no_color='\\033[0m'
  
  r2g_stdout() {
    # $REPLY is a bash built-in
    while read; do echo -e "\${r2g_gray} crossterm: \${r2g_no_color} $REPLY"; done
  }
  
  r2g_stderr() {
    while read; do echo -e "\${r2g_magenta} crossterm: \${r2g_no_color} $REPLY"; done
  }

   add_to_history(){
      history -s bar;
    }
  
   ocmd(){
     add_to_history;
     nrestart -- "$ocmdf";
   }
  
  add_traps(){
    trap bash EXIT;
    trap bash SIGINT;
  }
  
  export -f r2g_stdout;
  export -f r2g_stderr;
  export -f add_traps;
  export -f ocmd;
  export -f add_to_history;


  ${cmd}


`);
