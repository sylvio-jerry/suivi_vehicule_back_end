const router = require('express').Router()
const utilisateur = require('../controller/authController')

router.get('/', utilisateur.getAll)
router.get('/:id', utilisateur.getById)
router.post('/', utilisateur.register)
router.put('/:id', utilisateur.update)
router.post('/login', utilisateur.login)
router.delete('/:id', utilisateur.delete)
module.exports = router