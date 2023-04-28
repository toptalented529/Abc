import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import I18n from '../../i18n';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_BLACK, COLOR_ULTRAMARINE } from '../../constants/colors';
import styles from './styles';
import { VectorIcon } from '../../containers/VectorIcon';

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RewardHeader = ({ name }) => {

  const [active, setActive] = useState(true)

  const { width, height } = Dimensions.get('screen')
  const navigation = useNavigation();
  useEffect(() => {

    const handleValue = async () => {

      const jwt = await AsyncStorage.getItem("jwt")

      const response = axios.get("http://95.217.197.177:80/account/", {
        headers: {
          authorization: `Bearer ${jwt}`
        }
      })

      const active = (await response).data.active;
      setActive(active)

      switch (name) {
        case "Blockchain":
          break;

        case "Products":

          break;
        case "asocciated Product":
          break;
        default:
          break;
      }


    }
  })


  const handleCLick = () => {
    navigation.navigate("HomeProduct", { type: name })
  }

  const handleExpand = () => {

  }



  return (
    <View style={{ alignItems: "center" }}>
      {/* <View
        style={[styles.cardContainerBorder, { opacity: 0.1, backgroundColor: "#fff", height: height * 0.15, marginTop: height * 0.01 }]}>

      </View> */}
      <View
        style={[styles.cardContainer, {
          borderWidth: 1, borderColor: "#808080", backgroundColor: "#fff", opacity: 0.1, width: width * 0.88, borderRadius: 20, marginHorizontal: width * 0.1, marginVertical: height * 0.01,
        }]}>
        <View style={[styles.cardBox]}>
          <View style={styles.cardpiccontainer}>
            <Image source={name === "Blockchain" ? images.ico_wallet : name === "Products" ? images.ico_bag1 : images.ico_invest} style={styles.cardPic} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.activeword}>MY REWARDS</Text>
            <Text style={[styles.cardInfoText, { color: COLOR_WHITE }]}>
              {name}
            </Text>
            <View style={{ width: width * 0.45, backgroundColor: "#fff", height: 1, marginVertical: 4, }} />
            <Text style={{ color: "#fff", width: width * 0.5, fontWeight: "100", fontFamily: "Poppins", fontSize: 12, }}>{name} rewards are lorem ipsum dolor sit amet, conse ctetuer</Text>
          </View>
        </View>
      </View>
      <View
        style={[styles.cardContainer, {
          position: "absolute", borderWidth: 1, borderColor: "#808080", width: width * 0.88, borderRadius: 20, marginHorizontal: width * 0.1, marginVertical: height * 0.01,
        }]}>
        <View style={[styles.cardBox]}>
          <View style={styles.cardpiccontainer}>
            <Image source={name === "Blockchain" ? images.ico_wallet : name === "Products" ? images.ico_bag1 : images.ico_invest} style={styles.cardPic} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.activeword}>MY REWARDS</Text>
            <Text style={[styles.cardInfoText, { color: COLOR_WHITE }]}>
              {name}
            </Text>
            <View style={{ width: width * 0.45, backgroundColor: "#fff", height: 1, marginVertical: 4, }} />
            <Text style={{ color: "#fff", width: width * 0.5, fontWeight: "100", fontFamily: "Poppins", fontSize: 12, }}>{name} rewards are lorem ipsum dolor sit amet, conse ctetuer</Text>
          </View>
        </View>
      </View>


      {
        name === "Embassador" ?
          <View style={{ padding: 20, width: width * 1 }}>
            <LinearGradient
              colors={['#ffffff', 'rgba(255, 255, 255, 0)']}
              style={{ borderRadius: 29, paddingHorizontal: 1, paddingVertical: 1 }}>
              <View style={{ backgroundColor: COLOR_ULTRAMARINE, borderRadius: 29 }}>
                <LinearGradient
                  colors={['rgba(246, 246, 246, 0.46)', '#fafafa88']}
                  style={styles.followWrap}>
                  {/* <RadialGradient
                  style={{flex: 1}}
                  colors={['#F00', '#0F0']}
                  stops={[0.1, 0.9]}
                  center={[150, 150]}
                  radius={200}> */}
                  <View
                    style={[
                      styles.optionContainer,
                      {
                        borderRightWidth: 1,
                        borderRightColor: COLOR_WHITE,
                      },
                    ]}>
                    <Text style={[styles.optionTitle, { color: COLOR_WHITE }]}>
                      ACCUMULATED SO FAR
                    </Text>
                    <Text style={[styles.optionValue, { color: COLOR_WHITE }]}>
                      $000
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.optionContainer,
                      {
                        // borderRightWidth: 1,
                        // borderRightColor: COLOR_WHITE
                      },
                    ]}>
                    <Text style={[styles.optionTitle, { color: COLOR_WHITE, textAlign: "center" }]}>
                      ACCUMULATED FOR THIS MONTH
                    </Text>
                    <Text style={[styles.optionValue, { color: COLOR_WHITE }]}>
                      $000
                    </Text>
                  </View>
                  {/* </RadialGradient> */}
                </LinearGradient>
              </View>
            </LinearGradient>
          </View> : <></>
      }


    </View>
  );
};

export default RewardHeader;
