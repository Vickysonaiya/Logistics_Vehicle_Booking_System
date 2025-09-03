const mongoose = require('mongoose')

const connectDb = async () => {
    try { await mongoose.connect('mongodb+srv://vickysonaiya0189_db_user:0XIrsTYChVTKtWAP@truckmanagement.lcqx4cn.mongodb.net/?retryWrites=true&w=majority&appName=TruckManagement') }
    catch (err) {
        console.log(`Something went wrong while connecting database... ${err.message}`)
        throw err;
    }
}

module.exports = connectDb;