const express = require('express');
const cors = require('cors')
const app = express();
const knex = require('./mysql')

app.use(express.json())

app.get('/',(req,res)=>{
    knex('upfile').select().then((result)=>{
        res.send(result)
    }).catch((error)=>{
        res.status(500).send('askodp')
        console.log('deu ruim',error)
    })

})


app.post('/',(req,res)=>{
    if(typeof req.body.up_size != number){
        return res.status.send('tem que ser um numero')
    }

    knex('upfile').insert(req.body).then(()=>{
        res.send('deu bom')
    }).catch((error)=>{
        res.status(500).send('askodp')
        console.log('deu ruim',error)
    })
    
})
app.listen(8080,()=>{
    console.log('Servidor Iniciado');
})









