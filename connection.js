const {Client} = require('pg');

const client = new Client({
    host:'satao.db.elephantsql.com',
    port:'5432',
    user: 'fesnqmza', 
    password: 'folmF5Te9eq76joKg9KAzaMonuRpjjOL', 
    database: 'fesnqmza',
})

exports.connection = client;

