class User {

    constructor(id, client)
    {
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
                this.setName(this, msg, reader, offset);
                break;
        }
    }

    onCloseConn(code, reason)
    {
        Logger.warn(`Client with id: ${this.id} disconnected with code ${code}`);
    }

    negotiateName()
    {
        let writer = new BinaryWriter();
        writer.writeUInt8('n'.charCodeAt(0));

        this.client.send(writer.toBuffer());
    }
}

module.exports = User;