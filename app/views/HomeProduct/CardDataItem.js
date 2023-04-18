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

const CardDataItem = ({ name,active }) => {

  const [image, setImage] = useState()


  const navigation = useNavigation();



    const handleCLick = () => {
      navigation.navigate("HomeProduct",{type:name})
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
            {/* <TouchableOpacity
              style={[
                styles.cardInfoBtn,
                { color: COLOR_WHITE, borderColor: COLOR_WHITE },
              ]}>
                <TouchableOpacity style={[styles.cardInfoBtnText, { color: COLOR_WHITE }]} onPress ={handleCLick}>

              <Text style={[styles.cardInfoBtnText, { color: COLOR_WHITE }]}>
                button
              </Text>
                </TouchableOpacity>
            </TouchableOpacity> */}
          </View>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default CardDataItem;
