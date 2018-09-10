// Global Deps
global.Config   = require('./config/main.json');
global.MainServer = require('./main');
global.readline = require('readline');
global.BinaryReader = require('../libbinary/src/BinaryReader');
global.BinaryWriter = require('../libbinary/src/BinaryWriter');
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

const startServer = async() =>
{
    try
    {
        // Start Server
        let server = new MainServer(this);
        await server.start();
    }
    catch(err)
    {
        Logger.error(err);
    }

}

startServer();

// Error handling
process.on('uncaughtException',
    (error) =>
    {
        Logger.error(error)
    }
);
