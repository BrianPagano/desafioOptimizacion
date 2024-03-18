const { Router } = require('express')
const router = Router()
const authorization = require('../middlewares/authorization-middleware')

router.get('/', authorization('admin'), async (req, res) => {
    try {
     const { user } = req.session
     res.render ('addProduct', {
        user,
        style:'style.css'})   
    } catch (error) {
        console.error ('Error al obtener los products:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router
