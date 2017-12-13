# Logman

Simple nano logger service for javascript applications. Logman leverages usage of `console` object and it's methods to log different your messages into browser's console.

> Note: Logman isn't a crash reporter and it will shut up on production by checking NODE_ENV environment variable. Make sure to set NODE_ENV=production when building your Javscript application.

## Install

`npm install @farskid/logman`

### ES module

```javascript
import Logman from "logman";

const logger = new Logman("my-logger");
logger.log("Log me first"); // [[my-logger]] Log me first
logger.error("Log me as an error"); // [[my-logger]] Log me as an error
```

### CommonJS

```javascript
const Logman = require("logman");

const logger = new Logman("my-logger");
logger.log("Log me first"); // [[my-logger]] Log me first
logger.error("Log me as an error"); // [[my-logger]] Log me as an error
```

## Recipes

```javascript
/*
  You can create multiple instances of Logman for different namespaces
*/

const userLogs = new Logman("user-logs");
const exceptionLogs = new Logman("exceptions");

userLogs.log("user is logged out"); // [user-logs] user is logged out
exceptionLogs.error("Caught some http exceptions"); // [exceptions] Caught some http exceptions

/*
  You can put logger into sleep temporarily. When logger instance is in sleep mode, it reject any action.
*/
userLogs.sleep();
userLogs.log("This won`t be logged");
userLLogs.error("This won`t be logged as well!");

/* You can awaken the logger again by using awake() method */
userLogs.awake();
userLogs.log('ok! I"m back');

/*
  To check whether logger is sleep or not, you can use isSleep prop.
  isSleep is *false* by default
*/
userLog.isSleep; // false
userLog.sleep();
userLog.isSleep; // true
userLog.awake();
userLog.isSleep; // false

/*
  You can destroy a Logman instance too!
  Obviously this is just a soft destory and a one way to make logger inactive forever. If you want the logger to be destroyed permenantly and be garbage collected (memory efficient), you can do one of these:

  let logger = new Logman('temp-logger');
  logger = null;

  Or if you're using multiple loggers, you can store them in a single object:

  const loggers = {
    firstLogger: new Logman('first-logger'),
    secondLogger: new Logman('second-logger')
  };

  delete loggers.firstLogger;
  delete loggers.secondLogger;
*/
userLog.destroy();
```

## Roadmap

* Accept custom adapter (default to window.console)
* Automatic logs on common events
* Log timestamps

## License

Logman is published under MIT license.
