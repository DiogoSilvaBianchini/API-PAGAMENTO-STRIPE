class Services{
    constructor(model){
        this.model = model
    }

    async findAll(){
        try {
            const find = await this.model.find({})

            if(find.length > 0){
                return find
            }else{
                return []
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    async findById(id){
        try {
            const find = await this.model.findById({_id: id})
            return find
        } catch (error) {
            throw new Error(error)
        }
    }

    async register(body){
        try {
            await this.model.create(body)
            return true
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(id, body){
        try {
            await this.model.findByIdAndUpdate({_id: id}, body)
            return true
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete(id){
        try{
            await this.model.findByIdAndDelete({_id: id})
            return {results: true, error: false}
        } catch (error) {
            return {results: false, error}
        }
    }
}

module.exports = Services