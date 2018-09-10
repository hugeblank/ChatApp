class Utility {

    constructor(network)
    {
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

    sendName()
    {
        let name = window.userName;
        this.sendMessage('i', name);
    }

    sendMessage(key, data)
    {
        let len =  1 + data.length;
        let offset = 0;
  
        let msg = this.prepPacket(len);
        msg.setUint8(offset, key.charCodeAt(0));
        offset++;
  
        for (var i = 0; i < data.length; i++) {
            msg.setUint8(offset, data.charCodeAt(i));
            offset++;
        }

        this.network.send(msg);
    }

}