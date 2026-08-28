const mongoose = require ('mongoose');


async function makeConnection(){

    const connect= await mongoose.connect('process.env.DB_CONN_STRING');

}

module.exports={
    makeConnection,
};