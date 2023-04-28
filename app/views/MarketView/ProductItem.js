import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import images from '../../assets/images';
import styles from './styles';
import {COLOR_WHITE, COLOR_BLACK} from '../../constants/colors';
import {VectorIcon} from '../../containers/VectorIcon';
import ActivityIndicator from '../../containers/ActivityIndicator';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { payment_ABI, payment_address, token_ABI, token_address } from '../../constants/app';
import { ethers } from 'ethers';
import axios from 'axios';

const ProductItem = ({data,etheruem}) => {

  const [address, setAddress] = useState()
  const [user, setUser] = useState()
  const [loading,setLoading] = useState(false)
  const [finished,setFinished] = useState(false)
  useEffect(() => {
    const handle = async() => {
      const jwt = await AsyncStorage.getItem("jwt")
  
      const res = await axios.get("http://95.217.197.177:80/account/me", {

        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )

      setUser(res.data.user)
    }

    handle()
  }, [])

    useEffect(() => {
      if(finished){
        setTimeout(() => {
          setFinished(false)
        },10000)
      }
    },[finished])


  const handleClick = async () => {
  
      try {
        if (!etheruem.isConnected()) {
          setLoading(true)
          const result = await etheruem.request({ method: 'eth_requestAccounts' });
          setAddress(result?.[0])
          AsyncStorage.setItem("currentAddress", result?.[0])
          const provider = new ethers.providers.Web3Provider(etheruem);
          const address = '0x735951C5519704203a1e76ef5251A3D9fe3ED61f';
  
          // Get the balance for the address
          provider.getBalance(address)
            .then(balance => {
              console.log(`Balance for ${address}: ${ethers.utils.formatEther(balance)} ETH`);
            })
            .catch(error => {
              // console.error(error);
            });
   
            const weiAmount = ethers.utils.parseUnits((data.price *2).toString(), 'ether');


            const contractToken = new ethers.Contract(token_address, token_ABI, provider.getSigner());
          
            await contractToken.approve(payment_address,weiAmount)
          
            const contract = new ethers.Contract(payment_address, payment_ABI, provider.getSigner());
            console.log("6666666666666666",data.category,data.subcategory,data.price,data.price,user.id,user.address)
            await contract.purchase(data.category,data.subcategory,data.price,data.price,user.id,user.address)
            setLoading(false)
            setFinished(true)


            const jwt = await AsyncStorage.getItem("jwt")
          const date = new Date()

          var hours = date.getHours(); // Returns the hours (0-23)
          var minutes = date.getMinutes(); // Returns the minutes (0-59)
          var seconds = date.getSeconds(); // Returns the seconds (0-59)
          var milliseconds = date.getMilliseconds(); // Returns the milliseconds (0-999)

          // Format the time
          var formattedTime = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
          const res = await axios.post("http://95.217.197.177:80/transaction/settransaction", {
            name: user.nickname + data.category,
            time: formattedTime,
            amount: data.price,
            transactionType: "A",
            productType: data.category,


          }, {

            headers: {
              authorization: `bearer ${jwt}`
            }
          }
          )




          }else{
        
            setLoading(true)
        const provider = new ethers.providers.Web3Provider(etheruem);
  
          // Get the balance for the address

          const weiAmount = ethers.utils.parseUnits((data.price *2).toString(), 'ether');


          const contractToken = new ethers.Contract(token_address, token_ABI, provider.getSigner());
        
          await contractToken.approve(payment_address,weiAmount)
        
          const contract = new ethers.Contract(payment_address, payment_ABI, provider.getSigner());

          console.log("6666666666666666",data.category,data.subcategory,data.price,data.price,user.id,user.address)

          await contract.purchase(data.category,data.subcategory,data.price,data.price,user.id,user.address)
          setLoading(false)
          setFinished(true)






          const jwt = await AsyncStorage.getItem("jwt")
          const date = new Date()

          var hours = date.getHours(); // Returns the hours (0-23)
          var minutes = date.getMinutes(); // Returns the minutes (0-59)
          var seconds = date.getSeconds(); // Returns the seconds (0-59)
          var milliseconds = date.getMilliseconds(); // Returns the milliseconds (0-999)

          // Format the time
          var formattedTime = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
          const res = await axios.post("http://95.217.197.177:80/transaction/settransaction", {
            name: user.nickname ,
            time: formattedTime,
            amount: data.price,
            transactionType: "A",
            productType: data.category,


          }, {

            headers: {
              authorization: `bearer ${jwt}`
            }
          }
          )


      }
  
      } catch (e) {
        setLoading(false)

        console.log('ERROR', e);
      }
  
    
  }
  return (
    <View style={styles.productContainer}>
      <View style={{backgroundColor: COLOR_WHITE, borderRadius: 29}}>
        <View>
          <TouchableOpacity
            style={[styles.priceBtn, {backgroundColor: '#715aee'}]}>
            <VectorIcon
              type="FontAwesome"
              name="diamond"
              size={18}
              color={COLOR_WHITE}
            />
            <Text style={[styles.priceBtnText, {color: COLOR_WHITE}]}>
              {data.price}$
            </Text>
          </TouchableOpacity>
          <View style={{height: 190, borderRadius: 29}}>
            <View style={styles.productItemBox}>
              {
                data.image !== 'null'?
                <Image source={{uri:"https://31.220.82.149/media/catalog/product//m/s/msg5369252484-18164.jpg"}} style={styles.productItem} resizeMode="cover" />
                :<Image source={images.test_product} style={styles.productItem} />
              }
            </View>
          </View>
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={[styles.titleText, {color: '#1d1838'}]}>
            Title - {data.title}
          </Text>
          <Text style={[styles.descriptionText, {color: COLOR_BLACK}]}>
            {data.description}
          </Text>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress = {handleClick}> 
            <LinearGradient
              colors={['#614bbe', '#0bc1c7']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.productItemBtn}>
              <Text style={[styles.productItemBtnText, {color: COLOR_WHITE}]}>
               {loading? <ActivityIndicator  absolute theme={"light"} size={'large'}/>:<Text> COMPRAR</Text> } 
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {finished && <View style = {{alignSelf:"center"}}>
          <Text style = {styles.finshedText}>You have bought {data.title}</Text>
          </View> }
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
