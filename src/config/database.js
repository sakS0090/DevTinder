const mongoose = require ('mongoose');


async function makeConnection(){

    const connect= await mongoose.connect('mongodb://sakshisingh3746_db_user:ddul5F8tkTy9vX6w@ac-fckaew2-shard-00-00.uk8veah.mongodb.net:27017,ac-fckaew2-shard-00-01.uk8veah.mongodb.net:27017,ac-fckaew2-shard-00-02.uk8veah.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-45c92s-shard-0&authSource=admin&appName=NamasteNode');

}

module.exports={
    makeConnection,
};