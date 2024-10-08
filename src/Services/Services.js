class Services{
    constructor(model){
        this.model = model
    }

    async findAll(query){
        try {
            const find = this.model.find(query)
            return {results: find, error: false}
        } catch (error) {
            return {results: false, error}
        }
    }

    async findById(id){
        try {
            const find = this.model.findById({_id: id})
            return {results: find, error: false}
        } catch (error) {
            return {results: false, error}
        }
    }

    async register(body){
        try {
            await this.model.create(body)
            return {results: true, error: false}
        } catch (error) {
            return {results: false, error}
        }
    }

    async update(id, body){
        try {
            await this.model.findByIdAndUpdate({_id: id}, body)
            return {results: true, error: false}
        } catch (error) {
            return {results: false, error}
        }
    }

    async delete(id){
        try{
            await this.model.findByIdAndUpdate({_id: id})
            return {results: true, error: false}
        } catch (error) {
            return {results: false, error}
        }
    }
}

module.exports = Services