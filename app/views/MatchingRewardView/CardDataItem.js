import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_BLACK } from '../../constants/colors';
import styles from './styles';
import { VectorIcon } from '../../containers/VectorIcon';

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardDataItem = ({ name }) => {

  const [active, setActive] = useState(true)
  const [image, setImage] = useState()


  const navigation = useNavigation();
  
  const [remainingTime, setRemainingTime] = useState(0)
  useEffect(() => {
    const handle = async () => {
      const jwt = await AsyncStorage.getItem("jwt")
      const res = await axios.get("http://95.217.197.177:80/account/me", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )

      const blockchain_purchased = new Date(name === "Blockchain" ? res.data.user.last_blockchain_purchased_date : name === "Products" ? res.data.user.last_product_purchased_date : res.data.user.last_associated_purchased_date)
      const timestamp = blockchain_purchased.getTime()



      const currentUTC = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),
        new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());

        const daysToMilliseconds = 30 * 24 * 60 * 60 * 1000;
        
        setRemainingTime(daysToMilliseconds - (currentUTC - timestamp))
        
        if(daysToMilliseconds - (currentUTC - timestamp) < 0){
          setActive(false)
        }
        console.log("Current UTC Timestamp: ", currentUTC,daysToMilliseconds - (currentUTC - timestamp));

    }

    handle()

  }, [])


    const handleCLick = () => {
      console.log("234234234234")
      navigation.navigate("MatchingRewardDetailView",{type:name,active:active})
    }



  return (
    <LinearGradient
      colors={[' rgba(116, 112, 186,0.4)', '#06042e']}
      style={styles.cardContainerBorder}>
      <LinearGradient
        colors={[' rgba(116, 112, 186,0.4)', '#06042e']}
        // start={{ x: 0.5, y: 0 }}
        // end={{ x: 0.5, y: 0.5}}
        style={styles.cardContainer}>
        <View style={styles.cardBox}>
          <View style={styles.cardpiccontainer}>
            <View style={styles.cardpicbox}></View>
            <Image source={name === "Blockchain"? images.ico_wallet:name ==="Products"? images.ico_bag1:images.ico_invest} style={styles.cardPic} />
          </View>
          <View style={styles.cardInfo}>
            <Text style ={[styles.activeword,{backgroundColor:active? "rgba(65, 232, 141, 0.69)":"rgba(255, 86, 86, 0.71)"}]}>{active?"Active":"Inactive"}</Text>
            <Text style={[styles.cardInfoText, { color: COLOR_WHITE }]}>
              {name}
            </Text>
            <TouchableOpacity
              style={[
                styles.cardInfoBtn,
                { color: COLOR_WHITE, borderColor: COLOR_WHITE },
              ]}>
                <TouchableOpacity style={[styles.cardInfoBtnText, { color: COLOR_WHITE }]} onPress ={handleCLick}>

              <Text style={[styles.cardInfoBtnText, { color: COLOR_WHITE }]}>
                See More
              </Text>
                </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default CardDataItem;
