const { response } = require('express')
const express = require('express')
const app = express()
const port = 3001

const recipes_model = require('./recipes_model')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    recipes_model.getRecipes()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/create', (req, res) => {
    recipes_model.createRecipe(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/delete/:id', (req, res) => {
    recipes_model.deleteRecipe(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/update', (req, res) => {
    recipes_model.updateRecipe(req.body)
    .then(response => {
        res.status(200).send(response)
    })
    .catch((error => {
        res.status(500).send(error)
    }))
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

