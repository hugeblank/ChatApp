class Utility {

    constructor(parent, network)
    {
        this.parent = parent;
        this.network = network;
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

        this.postData(msg);
    }

    postData(data)
    {
        let buffer = data.buffer;

        if (this.checkSockState() == 1)
        {
            console.log(buffer);
            this.network.socket.send(buffer);
        }
    }

    checkSockState()
    {
        let state = this.network.socket.readyState; 
        return state;
    }

}