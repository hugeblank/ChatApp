class Network {

    constructor()
    {
      this.addr = `ws://127.0.0.1:8080`;
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
        this.fadeIn('chatArea');
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

        this.fadeOut('chatArea');
        this.fadeIn('loginArea');
    }

    fadeIn(domId)
    {
        $(`#${domId}`).fadeIn();
    }

    fadeOut(domId)
    {
        $(`#${domId}`).fadeOut();
    }

    prepPacket(len)
    {
        return new DataView(new ArrayBuffer(len));
    }

    sendMessage(data)
    {
        let len =  1 + data.length;
        let offset = 0;
  
        let msg = this.prepPacket(len);
        msg.setUint8(offset, 't'.charCodeAt(0));
        offset++;
  
        for (var i = 0; i < data.length; i++) {
            msg.setUint8(offset, data.charCodeAt(i));
            offset++;
        }
  
        this.socket.send(msg.buffer);
    }

}