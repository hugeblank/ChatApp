class Network {

    constructor(parent)
    {
        this.parent = parent;
        this.addr = `ws://127.0.0.1:8080`;
        this.util = new Utility(this.parent, this);
    }

    initialize()
    {
        this.socket = new WebSocket(this.addr);
        this.socket.binaryType = "arraybuffer";
        this.socket.onclose = this.onError.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
    }

    onOpen()
    {
        this.util.fadeIn('chatArea');
    }

    onMessage(msg)
    {
        msg = new DataView(msg.data);
        var offset = 0;
        var id = String.fromCharCode(msg.getUint8(offset++));
        
        console.log(`Recieved id ${id}`);
    }

    reConn()
    {
        if (this.socket.readyState == 1)
        {
            this.initialize();
        }
        else
        {
            this.onOpen();
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

}