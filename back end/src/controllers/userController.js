import bcrypt from 'bcryptjs'
import models from '../models'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Signature } from 'ethers'
import axios from 'axios'
const uuid = require('uuid');
const https = require('https');
import joi, { array } from "joi"
import 'dotenv/config';
import sequelize from 'sequelize'
import { contract, web3, account, privateKey } from '../config/web3Config'
const bip39 = require('bip39')
const Wallet = require('ethereumjs-wallet')
const ethers = require('ethers');
const { bufferToHex } = require('ethereumjs-util');
const { recoverPersonalSignature } = require('eth-sig-util')
const sha256 = require('js-sha256'); // Import SHA-256 hash library




export const register = async (req, res, next) => {
    const { address } = req.body
    try {
        const existinguser = await models.User.findOne({ where: { address } });
        console.log(existinguser, address)
        if (!existinguser) {
            const nonce = crypto.createHmac('sha256', process.env.NONCE_SECRET)
                .update(address + uuid.v4())
                .digest('hex');

            const maxIdResult = await models.User.findOne({
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('id')), 'maxId']
                ]
            });
            const maxId = maxIdResult.get('maxId') || 0;
            const nextId = maxId + 1;
            console.log("eree", existinguser, nonce, nextId)

            const user = await models.User.create({
                id: nextId,
                address,
                nonce,
                pin: 1,
            })
            res.status(200).json({ nonce: user.nonce })
        } else {
            res.status(200).json({ nonce: existinguser.nonce })
        }




    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const registerForOld = async (req, res, next) => {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const response = await axios.get("https://52.34.174.139/universo/Univer_dat_dat/v1/inv_u?api_key=aIISBDmz", { httpsAgent: agent })
    const { inv_u } = response.data
    inv_u?.map(async (inv, index) => {
        const { id, name, seudonimo, pwd, eml, inv_ref, act_unepro, sal, ran_u, tkns, hayeks, emp, emp_prod, emp_inv, act_tkn, act_prod, nombramiento } = inv
        try {
            console.log("555555555555555555555555555", sal)
            const existinguser = await models.User.findOne({ where: { id } });
            if (!existinguser) {

                const nickname = eml.split('@')[0]
                const usable_NickName = await getNickName(nickname, 0)
                console.log(nickname, usable_NickName)
                const transaction = await models.User.create({
                    id,
                    name,
                    nickname: usable_NickName,
                    pwd,
                    eml,
                    parent_id: inv_ref,
                    genu_preseved: tkns,
                    mos_preseved: sal,
                    range: ran_u,
                    emp,
                    emp_prod,
                    emp_inv,
                    act_tkn,
                    act_prod,
                    act_unepro,
                    hayeks_preseved: hayeks,
                    nombramiento,


                })
                console.log(transaction.id)
                // res.status(200).json({ id:transaction.id })
            }

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    res.status(200).json({ succss: "success" })



}
export const getNickName = async (nickname, attachnumber) => {
    let name;
    const existinguser = await models.User.findOne({ where: { nickname } });
    if (existinguser) {

        if (attachnumber == 0) {
            name = nickname + (attachnumber + 1)
        } else {
            name = nickname.slice(0, nickname.length - 1) + (attachnumber + 1)
        }
        const doubleName = await models.User.findOne({ where: { nickname: name } });
        if (doubleName) {
            getNickName(name, attachnumber + 1)
        }

        return name


    } else {
        return nickname
    }
}

export const login = async (req, res, next) => {

    const schema = joi.object({
        address: joi.string().trim(true).required(),
        signature: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        // TODO return better error messages
        return res.status(400).send();
    }

    const user = await verifySignature(req.body.address.trim(), req.body.signature.trim());
    if (user === null) {
        return res.status(401).send();
    }

    // TODO set expire time to be 24 hours
    console.log("222222222222222", process.env.JWT_SECRET, user.id)
    const token = jwt.sign({ id: user.id, address: req.body.address }, process.env.JWT_SECRET);

    return res.status(200).json({ success: true, jwt: token });
}



export const me = async (req, res) => {
    const existinguser = await models.User.findOne({ where: { address: req.address } });

    const user = req.currentUser;
    res.status(200).json({ user: existinguser })
}
export const sponser = async (req, res) => {
    const existinguser = await models.User.findOne({ where: { address: req.address } });
    const sponser = await models.User.findOne({where:{id:existinguser.parent_id}})
    const user = req.currentUser;
    res.status(200).json({ user: sponser })
}

//get profile from the current user
export const getProfile = async (req, res, next) => {
    try {
        const user = await models.User.findOne(
            {
                where: { id: req.currentUser.id },
                include: [{ model: models.Profile, as: 'profile' }],
                attributes: { exclude: ['password'] }
            })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err.message)

    }
}

export const mnemonic = async (req, res) => {
    try {
        const mnemonic = bip39.generateMnemonic(256)
        let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)

        const privateKey = mnemonicWallet.privateKey;
        const publicKey = mnemonicWallet.publicKey;

        console.log(mnemonicWallet.privateKey)
        res.status(200).json({ mnemonic, privateKey, publicKey })

    } catch (e) {
        console.log(e)
    }
}


export const verifySignature = async (address, signature) => {
    const user = await models.User.findOne({ where: { address } });
    if (user != null) {
        const msg = user.nonce;
        console.log("1111111111111111111111", msg)
        const msgBufferHex = bufferToHex(Buffer.from(msg, 'hex'));
        const sigAddress = recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
        })
        console.log("55555555555555555555", sigAddress)
        if (address.toLowerCase() !== sigAddress.toLowerCase()) {
            return null;
        }

        const nonce = crypto.createHmac('sha256', process.env.NONCE_SECRET)
            .update(address + uuid.v4())
            .digest('hex');
        user.nonce = nonce;
        await user.save()
        return user;
    }
    return null;
}
export const setPin = async (req, res) => {
    const existinguser = await models.User.findOne({ where: { address: req.address } });
    console.log("99999999999", req.body)
    existinguser.pin = req.body.pin;
    await existinguser.save()
    res.status(200).json({ user: existinguser, success: true })

}



