'use strict';

import chalk from "chalk";
const isDebug = process.env.crossterm_is_debug === 'yes';

export const log = {
  info: console.log.bind(console, chalk.gray('nrestart info:')),
  warning: console.error.bind(console, chalk.bold.yellow.bold('nrestart warn:')),
  warn: console.error.bind(console, chalk.bold.magenta.bold('nrestart warn:')),
  error: console.error.bind(console, chalk.redBright.bold('nrestart error:')),
  debug: function (...args: any[]) {
    isDebug && console.log('nrestart debug:', ...args);
  }
};

export default log;
