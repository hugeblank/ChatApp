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
        $('#chatArea').fadeIn();
        this.sendName();
    }

    onMessage(msg)
    {
        msg = new DataView(msg.data);
        var offset = 0;
        var id = String.fromCharCode(msg.getUint8(offset++));
        
        console.log(`Recieved id ${id}`);
    }

    onError(e)
    {
        this.onClose(e, true);
    }

    prepPacket(len)
    {
        return new DataView(new ArrayBuffer(len));
    }

    sendName()
    {
        let name = $('#usernameInput').val();
        let len =  1 + name.length;
        let offset = 0;
  
        let msg = this.prepPacket(len);
        msg.setUint8(offset, 't'.charCodeAt(0));
        offset++;
  
        for (var i = 0; i < name.length; i++) {
            msg.setUint8(offset, name.charCodeAt(i));
            offset++;
        }
  
        this.socket.send(msg.buffer);
    }

}