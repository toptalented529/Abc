import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import styles from './styles';
import {COLOR_WHITE, COLOR_ULTRAMARINE} from '../../constants/colors';
import { Ranges } from '../../constants/app';

const BalanceDetail = ({data}) => {
  console.log(data.myRangeAmount[0],"ehehe")
  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={Ranges[data.user.range-1].image} style={styles.avatarIcon} />
        <Text style={[styles.balanceText, {color: COLOR_WHITE}]}>
          <Text style={{fontWeight: '800'}}>{Ranges[data.user.range-1].name}</Text> Balanace
        </Text>
      </View>

      <View style={{borderRadius: 13, alignItems: 'center'}}>
        <LinearGradient
          colors={['#ffffff', '#bebbe5']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={[styles.balancePriceBox, {borderRadius: 13}]}>
          <Text style={[styles.balancePriceText, {color: '#141436'}]}>
            ${data.myRangeAmount[0] !=0?data.myRangeAmount[0]:"000.000"}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default BalanceDetail;