export const setNickName = async (req, res) => {
    const existinguser = await models.User.findOne({ where: { address: req.address } });
    if (!existinguser) {
        res.status(400).json({ success: "no user exist" })
        return
    }
    console.log("77777777777777777777", req.body)
    existinguser.nickname = req.body.nickname;
    const doubleUser = await models.User.findOne({ where: { nickname: req.body.nickname } })
    if (doubleUser) {
        res.status(400).json({ success: false })
    }
    await existinguser.save()
    res.status(200).json({ user: existinguser, success: true })

}


export const setSponserName = async (req, res) => {
    const sponser = await models.User.findOne({ where: { nickname: req.body.sponsername } })
    console.log("555555555555555", req.body.sponsername)
    if (!sponser) {
        res.status(404).json({ success: false })
        return
    }
    const existinguser = await models.User.findOne({ where: { address: req.address } });
    if (!existinguser) {
        res.status(400).json({ success: false })
        return
    }
    console.log("666666666666", req.body)
    existinguser.parent_id = sponser.id
    await existinguser.save()

    // try{
    //     const transaction = contract.methods.addMember(existinguser.id, sponser.id, account.address);
    //     console.log("sdfsdfsdf", account.address)
    //     let estimatedGas = await transaction.estimateGas({ from: account.address });
    
    //     const options = {
    //         to: transaction._parent._address,
    //         gas: estimatedGas * 2, //sometimes estimate is wrong and we don't care if more gas is needed
    //         data: transaction.encodeABI(),
    //     };
    
    //     const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    //     const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    //     console.log(receipt)
    
    
    // }catch(e){
    //     console.log(e)
    //     res.status(401).json({success:false})
    //     return
    // }

   






    res.status(200).json({ user: existinguser, success: true })

}


//////////////////////////////add existing members in blockchian ////////////////

export const addBlockchainMembers = async (req, res) => {


    const users = await models.User.findAll()
    console.log("24323423",users.length)
    for (let i = 0; i < users.length; i += 20) {
        let usersID = [];
        let users_Parent_ID = [];
        let mine = []
        for (let j = 0; j < 20; j++) {

            usersID.push(users[ i + j].id)
            users_Parent_ID.push(users[i + j].parent_id)
            mine.push(account.address)
        }
        try{

            const transaction = contract.methods.addMembers(usersID, users_Parent_ID,mine);
            console.log("sdfsdfsdf", account.address)
            let estimatedGas = await transaction.estimateGas({ from: account.address });
    
            const options = {
                to: transaction._parent._address,
                gas: estimatedGas * 2, //sometimes estimate is wrong and we don't care if more gas is needed
                data: transaction.encodeABI(),
            };
    
            const signed = await web3.eth.accounts.signTransaction(options, privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
            console.log(receipt)
        }catch(e){
            i = i-20;
        }


    }
        res.status(200).json({success:"success"})

}




/////////////////check email and password match ////////////

export const checkOldAccount = async (req, res) => {
    console.log("8888888888888888888", req.query.email)
    const oldUser = await models.User.findOne({ where: { eml: req.query.email } });
    if (!oldUser) {
        res.status(400).json({ success: false });
        return;
    }

    const hashedPassword = crypto.createHash("sha3-256").update(req.query.password).digest('hex');
    if (hashedPassword === oldUser.pwd) {

        res.status(200).json({ success: true, oldUserEmail: oldUser.eml });
        return
    } else {
        res.status(404).json({ success: false });
        return
    }




}

////////////when Onboarding user import old data ///////////////

export const importOldData = async (req, res) => {

    try {
        const user = await models.User.findOne({ where: { address: req.address } });
        const oldUser = await models.User.findOne({ where: { eml: req.body.email } });

        // Update properties of the oldUser instance
        oldUser.address = user.address;
        oldUser.nonce = user.nonce;
        oldUser.vitalImport = Boolean(req.body.vitalImport);
        oldUser.pin = 1;
        // Update any foreign key references to the user instance
        // ...

        // Save changes to the oldUser instance
        await oldUser.save();

        // Delete the user instance
        await models.User.destroy({ where: { id: user.id } });
     
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error importing old data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


///////////////// when user 