// const db = require("../../data/db-config");

const express = require('express')

const router = express.Router()
const Recipe = require("./recipes-model")

router.get('/', (req, res, next) => {
res.json({
    message: "WIP"
})
})

router.get('/:recipe_id', (req, res, next) => {
    const {recipe_id} = req.params
    Recipe.getRecipeById(recipe_id)
    .then(data => {
        res.json(data)
    }).catch(err => {
        next(err)
    })
    })



router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: 'Finding the real error is 90% of the bug fix',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router