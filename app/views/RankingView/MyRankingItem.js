import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import images from '../../assets/images';
import styles from './styles';
import { COLOR_WHITE, COLOR_BLACK } from '../../constants/colors';
import { VectorIcon } from '../../containers/VectorIcon';
import I18N from '../../i18n';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ActivityIndicator from '../../containers/ActivityIndicator';

import { Ranges } from '../../constants/app';
const { width, height } = Dimensions.get("screen")



const MyRanking = ({ data }) => {

  const [user, setUser] = useState()
  const [sponser, setSponser] = useState()
  const [rangeAmount, setRangeAmount] = useState()
  const [range, setRange] = useState(0)
  const [percent, setPercent] = useState(0.8)
  useEffect(() => {
    const handle = async () => {
      try {

        const jwt = await AsyncStorage.getItem("jwt")
        if (data == 0) {

          const res = await axios.get("http://95.217.197.177:80/account/me", {

            headers: {
              authorization: `bearer ${jwt}`
            }
          }
          )

          const sponser = await axios.get("http://95.217.197.177:80/account/getUser", {
            params: {
              userID: res.data.user.parent_id,
            },
          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )
        setSponser(sponser.data.user)
          setUser(res.data.user)
          setRangeAmount(res.data.myRangeAmount)
          for(let i = 0;i < Ranges.length;i ++){
              if(res.data.myRangeAmount[2] < Ranges[i].rangeLevel){
                setRange(res.data.myRangeAmount[2] /Ranges[i].rangeLevel)
                break;
              }
          }

        } else {
          const res = await axios.get("http://95.217.197.177:80/account/getUser", {
            params: {
              userID: data,
            },
            headers: {
              authorization: `bearer ${jwt}`
            }
          }
          )

          const sponser = await axios.get("http://95.217.197.177:80/account/getUser", {
            params: {
              userID: res.data.user.parent_id,
            },
          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )
        setSponser(sponser.data.user)

          setUser(res.data.user)
          setRangeAmount(res.data.myRangeAmount)
          for(let i = 0;i < Ranges.length;i ++){
              if(res.data.myRangeAmount[2] < Ranges[i].rangeLevel){
                setRange(res.data.myRangeAmount[2] /Ranges[i].rangeLevel)
                break;
              }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    handle()
  }, [])




  return (
    <View style={styles.priceContainer}>
      <LinearGradient
        colors={['#ffffff', 'rgba(255, 252, 252, 0.88)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.RankingBox}>
        {
          user && user.range === 18 &&
          <View style = {{justifyContent:"center", alignItems:"center"}}>
            <View style={styles.cupImages}>

              <Image source={images.cup_image} style={styles.cupImage} />
            </View>
            <View style = {{justifyContent:"center",alignItems:"center",marginBottom:12,}}>
              <Text  style = {{fontWeight:"bold",fontSize:24}}>{I18N.t('You_did')}</Text>
              <Text  style = {{fontWeight:"normal",fontSize:16}}>{I18N.t('You_completed_all_the_ranks')}</Text>
            </View>
          </View>
        }
        <View style={{ flexDirection: "row",paddingHorizontal:5, }}>
          <View style={{ flexDirection: "column", marginRight: width * 0.05, }}>
            <Badge value={user && user.range} badgeStyle={styles.badge} />
           
           {
            user?<View>
              <Image source={Ranges[user.range-1].image} style={styles.rangeImage}></Image>
            </View>:<View>
              <ActivityIndicator  absolute theme={"light"} size={'large'}/>
            </View>
           }
          </View>
          <View style={{ flexDirection: "column", marginRight: width * 0.05, }}>
            <Text style ={{color:"#982ec3"}}>@{sponser && sponser.nickname}</Text>
            <Text>MI RANGO ACTUAL</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user && Ranges[user.range -1].name }<Text style={{ fontWeight: "normal" }}> {I18N.t('Balance')}</Text></Text>
            <Text style={{ color: "#982ec3", fontWeight: "bold" }}>{rangeAmount ? rangeAmount[2]:"$000"}</Text>
          </View>
        </View>

      </LinearGradient>


      <View style={{ alignSelf: "center" }}>
        <Text style={{ color: "#fff", marginVertical: height * 0.02 }}>{I18N.t('Next_Promotion')}</Text>
        <View style={styles.rangeline}>
          <View style={[styles.rangePercentage, { width: percent * range * width, backgroundColor: percent > 0.75 ? "rgba(89, 255, 116, 0.69)" : "#e84141" }]}></View>
        </View>
      </View>
    </View>
  );
};

export default MyRanking;
