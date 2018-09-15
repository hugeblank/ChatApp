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

    handleChat(msg, offset)
    {
        let chat = '';
        for (let i = offset; i < msg.byteLength; i++)
        {
            let letter = String.fromCharCode(msg.getUint8(i));
            chat += letter;
        }

        let userName = chat.substr(0, chat.indexOf('%'));
        let text = chat.substr(chat.indexOf('%') + 1);

        this.addChatBubble(userName, text);
    }

    addChatBubble(name, text)
    {
        let ran = Math.round(0xffffff * Math.random());
        let r = ran >> 16;
        let g = ran >> 8 & 255;
        let b = ran & 255;
        
        let listElement = `<li class="message" style="display: list-item;">`;
        listElement += `<span class="username" style="color: rgb(${r}, ${g}, ${b});">${name}</span>`;
        listElement += `<span class="messageBody">${text}</span>`;
        listElement += `</li>`;
        $('#messages').append(listElement);  
    }

}