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
        if (result.rowCount === 0) res.json([])
        else {
            res.json(result.rows)
        }
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sqlConn.connection.query(`SELECT * FROM items where id=${id}`)
        if (result.rowCount === 1) {
            res.json(result.rows[0])
        }
        else {
            throw new Error(`item(id=${id}) Does Not Exist.`)
        }
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
});

router.post('/add', async (req, res) => {
    try {
        const addNewItem = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };
        console.log(addNewItem)
        const insert = await sqlConn.connection.query(`INSERT INTO items (id, name, description, price) VALUES ('${addNewItem.id}', '${addNewItem.name}', '${addNewItem.description}', '${addNewItem.price}')`);
        if (insert.rowCount === 1) console.log('Item Inserted Successfully.');
        res.status(201).send('Item Inserted Successfully.')
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dlt = await sqlConn.connection.query(`Delete from items where id=${id}`);
        if (dlt.rowCount === 1) console.log(`Item Deleted Successfully whose id=${id}.`);
        res.status(201).send('Item Deleted Successfully.')
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const UpdateItem = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
        };
        console.log(UpdateItem)
        const update = await sqlConn.connection.query(`Update items set name='${UpdateItem.name}', description='${UpdateItem.description}', price=${UpdateItem.price} where id=${id}`);
        if (update.rowCount === 1) console.log(`Item Updated Successfully whose id=${id}.`);
        res.send('Item Updated Successfully.')
    } catch (error) {
        return res.status(500).json({ msg: `${error.message}` });
    }
})

module.exports = router;