const os = require('os');
const serverLoop = require('node-gameloop');
const CommandHandler = require('../libcommand/src/CommandHandler');
const WebSocket = require('ws');
const Userbase = require('./userbase');
const User = require('./user');

class Server
{
    /*
    Initializes a new instance of the Server
    */

    constructor(parent)
    {
        this.parent = parent

        // Server Variables
        this.id = 0;
        this.tick = 0;

        // Handlers
        this.commands = new CommandHandler(this);

        // Managers
        this.userBase = new Userbase();

    }

    /*
    Starts the server
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
                perMessageDeflate: true, 
                port: Config.Server.WebSocket.Port
            }, this.handleStart.bind(this)
        );
    }

    handleStart()
    {
        this.ws.on('connection', this.handleConnection.bind(this));
        Logger.print(`WebSocket Server started on port ${Config.Server.WebSocket.Port}`);
    }

    handleConnection(client)
    {
        let user = new User(this.getId(), client);
        client.binaryType = 'arraybuffer';
        client.on('message', user.onMessage.bind(this));
        client.on('close', user.onCloseConn.bind(this));

        Logger.info(`Got connection from address ${client._socket.remoteAddress}`);

        this.userBase.addUser(user);
    }

    serverLoop()
    {
        if (this.tick >= 10)
        {
            this.tick = 0;
        }

        this.tick++;
    }

    getId()
    {
        return this.id++;
    }

    getChatMsg(msg, reader, offset)
    {
        let text = '';
        let len = msg.byteLength;

        for (let i = offset; i < len; i++)
        {
            let letter = String.fromCharCode(reader.readUInt8());
            text += letter;
        }

        Logger.info(`User ${this.id} says: ${text}`);
    }
}

module.exports = Server;
