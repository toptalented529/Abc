import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import images from '../../assets/images';
import styles from './styles';
import { COLOR_WHITE, COLOR_BLACK } from '../../constants/colors';
import { VectorIcon } from '../../containers/VectorIcon';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ranges } from '../../constants/app';

const { width, height } = Dimensions.get("screen")
const PriceItem = ({ data }) => {
  const [user, setUser] = useState()
  const [percent, setPercent] = useState(0.8)
  useEffect(() => {
    const handle = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt")
        const res = await axios.get("http://95.217.197.177:80/account/getUser", {
          params: {
            userID:data.userID
          },
          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )
        setUser(res.data.user)

        for(let i = 0; i < Ranges.length; i ++ ){
          if(data.rangeAmount < Ranges[i].rangeLevel){
            setPercent(data.rangeAmount/ Ranges[i].rangeLevel)
          }
        } 






      } catch (e) {
        console.log(e)
      }
    }
    handle()
  }, [])



  const navigation = useNavigation()


  const handlepress = () => {
    navigation.navigate("RankingView",{userID:data.userID})
  }

  return (
    <View style={{ flexDirection: "row", paddingHorizontal: width * 0.05, justifyContent: "center", alignItems: "center" }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <VectorIcon
          type="AntDesign"
          name={data.rankRised?"caretup" :"caretdown"}
          size={18}
          color={data.rankRised?"#59ff74" : "#ff5959"}
        />
        <Text style={{ color: "#fff" }}>{data.id}</Text>
      </View>
      <View style={[styles.priceContainer,{paddingHorizontal:5}]}>
        <LinearGradient
          colors={['rgba(246, 246, 246, 0.2)', '#141436']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.priceBox}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Image source={Ranges[data.range-1].image} style={styles.teamImage} />
            <View>
              <View>
                <View style={{ flexDirection: "row", marginBottom: height * 0.01, justifyContent: "space-between" }}>

                  <Text style={{ color: "#fff" }}>{user&&user.nickname}</Text>
                  <Text style={{ color: "#fff" }}>{data.purchased_amount}</Text>
                </View>
                <View style={styles.rangeTeamline}>
                  <View style={[styles.rangeTeamPercentage, { width: percent * 0.4 * width, backgroundColor: percent > 0.75 ? "rgba(89, 255, 116, 0.69)" : "#e84141" }]}></View>
                </View>
              </View>
            </View>
            <View style={styles.verticalLine}></View>
          <TouchableOpacity  onPress={handlepress}>

          <VectorIcon
            type="AntDesign"
            name="caretright"
            size={18}
            color="#59ff74"
            />
            </TouchableOpacity>
          </View>



        </LinearGradient>
      </View>

    </View>
  );
};

export default PriceItem;
