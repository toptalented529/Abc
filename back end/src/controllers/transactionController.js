import bcrypt from 'bcryptjs'
import models from '../models'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Signature } from 'ethers'
import axios from 'axios'
import transaction from "../assets/transaction.json"
const https = require('https');
const uuid = require('uuid');

import joi from "joi"
import 'dotenv/config';
import sequelize from 'sequelize'
import { account, payment_contract, privateKey, web3 } from '../config/web3Config'
const bip39 = require('bip39')
const Wallet = require('ethereumjs-wallet')
const ethers = require('ethers');
const { bufferToHex } = require('ethereumjs-util');
const { recoverPersonalSignature } = require('eth-sig-util')


export const register = async (req, res, next) => {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    // const response = await axios.get("https://oficina.universo-blockchain.io/universo/Univer_dat_dat/v1/mov_u?api_key=U8qifyta", { httpsAgent: agent })
    const { mov_u } = transaction
    mov_u?.map(async (mov, index) => {

        const { id, name, fch, hra, fch_hra, inv_u, mov_tip, imp, tkns, hayeks, cve, hash, cant, tracking_number } = mov
        try {
            const existingTransaction = await models.Transaction.findOne({ where: { id } });
            if (!existingTransaction) {


                const transaction = await models.Transaction.create({
                    id,
                    name,
                    fch,
                    hra,
                    fch_hra,
                    inv_u,
                    mov_tip,
                    imp,
                    tkns,
                    hayeks_pos: hayeks,
                    cve,
                    hash,
                    cant,
                    tracking_number
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



export const me = async (req, res) => {
    const existinguser = await models.User.findOne({ where: { address: req.address } });

    const user = req.currentUser;
    res.status(200).json({ user: existinguser })
}

//get profile from the current user
export const getTransaction = async (req, res, next) => {
    try {
        const user = await models.User.findOne(
            {
                where: {
                    address: req.address
                }
            })
        const transaction = await models.Transaction.findAll({ where: { inv_u: user.id } })
        res.status(200).json(transaction)
    } catch (err) {
        res.status(500).json(err.message)

    }
}

export const setPin = async (req, res) => {
    const existinguser = await models.User.findOne({ where: { address: req.address } });
    existinguser.pin = req.body.pin;
    await existinguser.save()
    res.status(200).json({ user: existinguser, success: true })

}


//////////////////////////////////set hayek transaction information for users/////////////////////////

export const register_hayek = async (req, res, next) => {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const response = await axios.get("https://oficina.universo-blockchain.io/universo/Univer_dat_dat/v1/mov_hay_u?api_key=hayek", { httpsAgent: agent })
    const { mov_hay_u } = response.data
    mov_hay_u?.map(async (mov, index) => {

        const { hay_u, id, cant, inv_u } = mov
        try {
            const existinguser = await models.Hayek.findOne({ where: { id } });
            if (!existinguser) {

                console.log(hay_u, id, cant, inv_u)
                const transaction = await models.Hayek.create({
                    code: id,
                    user_id: inv_u,
                    amount_token: cant,
                    series_name: hay_u,
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


export const register_genu = async (req, res, next) => {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const response = await axios.get("https://oficina.universo-blockchain.io/universo/Univer_dat_dat/v1/mov_gen_u?api_key=genu", { httpsAgent: agent })
    const { mov_gen_u } = response.data
    mov_gen_u?.map(async (mov, index) => {

        const { gen_u, id, cant, inv_u } = mov
        try {
            const existinguser = await models.Genu.findOne({ where: { id } });
            if (!existinguser) {


                const transaction = await models.Genu.create({
                    code: id,
                    user_id: inv_u,
                    amount_token: cant,
                    series_name: gen_u,
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
export const getProducts = async (req, res) => {
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    const productItems = []

    try {
        const response = await axios.post("https://31.220.82.149/rest/V1/integration/admin/token", {
            username: "admin",
            password: "admin123",
        }, {
            httpsAgent: agent,
        })
        console.log(response.data)

        const response1 = await axios.get("https://31.220.82.149/rest/V1/products?searchCriteria[pageSize]=20", {
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${response.data}`
            }
        })
        console.log("23423423423",response1.data.items)


        await Promise.all(response1.data.items.map(async (item, index) => {
            
            try {
                const id = item.extension_attributes.category_links?.filter((link, index) => {
                    return link.position === 0;
                });
                console.log("11111111111111111111",id)
                const preURL = "https://31.220.82.149/media/catalog/product"
                if(id === null || id.length === 0) return; // Add a check for null or empty array
                const res55 = await models.MagentoCagetory.findOne({ where: { id: id[0].category_id } });
                console.log("here", res55?.category);

                const itemData = {
                    name: item.name,
                    description: item.custom_attributes.filter((attribute) => {
                        return attribute.attribute_code === "meta_description";
                    }),
                    price: item.price,
                    image: item.media_gallery_entries[0] ? preURL + item.media_gallery_entries[0].file : "null",
                    category: res55 ? res55.category : "blockchain",
                    subcategory: res55 ? res55.subcategory : "pro",
                };
                console.log("here", itemData);

                productItems.push(itemData);
            } catch (e) {
                console.log("22222222222222222222222222");
                return res.status(401).json({ success: false });
            }
        }));






        res.status(200).json({ items: productItems })
    } catch (e) {
        res.status(401).json({ success: false })
    }


}

export const setMagentCategory = async (req, res) => {

    try {
       
        try{
            const transaction = payment_contract.methods.setCategory(req.body.category,req.body.subcategory,req.body.id,req.body.bonuspercentage);
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

        await models.MagentoCagetory.create({
            id: req.body.id,
            category: req.body.category,
            subcategory: req.body.subcategory,
            bonuspercentage:req.body.bonuspercentage,
        })

        res.status(200).json({ success: true })

    } catch (e) {
        res.status(401).json({ success: false })
    }






}
export const setTransaction = async (req, res) => {

    try {
        
        const user = await models.User.findOne({where:{address:req.address}})
        
        console.log("23232",req.body.name)


        const maxIdResult = await models.Transaction.findOne({
            attributes: [
                [sequelize.fn('MAX', sequelize.col('id')), 'maxId']
            ]
        });
        const maxId = maxIdResult.get('maxId') || 0;
        const nextId = maxId + 1;
        console.log("7777777777777777777",nextId)
        await models.Transaction.create({
            id:nextId,
            name: req.body.name,
            fch: req.body.time,
            hra: req.body.time,
            fch_hra:req.body.time,
            inv_u:user.id,
            mov_tip:req.body.transactionType,
            tracking_number:"",
            productType:req.body.productType,
            imp:req.body.amount,


        })


        // const currentDate = new Date();

        // // Convert the date to an ISO 8601 formatted string
        // const timestamp = currentDate.toISOString();

        // if(req.body.productType ==='Blockchain'){
        //         user.last_blockahin_purchased_date = timestamp;
        //         await user.save()
        // }
        // if(req.body.productType ==='Investment'){
        //     user.last_associated_purchased_date = timestamp;
        //     await user.save()

        // }
        // if(req.body.productType ==='Products'){
        //     user.last_product_purchased_date = timestamp;
        //     await user.save()

        // }

        res.status(200).json({ success: true })


    } catch (e) {
        res.status(401).json({ success: false })
    }






}
