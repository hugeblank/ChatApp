const os = require('os');
const serverLoop = require('node-gameloop');
const CommandHandler = require('../libcommand/src/CommandHandler');
const WebSocket = require('ws');
const BinaryReader = require('../libbinary/src/BinaryReader');
const BinaryWriter = require('../libbinary/src/BinaryWriter');

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
        client.on('message', this.onMessage.bind(this));
        client.on('close', this.onCloseConn.bind(this));
        Logger.info(`Got connection from address ${client._socket.remoteAddress}`);
    }

    onMessage(msg)
    {
        Logger.info(`Got Message: ${msg}`);

        var offset = 0;
        var reader = new BinaryReader(msg);
        var id = String.fromCharCode(reader.readUInt8());
        offset++;

        switch(id)
        {
            case 't':
                this.getChatMsg(msg, reader, offset);
                break;
        }
    }

    onCloseConn(code, reason)
    {
        Logger.warn(`Client disconnected with code ${code}`);
    }

    serverLoop()
    {
        if (this.tick >= 10)
        {
            this.tick = 0;
        }

        this.tick++;
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

        console.log(text);
    }
}

module.exports = Server;
