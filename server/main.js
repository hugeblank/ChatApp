const os = require('os');
const serverLoop = require('node-gameloop');
const CommandHandler = require('../libcommand/src/CommandHandler');
const WebSocket = require('ws');

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
        this.loop = serverLoop.setGameLoop(this.serverLoop.bind(this), Config.Server.Tick);

        // System info debug
        Logger.info(`OS: ${os.platform()}`);
        Logger.info(`CPU: ${os.cpus()[0]["model"]}`);

        Logger.info(`Node Loop running at ${Config.Server.Tick} ms/tick`);

        Logger.info(`Took ${process.uptime()} seconds to start`);
        Logger.info(`Type 'help' or '?' for commands \n`)

        this.startSocketServer();

    }

    startSocketServer()
    {
        this.ws = new WebSocket.Server(
            {
                perMessageDeflate: false, 
                port: Config.Server.WebSocket.Port
            }, this.handleStart.bind(this)
        );
    }

    handleStart()
    {
        Logger.print(`WebSocket Server started on port ${Config.Server.WebSocket.Port}`);
        this.ws.on('connection', this.handleConnection.bind(this));
    }

    handleConnection(client)
    {
        this.ws.on('message', this.onMessage.bind(this));
        this.ws.on('close', this.onCloseConn.bind(this));

        Logger.info(`Got connection from address ${client._socket.remoteAddress}`);
    }

    onMessage(msg)
    {
        var offset = 0;
        var reader = new BinaryReader(msg);
        var id = String.fromCharCode(reader.readUInt8());
        offset++;

        console.log('Recieved id: ' + id);
    }

    onCloseConn()
    {

    }

    serverLoop()
    {
        if (this.tick >= 10)
        {
            this.tick = 0;
        }

        this.tick++;
    }
}

module.exports = Server;
