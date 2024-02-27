// Serach 
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this;
    }
    filter() {
        const queryCopy = {...this.queryStr}
        //  Removing Some Feild for category
        console.log("queryCopybefore",queryCopy)
        const removeFeilds = ["keyword", "page", "limit"];

        removeFeilds.forEach(key => delete queryCopy[key]);

        console.log("queryCopyafter",queryCopy)

        this.query = this.query.find(queryCopy)
        return this;
    }
}


module.exports = ApiFeatures