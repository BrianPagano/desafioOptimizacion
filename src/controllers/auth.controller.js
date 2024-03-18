const { Router } = require('express')
const Users = require('../DAO/models/user.model')
const { createHash } = require('../utils/cryp-password.util')
const passport = require('passport')
const router = Router()
const SensibleDTO = require ('../DTO/sensible-user')



router.post ('/', passport.authenticate('login', {failureRedirect: '/auth/fail-login'}) , async (req, res) => {
    try {
        const {email} = req.body
        const lowercaseEmail = email.toLowerCase()

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: lowercaseEmail,
            age: req.user.age,
            role: req.user.role,
            cart: req.user.cart,
        }
        res.json ({status: 'success', message: 'Login Succesfull'})
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/current', (req, res) => {
    if (req.isAuthenticated()) {
        const userDTO = new SensibleDTO(req.user)
        res.json({ message: userDTO })
    } else {
        res.status(401).json({status: 'error', message: 'User is not authenticated' })
    }
})


router.get('/fail-login', (req, res) => {
    console.log ('Fallo el logueo')
    res.status().json({status: 'error',  error: 'bad Request' })
})

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' })
            } else {
                return res.status(200).json({ message: 'Logout successful' })
            }
        })
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: error })
    }
})

router.post('/forgotPassword', async (req, res) => {
    try {
        const {email,password} = req.body
        const passwordEncrypted = createHash(password)
        await Users.updateOne ({email}, {password: passwordEncrypted})
        res.status(200).json ({status: 'Success', message: 'Password Updated'})
    } catch (error) {
    console.error ('Error:', error.message)
    res.status(500).json({ error: error })
    }
})

router.get('/github', passport.authenticate('github', {scope: ['user: email']}, (req, res) => {}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),
    (req, res) => {
    req.session.user = req.user
    res.redirect('/api/products')
    }
)

module.exports = router