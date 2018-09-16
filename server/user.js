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
                this.setDetails(msg, reader, offset);
                break;
        }
    }

    onCloseConn(code, reason)
    {
        this.parent.userBase.removeUser(this);
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
        
        this.sendChat(this.name, this.color, text);
    }

    sendChat(name, color, text)
    {
        let packet = `${name}%${color}%${text}`;

        let writer = new BinaryWriter();
        writer.writeUInt8('c'.charCodeAt(0));

        for (let i = 0; i < packet.length; i++)
        {
            let letter = packet.charCodeAt(i);
            writer.writeUInt8(letter);
        }

        let userList = this.parent.userBase.getUsers();

        userList.forEach((user) =>
            {
                user.client.send(writer.toBuffer());
            }
        );
    }

    negotiateName()
    {
        let writer = new BinaryWriter();
        writer.writeUInt8('n'.charCodeAt(0));

        this.client.send(writer.toBuffer());
    }

    setDetails(msg, reader, offset)
    {
        let data = '';
        let len = msg.byteLength;

        for (let i = offset; i < len; i++)
        {
            let letter = String.fromCharCode(reader.readUInt8());
            data += letter;
        }

        this.name = data.substr(0, data.indexOf('%'));
        this.color = data.substr(data.indexOf('%') + 1);

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