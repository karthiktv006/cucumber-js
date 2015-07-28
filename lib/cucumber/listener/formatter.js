function Formatter(options) {
  var Cucumber = require('../../cucumber');
  var fs = require('fs');

  if (!options)
    options = {};
  if (options.logToConsole === undefined)
    options.logToConsole = true;

  var logs = '';

  if(logs === '' && options.logToFile) {
    fs.truncateSync(options.logToFile, 0);
  }

  var self = Cucumber.Listener();

  self.log = function log(string) {
    logs += string;
    if (options.logToFile !== undefined)
      fs.appendFileSync(options.logToFile, string, 'utf8');
    else if (options.logToConsole)
      process.stdout.write(string);
    if (typeof(options.logToFunction) === 'function')
      options.logToFunction(string);
  };

  self.getLogs = function getLogs() {
    return logs;
  };

  return self;
}

module.exports = Formatter;
