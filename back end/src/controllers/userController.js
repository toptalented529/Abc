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
import { Ranges } from '../config/config'
const bip39 = require('bip39')
const Wallet = require('ethereumjs-wallet')
const ethers = require('ethers');
const { bufferToHex, fromRpcSig, toBuffer, hashPersonalMessage, ecrecover, publicToAddress } = require('ethereumjs-util');
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
                range:1,

            })
            res.status(200).json({ nonce: user.nonce,existing:false })
        } else {
            res.status(200).json({ nonce: existinguser.nonce,existing:true })
        }




    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const restoreAccount = async (req, res, next) => {
    const { address } = req.body
    try {
        const existinguser = await models.User.findOne({ where: { address } });
        console.log(existinguser, address)
        if (!existinguser) {
           
         
            res.status(200).json({ nonce:"",existing:false })
        } else {
            res.status(200).json({ nonce: existinguser.nonce,existing:true })
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
    const children = [];
    const existinguser = await models.User.findOne({ where: { address: req.address } });
    let  amountArray = []
    let rangeResultArray = []
    let my_rangeAmount =0
    let childrenIDArray = []
     try{
        const resultArray = await contract?.methods.getNodeChildren(existinguser.id).call();
        console.log(resultArray);
        my_rangeAmount = await contract.methods.getNodeRangeAccum(existinguser.id).call();
        const my_range = await contract.methods.getNodeRange(existinguser.id).call();
        const range = Ranges.indexOf(my_range) +1
        console.log(my_range,range)
        for(let i = 0; i< resultArray.length; i ++ ) {
        const result = await contract.methods.getPurchasedAmount(resultArray[i]).call();
        const rangeResult = await contract.methods.getNodeRangeAccum(resultArray[i]).call();
        amountArray.push(result)
        rangeResultArray.push(rangeResult)
        childrenIDArray.push(parseInt(resultArray[i]))
        }

        for(let j = 0; j < amountArray.length;j ++) {
            for(let k = j +1;k < amountArray;k ++){
                if(amountArray[k] > amountArray[j]){
                  const temp = amountArray[j]
                    amountArray[j] = amountArray[k]
                    amountArray[k] = temp


                  const temp1 = resultArray[j]
                  resultArray[j] = resultArray[k]
                  resultArray[k] = temp1
                 
                 
                  const temp2 = rangeResultArray[j]
                  rangeResultArray[j] = rangeResultArray[k]
                  rangeResultArray[k] = temp2

                }
            }
        }

        existinguser.my_team_prev_rank = existinguser.my_team_rank;
        existinguser.my_team_rank = childrenIDArray
        existinguser.range = range

       await existinguser.save()
    
    }catch(e){
        console.log(e)
        res.status(401).json({success:false})
        return
    }

    
    for(let u = 0; u < existinguser.my_team_rank.length; u ++){
        const child = await models.User.findById(existinguser.my_team_rank[u])
        children.push(child)
    }



    

    res.status(200).json({ user: existinguser, myRangeAmount:my_rangeAmount,children:children,children_purchased:amountArray,rangeAmount:rangeResultArray})
}



export const getUser = async (req, res) => {
    const children = [];
    const existinguser = await models.User.findOne({ where: { id: req.query.userID } });
    let  amountArray = []
    let rangeResultArray = []
    let childrenIDArray = []
    let  my_rangeAmount = []
     try{
        const resultArray = await contract.methods.getNodeChildren(existinguser.id).call();
        console.log(resultArray);
        my_rangeAmount = await contract.methods.getNodeRangeAccum(existinguser.id).call();

        for(let i = 0; i< resultArray.length; i ++ ) {
        const result = await contract.methods.getPurchasedAmount(resultArray[i]).call();
        const rangeResult = await contract.methods.getNodeRangeAccum(resultArray[i]).call();
        rangeResultArray.push(rangeResult)
        amountArray.push(result)

        childrenIDArray.push(parseInt(resultArray[i]))

        }

        for(let j = 0; j < amountArray.length;j ++) {
            for(let k = j +1;k < amountArray;k ++){
                if(amountArray[k] > amountArray[j]){
                  const temp = amountArray[j]
                    amountArray[j] = amountArray[k]
                    amountArray[k] = temp


                  const temp1 = resultArray[j]
                  resultArray[j] = resultArray[k]
                  resultArray[k] = temp1

                  const temp2 = rangeResultArray[j]
                  rangeResultArray[j] = rangeResultArray[k]
                  rangeResultArray[k] = temp2

                }
            }
        }

        existinguser.my_team_prev_rank = existinguser.my_team_rank;
        existinguser.my_team_rank = childrenIDArray

       await existinguser.save()
    
    }catch(e){
        console.log(e)
        res.status(401).json({success:false})
        return
    }

    
    for(let u = 0; u < existinguser.my_team_rank.length; u ++){
        const child = await models.User.findById(existinguser.my_team_rank[u])
        children.push(child)
    }




    

    const user = req.currentUser;
    res.status(200).json({ user: existinguser, myRangeAmount:my_rangeAmount,children:children,children_purchased:amountArray,children_rangeAmount:rangeResultArray })
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
        // const msg = user.nonce;
        console.log("1111111111111111111111", msg)
        const msg = `Signing to Office: ${user.nonce}`;

    // We now are in possession of msg, publicAddress and signature. We
    // can perform an elliptic curve signature verification with ecrecover
    const msgBuffer = toBuffer(Buffer.from(msg, 'utf8'));
    const msgHash = hashPersonalMessage(msgBuffer);
    const signatureBuffer = toBuffer(signature);
    const signatureParams = fromRpcSig(signatureBuffer);
    const publicKey = ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addressBuffer = publicToAddress(publicKey);
    const SSaddress = bufferToHex(addressBuffer);

        if (address.toLowerCase() !== SSaddress.toLowerCase()) {
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
   try{
    if (!existinguser) {
        res.status(400).json({ success: "no user exist" })
        return
    }
    console.log("77777777777777777777", req.body)
    existinguser.nickname = req.body.nickname;
    const doubleUser = await models.User.findOne({ where: { nickname: req.body.nickname } })
    if (doubleUser) {
      return  res.status(400).json({ success: false })
    }
    await existinguser.save()
    res.status(200).json({ user: existinguser, success: true })
   }catch(e){
  return  res.status(400).json({ success: false })

   }
   

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

    try{
        const transaction = contract.methods.addMember(existinguser.id, sponser.id, req.address);
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
        console.log(e)
        res.status(401).json({success:false})
        return
    }

   






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

export const setSignUpRequest = async (req,res) => {
    try{
        const result = await models.MarketplaceSginup.findOne({where:{email:req.body.email,nickname:req.body.nickname}})
        if(result) {
            return res.status(401).json({success:false})
        }
        const user_result = await models.User.findOne({where:{nickname:req.body.nickname}})
        if(!user_result){
            return res.status(400).json({success:false})
        }
        const result_same = await models.MarketplaceSginup.findOne({where:{nickname:req.body.nickname}})
        if(result_same){
            await models.MarketplaceSginup.destroy({where:{nickname:req.body.nickname}})
        }


        await models.MarketplaceSginup.create({
            email:req.body.email,
            nickname:req.body.nickname,
            accepted:false,
        })

        res.status(200).json({success:true})


    }catch(e) {
        console.log(e)
    }
}

export const marketplaceRequestcheck = async (req,res) => {

    try{
        const user = await models.User.findOne({where:{address:req.address}})
        const result = await models.MarketplaceSginup.findOne({where:{nickname:user.nickname}})
        if(result){
                return res.status(200).json({success:true,result:"Request exists!",request:result})
        }else{
            return res.status(400).json({success:false,result:"Requst is not there"})

        }
   
    }catch(e){

    }
}

export const approveSignUp = async (req,res) => {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    try{
        const user = await models.User.findOne({where:{address:req.address}})
        
        const request = await models.MarketplaceSginup.findOne({where:{email:req.body.email,nickname:req.body.nickname}})
     
        
        
        const response = await axios.post("https://31.220.82.149/rest/V1/integration/admin/token", {
            username: "admin",
            password: "admin123",
        }, {
            httpsAgent: agent,
        })
        
        
        
        const customerId =await axios.get(`https://31.220.82.149/rest/V1/customers/search?searchCriteria[filterGroups][0][filters][0][field]=email&searchCriteria[filterGroups][0][filters][0][value]=${req.body.email}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq`,{
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${response.data}`
            }
        })
        
        
        await axios.put(`https://31.220.82.149/rest/V1/customers/${customerId.data.items[0].id}`,{
            customer: {
                id:customerId.data.items[0].id,
                custom_attributes:[
                    {
                        attribute_code:"office_id",
                        value:user.id,
                    }
                ]
                
            }
        },{
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${response.data}`
                
            }
        })
        console.log("22222222222222222222",customerId.data.items[0].id)
        
        request.accepted =true;
        await request.save()


   res.status(200).json({success:true})

    }catch(e){
        res.status(401).json({success:false})
    }
}
export const rejectSignUp = async (req,res) => {
    try{
        const request = await models.marketplaceRequestcheck.findOne({where:{email:req.body.email,nickname:req.body.nickname}})
        request.accepted = false;
        await request.save()



   await models.marketplaceRequestcheck.destroy({where:{email:req.body.email,nickname:req.body.nickname}})


   res.status(200).json({success:true})

    }catch(e){
        res.status(400).json({success:false})
    }
}


///////////////// when user ////////////////////////////////

export const checkEthereumAddress = async(req,res) => {
    try {
        // Check if the address is a valid checksum address
        const checksumAddress = ethers.utils.getAddress(req.body.address);
        // Compare the original address with the checksum address
        if (req.body.address === checksumAddress) {
            // If they are the same, then it's a valid Ethereum address
            return res.status(200).json({success:true});
        } else {
            // If they are different, then it's an invalid Ethereum address
            return res.status(400).json({success:false});
        }
    } catch (error) {
        // If there's an error, then it's an invalid Ethereum address
        return res.status(400).json({success:false});
    }

}