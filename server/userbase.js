class Userbase {

    constructor()
    {
        this.list = [];
    }

    addUser(obj)
    {
        let uid = obj.id;
        let name = obj.name;
        this.list.push(obj);
        
        Logger.info(`Added user ${name}:${uid} to the base!`);
    }

}

module.exports = Userbase;