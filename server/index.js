// Global Deps
global.readline = require('readline');
global.Logger   = require('../liblogger/src/Logger');
global.Colors   = require('colors');
global.rl       = readline.createInterface(
    {
        input:  process.stdin,
        output: process.stdout
    }
);

// Start deps
Logger.print("Loading...".green.dim);
Logger.start();
Logger.print("Loaded!".green);

// Error handling
process.on('uncaughtException',
    (error) =>
    {
        Logger.error(error)
    }
);
