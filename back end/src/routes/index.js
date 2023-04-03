import express, { Router } from 'express';
import * as userController from '../controllers/userController'
import * as transactionController from '../controllers/transactionController'
import validate from '../handlers/validation'
import {saveUser} from '../middleware/validators'
import {useAuth} from '../middleware/auth'

const router = express.Router();


router.get('/', (req, res) => {
res.json({message: 'اهلا بالعالم'})
});

//user routes
router.post('/account/signup', userController.register)
router.post('/account/signin', userController.login)
router.get("/account/mnemonic", userController.mnemonic)
router.get('/account/me',useAuth, userController.me)
router.get('/account/sponser',useAuth, userController.sponser)
router.post('/account/setpin',useAuth, userController.setPin)
router.post('/account/setnickname',useAuth, userController.setNickName)
router.get('/account/profile',useAuth, userController.getProfile)
router.post('/account/setnickname',useAuth, userController.setNickName)
router.post('/account/setsponsername',useAuth, userController.setSponserName)
router.get('/account/checkoldaccount',useAuth, userController.checkOldAccount)
router.post('/account/importolddata',useAuth, userController.importOldData)
router.post('/account/importblockchain', userController.addBlockchainMembers)
router.post('/transaction/import',transactionController.register)
router.post('/account/import',userController.registerForOld)
router.post('/transaction/import-hayek',transactionController.register_hayek)
router.post('/transaction/import-genu',transactionController.register_genu)
//doctor controllers

export default router;