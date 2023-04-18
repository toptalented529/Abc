import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_ULTRAMARINE } from '../../constants/colors';
import styles from './styles';

import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BalanceDetail = ({ }) => {


  const [sponser, setSonser] = useState()
  useEffect(() => {
    const handle = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt")
        const res = await axios.get("http://95.217.197.177:80/account/sponser", {
          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )
        setSonser(res.data.user)
      } catch (e) {
        console.log(e)
      }
    }
    handle()
  }, [])



  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={images.profile_image7} style={styles.avatarIcon} />
        <Text style={[styles.rankText, { color: COLOR_WHITE }]}>
          MY SPONSER
        </Text>
        <Text style={[styles.balanceText, { color: COLOR_WHITE }]}>
          <Text style={{ fontWeight: '800' }}>@</Text>{sponser && sponser.nickname}
        </Text>
      </View>

   
    </View>
  );
};

export default BalanceDetail;
