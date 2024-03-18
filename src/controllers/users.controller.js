const { Router } = require('express')
const router = Router()
const passport = require ('passport')
const UserService = require ('../services/user.service')



router.get ('/user-cart', async (req, res) => {
    try {
        // Recuperar el valor cid de la sesión del usuario
        const cid = req.session.cart
        if (!cid) {
            const uid = req.user._id
            const userCart = await UserService.getUserCart(uid)
            if (!userCart) {
                return res.status(404).json({ error: 'Usuario no encontrado' })
            }
            res.status(200).json({status: 'success', cid: userCart})
        }
    } catch (error) {
        console.error('error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post ('/', passport.authenticate('register', {failureRedirect: '/api/users/fail-Register'}),  async (req, res) => {
    try {
        res.status(201).json ({status: 'success', message: 'Usuario' })
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get ('/fail-Register', (req, res) => {
    console.log ('Fallo registro')
    res.status(400).json({status: 'error',  error: 'bad Request' })
})

//actualizar el user con el carrito creado
router.put('/', async (req, res) => {
    try {
        const uid = req.user._id
        const { cart: cid } = req.body
        // Actualiza el carrito del usuario en la base de datos
        await UserService.updateUserCart(uid, cid)
        // Enviar una respuesta al cliente
        res.status(200).json({ status: 'success', message: 'User cart updated successfully' })
    } catch (error) {
        console.error('Error al actualizar el carrito del usuario:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router