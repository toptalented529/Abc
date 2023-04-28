import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_ULTRAMARINE } from '../../constants/colors';
import styles from './styles';

import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get("screen")
const BalanceDetail = ({ }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={[styles.rankText, { color: COLOR_WHITE ,marginVertical: height * 0.025 }]}>
          MY data
        </Text>
        <Image source={images.profile_image8} style={styles.avatarIcon} />
        
      </View>

      
    </View>
  );
};

export default BalanceDetail;
