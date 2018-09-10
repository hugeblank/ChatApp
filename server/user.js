class User {

    constructor(parent, id, client)
    {
        this.parent = parent;
        this.id = id;
        this.client = client;
    }

    onMessage(msg)
    {
        var offset = 0;
        var reader = new BinaryReader(msg);
        var id = String.fromCharCode(reader.readUInt8());
        offset++;

        switch(id)
        {
            case 't':
                this.getChatMsg(msg, reader, offset);
                break;
            case 'i':
                this.setName(msg, reader, offset);
                break;
        }
    }

    onCloseConn(code, reason)
    {
        Logger.warn(`Client with id: ${this.id} disconnected with code ${code}`);
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

        Logger.info(`${this.name}: ${text}`);
        this.sendChat(this.name, text);
    }

    sendChat(name, text)
    {
        let packet = `${name}%${text}`;

        let writer = new BinaryWriter();
        writer.writeUInt8('c'.charCodeAt(0));

        for (let i = 0; i < packet.length; i++)
        {
            let letter = packet.charCodeAt(i);
            writer.writeUInt8(letter);
        }

        this.client.send(writer.toBuffer());
    }

    negotiateName()
    {
        let writer = new BinaryWriter();
        writer.writeUInt8('n'.charCodeAt(0));

        this.client.send(writer.toBuffer());
    }

    setName(msg, reader, offset)
    {
        let name = '';
        let len = msg.byteLength;

        for (let i = offset; i < len; i++)
        {
            let letter = String.fromCharCode(reader.readUInt8());
            name += letter;
        }

        this.name = name;
        this.parent.userBase.addUser(this); 
        this.nameRegistered();
    }

    nameRegistered()
    {
        let writer = new BinaryWriter();
        writer.writeUInt8('r'.charCodeAt(0));

        this.client.send(writer.toBuffer());
    }
}

module.exports = User;