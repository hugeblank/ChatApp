const os = require('os');
const nodeLoop = require('node-gameloop');
const CommandHandler = require('../libcommand/src/CommandHandler');

class Server
{
    /*
    Initializes a new instance of the Server
    */

    constructor(parent)
    {

        // Create Bot
        this.parent = parent

        // Server Variables
        this.id = 0;
        this.tick = 0;

        // Handlers
        this.commands = new CommandHandler(this);

    }

    /*
    Starts the Bot
    */

    start()
    {

        Logger.print(`ChatApp Server <Build ${Config.Version}>`.green.bold);

        // Logger
        Logger.prompt(this.commands.handleCommand.bind(this.commands), Config.Logger.Prompt);

        // Good solution for minimal CPU usage
        this.loop = nodeLoop.setGameLoop(this.loop.bind(this), Config.Server.Tick);

        // System info debug
        Logger.info(`OS: ${os.platform()}`);
        Logger.info(`CPU: ${os.cpus()[0]["model"]}`);

        Logger.info(`Node Loop running at ${Config.Server.Tick} ms/tick`);

        Logger.info(`Took ${process.uptime()} seconds to start`);
        Logger.info(`Type 'help' or '?' for commands \n`)

    }
}

module.exports = Server;
