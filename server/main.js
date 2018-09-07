// Global Deps
global.readline = require('readline');
global.Colors   = require('colors');
global.rl       = readline.createInterface(
    {
        input:  process.stdin,
        output: process.stdout
    }
);

// Error handling
process.on('uncaughtException',
    (error) =>
    {
        Logger.error(error)
    }
);
