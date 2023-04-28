import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import styles from './styles';
import {COLOR_WHITE, COLOR_ULTRAMARINE} from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ranges } from '../../constants/app';

const BalanceDetail = ({name}) => {

const [user, setUser] = useState(0)
const [embassador, setEmbassador] = useState(false)

useEffect(() => {
  const handle = async () => {
    const jwt = await AsyncStorage.getItem("jwt")
   

      const res = await axios.get("http://95.217.197.177:80/account/me", {

        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )
      setUser(res.data.user)


      if(name ==="Embassador"){

        setEmbassador(true)
      }else{
        setEmbassador(false)

      }
    }

    handle()
},[name])
  
      
  return (
    <View>
      <View style={styles.headerContainer}>
        {
        embassador?
        <Image source={images.icon_founder} style={styles.embaIcon} />
        :<Image source={user? Ranges[user.range -1].image:images.ico_atomo} style={styles.avatarIcon} />
        }
        {
          embassador? <Text  style={[styles.balanceText, {color: COLOR_WHITE}]}>Fundador</Text>
        :<Text style={[styles.balanceText, {color: COLOR_WHITE}]}>
              
          <Text style={{fontWeight: '800'}}>{user ? Ranges[user.range -1].name: "Atomo"}</Text> Balanace
        </Text>
        }
      </View>

    
    </View>
  );
};

export default BalanceDetail;
