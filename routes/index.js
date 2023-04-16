const express = require('express');
const router = express.Router();
const sqlConn = require('../connection')
sqlConn.connection
    .connect()
    .then(() => console.log("Database Connected ..."))
    .catch((err) => console.error("Connection error", err.stack));

router.get('/', async (req, res) => {
    try {
        const result = await sqlConn.connection.query(`SELECT * FROM items`)
        if (result.rowCount === 0) throw new Error('items Does Not Exist.')
        else {
            res.json(result.rows)
        }
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
});

router.post('/add', async (req, res) => {
    try {
        const addNewItem = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };
        console.log(addNewItem)
        const insert = await sqlConn.connection.query(`INSERT INTO items (name, description, price) VALUES ('${addNewItem.name}', '${addNewItem.description}', '${addNewItem.price}')`);
        if (insert.rowCount === 1) console.log('Campaigner Inserted Successfully.');
        res.status(201).send('Campaigner Inserted Successfully.')
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
});

module.exports = router;