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
import { COLOR_WHITE, COLOR_BLACK } from '../../constants/colors';
import styles from './styles';
import { VectorIcon } from '../../containers/VectorIcon';

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RewardHeader = ({ name }) => {

  const [active, setActive] = useState(true)

  const {width, height} = Dimensions.get('screen')
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
    <View>
      <View
        style={[styles.cardContainerBorder, { opacity: 0.1, backgroundColor: "#fff",height: height * 0.15,marginTop:height * 0.01 }]}>

      </View>
      <View
        style={[styles.cardContainer, { position: "absolute",left:- width * 0.04, borderWidth: 1, borderColor: "#808080",width:width * 0.88,borderRadius:20,marginHorizontal:width * 0.1, marginVertical: height * 0.01,
      }]}>
        <View style={[styles.cardBox]}>
          <View style={styles.cardpiccontainer}>
            <Image source={name === "Blockchain" ? images.ico_wallet : name === "Products" ? images.ico_bag1 : images.ico_invest} style={styles.cardPic} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.activeword}>EEARNINGS FROM</Text>
            <Text style={[styles.cardInfoText, { color: COLOR_WHITE }]}>
              {name}
            </Text>

          </View>
         </View>
      </View>

    </View>
  );
};

export default RewardHeader;
