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

    nameRegistered()
    {
        this.fadeIn('chatArea');
    }

    prepPacket(len)
    {
        return new DataView(new ArrayBuffer(len));
    }

    sendUser()
    {
        let name = window.userName;
        let color = window.userColor;
        let msg = `${name}\0${color}\0`;

        this.sendMessage('i', msg);
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

    handleChat(msg, offset)
    {
        let chat = '';
        for (let i = offset; i < msg.byteLength; i++)
        {
            let letter = String.fromCharCode(msg.getUint8(i));
            chat += letter;
        }
        let data = [];
        while (chat.indexOf('\0') > -1) {
            data[data.length] = chat.substr(0, chat.indexOf('\0')); // Get the split parsed parameter
            chat = chat.substr( (data[data.length-1].length + 1), (chat.length) - (data[data.length-1].length + 1) ); // Get the remaining unparsed data
        }
        this.addChatBubble(data[0], data[1], data[3], data[2]);
    }

    addChatBubble(name, color, text, time)
    {
        let listElement = `<li class="message" style="display: list-item;">`;
        listElement += `<span class="username" style="color: ${color};">${name}</span>`;
        listElement += `<span class="timestamp">${time}<br/></span>`;
        listElement += `<span class="messageBody">${text}</span>`;
        listElement += `</li><br/>`;
        $('#messages').append(listElement);
    }

}
