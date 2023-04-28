import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import {COLOR_WHITE, COLOR_ULTRAMARINE} from '../../constants/colors';
import styles from './styles';

import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

const BalanceDetail = ({}) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={images.ico_atomo} style={styles.avatarIcon} />
        <Text style={[styles.rankText, {color: COLOR_WHITE}]}>
          MY CURRENT RANK
        </Text>
        <Text style={[styles.balanceText, {color: COLOR_WHITE}]}>
          <Text style={{fontWeight: '800'}}>Atomo</Text> Balance
        </Text>
      </View>

     
    </View>
  );
};

export default BalanceDetail;
