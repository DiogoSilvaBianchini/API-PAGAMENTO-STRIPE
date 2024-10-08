class Services{
    constructor(model){
        this.model = model
    }

    static async findAll(){
        const find = this.model.findAll()
        return find
    }
}

module.exports = Services