import bcrypt from 'bcryptjs'
import models from '../models'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Signature } from 'ethers'
import axios from 'axios'
const https = require('https');
const uuid = require('uuid');

import joi from "joi"
import 'dotenv/config';
const bip39 = require('bip39')
const Wallet = require('ethereumjs-wallet')
const ethers = require('ethers');
const { bufferToHex } = require('ethereumjs-util');
const { recoverPersonalSignature } = require('eth-sig-util')


export const register = async (req, res, next) => {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const response = await axios.get("https://oficina.universo-blockchain.io/universo/Univer_dat_dat/v1/mov_u?api_key=U8qifyta", { httpsAgent: agent })
    const { mov_u } = response.data
    mov_u?.map(async (mov, index) => {

        const { id, name, fch, hra, fch_hra, inv_u, mov_tip, imp, tkns, hayeks, cve, hash, cant } = mov
        try {
            const existinguser = await models.Transaction.findOne({ where: { id } });
            if (!existinguser) {


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
                    cant
                })
                console.log(transaction.id)
                // res.status(200).json({ id:transaction.id })
            }

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    res.status(200).json({succss:"success"})



}



export const me = async (req, res) => {
    const existinguser = await models.User.findOne({ where: { address: req.address } });

    const user = req.currentUser;
    res.status(200).json({ user: existinguser })
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

        const { hay_u,id,cant,inv_u } = mov
        try {
            const existinguser = await models.Hayek.findOne({ where: { id } });
            if (!existinguser) {

                console.log(hay_u,id,cant,inv_u)
                const transaction = await models.Hayek.create({
                    code:id,
                    user_id:inv_u,
                    amount_token:cant,
                    series_name:hay_u,
                })
                console.log(transaction.id)
                // res.status(200).json({ id:transaction.id })
            }

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    res.status(200).json({succss:"success"})



}


export const register_genu = async (req, res, next) => {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const response = await axios.get("https://oficina.universo-blockchain.io/universo/Univer_dat_dat/v1/mov_gen_u?api_key=genu", { httpsAgent: agent })
    const { mov_gen_u } = response.data
    mov_gen_u?.map(async (mov, index) => {

        const { gen_u,id,cant,inv_u } = mov
        try {
            const existinguser = await models.Genu.findOne({ where: { id } });
            if (!existinguser) {


                const transaction = await models.Genu.create({
                    code:id,
                    user_id:inv_u,
                    amount_token:cant,
                    series_name:gen_u,
                })
                console.log(transaction.id)
                // res.status(200).json({ id:transaction.id })
            }

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    res.status(200).json({succss:"success"})



}
