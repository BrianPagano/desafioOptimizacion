const { Router } = require('express')
const authMiddleware = require('../middlewares/private-acces-middleware')
const publicAcces = require('../middlewares/public-acces-middleware')
const router = Router()

router.get('/login', publicAcces , async (req, res) => {
    try {
     res.render ('login', {style:'style.css'})   
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/signup', publicAcces , async (req, res) => {
    try {
     res.render ('signup', {style:'style.css'})   
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const { user } = req.session
        res.render ('profile', { user , style:'style.css'})   
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }})

    router.get('/forgotPassword', async (req, res) => {
        try {
            res.render ('forgotPassword', { style:'style.css'})   
        } catch (error) {
            console.error ('Error:', error.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }})
    


module.exports = router