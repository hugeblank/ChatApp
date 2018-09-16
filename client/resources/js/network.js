class SocketConnection {

    constructor()
    {
        this.addr = `ws://127.0.0.1:8080`;
    }

    generate()
    {
        this.socket = new WebSocket(this.addr);
        this.socket.binaryType = "arraybuffer";
        this.socket.onclose = this.onError.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
    }

    checkSockState()
    {
        let state = this.socket.readyState; 
        return state;
    }

    postData(data)
    {
        let buffer = data.buffer;

        if (this.checkSockState() == 1)
        {
            this.socket.send(buffer);
        }
    }
}


class Network extends SocketConnection {

    constructor()
    {
        super();
        this.util = new Utility(this);
    }

    initialize()
    {
        super.generate();
    }

    onOpen()
    {
        this.util.fadeOut('loginArea');
    }

    onMessage(msg)
    {
        msg = new DataView(msg.data);
        var offset = 0;
        var id = String.fromCharCode(msg.getUint8(offset++));
        
        console.log(`Recieved id ${id}`);

        switch (id)
        {
            case 'n':
                this.util.sendUser();
                break;
            case 'r':
                this.util.nameRegistered();
                break
            case 'c':
                this.util.handleChat(msg, offset);
                break;
        }
    }

    reConn()
    {
        if (super.checkSockState() == 1)
        {
            this.onOpen();
        }
        else
        {
            this.initialize();
        }
    }

    onError(e)
    {
        this.onClose(e, true);
    }

    onClose(e, isError)
    {
        if (e.code || e.reason)
        {
            console.log(`Socket Closed! Reason ${e.code} : ${e.reason}`);
            this.reConn();
        } 
        else 
        {
            console.log("Socket Error!");
        }

        this.util.fadeOut('chatArea');
        this.util.fadeIn('loginArea');
    }

    send(data)
    {
        super.postData(data);
    }

}