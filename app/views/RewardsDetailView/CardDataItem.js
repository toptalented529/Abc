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
import Chronometer from './Chronometer';

const CardDataItem = ({ name,type }) => {

  const [active, setActive] = useState(true)
  const [expanded, setExpanded] = useState(false)


  const navigation = useNavigation();
 

  const handleExpand = () => {
      setExpanded (!expanded)
  }



  return (
    <LinearGradient
      colors={['#a857ff', 'rgba(255, 255, 255, 0)']}
      style={styles.cardContainerBorder}>
      <LinearGradient
        colors={['#7470ba', '#06042e']}
        // start={{ x: 0.5, y: 0 }}
        // end={{ x: 0.5, y: 0.5}}
        style={styles.cardContainer}>
        <View style={styles.cardBox}>
          <View style={styles.cardpiccontainer}>
            <Image source={name === "Blockchain" ? images.ico_wallet : name === "Products" ? images.ico_bag1 : images.ico_invest} style={styles.cardPic} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.activeword}>EEARNINGS FROM</Text>
            <Text style={[styles.cardInfoText, { color: COLOR_WHITE }]}>
              {name}
            </Text>

          </View>
          <View style={styles.verticalLine} />

          <TouchableOpacity style={{ marginRight: 10, }} onPress={handleExpand}>
            <VectorIcon
              type="AntDesign"
              name={expanded?"caretup":"caretdown"}
              size={18}
              color="#fff"
            />
          </TouchableOpacity>


        </View>
        {
          expanded &&
          <Chronometer name = {name} type ={type} />
        }
       
      </LinearGradient>
    </LinearGradient>
  );
};

export default CardDataItem;
