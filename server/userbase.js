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

    getUsers()
    {
        return this.list
    }

    removeUser(obj)
    {
        let user = this.list.find(usr => usr.id === obj.id);
        let userIndex = this.list.indexOf(user);
        this.list.splice(userIndex, 1);

        Logger.warn(`${user.name} has been removed from the user base!`);
    }

}

module.exports = Userbase;