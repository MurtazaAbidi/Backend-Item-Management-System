const express = require("express");
const app = express();
const cors = require('cors');
const http = require('http')
const server = http.createServer(app);
const indexRoutes = require("./routes/index");


app.use(cors());
require('dotenv').config();

app.get('/', (req, res)=>{
    console.log("Api working fine");

    res.json({message:'Api working fine'})
})

app.use("/api/", indexRoutes);

server.listen(process.env.PORT, () => {
    console.log("SERVER running at port "+`${process.env.PORT}`)
})