class Userbase {

    constructor()
    {
        this.list = [];
    }

    addUser(obj)
    {
        let uid = obj.id;
        this.list.push(obj);
        
        Logger.info(`Added ${uid} to list ${this.list[0]}`);
    }

}

module.exports = Userbase;