const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
const  multipart  =  require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',(req,res)=>{
    knex('upfile').select().then((result)=>{
        res.send(result)
    }).catch((error)=>{
        res.status(500).send('askodp')
        console.log('deu ruim',error)
    })

})

app.post('/', multipartMiddleware, (req, res) => {
    res.json({
        'message': 'File uploaded succesfully.'
    });
});

app.listen(6090,()=>{
    console.log('Servidor Iniciado');
})









