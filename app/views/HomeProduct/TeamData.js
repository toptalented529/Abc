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


const { width, height } = Dimensions.get("screen")
const TeamData = ({ name }) => {

  const [teamMembers, setTeamMembers] = useState(4)
  const [activedUser, setActivedUser] = useState(4)
  const [image, setImage] = useState()


  const navigation = useNavigation();


  const handleCLick = () => {
    navigation.navigate("HomeProduct", { type: name })
  }



  return (
    <LinearGradient
      colors={[' rgba(116, 112, 186,0.4)', '#06042e']}
      style={styles.cardContainerBorder}>
      <LinearGradient
        colors={[' rgba(116, 112, 186,0.4)', '#06042e']}
        // start={{ x: 0.5, y: 0 }}
        // end={{ x: 0.5, y: 0.5}}
        style={[styles.cardContainer, { flexDirection: "column", alignItems: "center" }]}>

        <View style={{ flexDirection: "row", padding: width * 0.1 }}>
          <Image source={images.profile_image6} style={{ width: width * 0.2, height: width * 0.2 }}></Image>
          <View style={{ paddingHorizontal: width * 0.05 }}>
            <Text style={{ color: "#fff", fontSize: 12, }}>MyTEAM</Text>
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>SuperTeam</Text>
            <Text style={{ color: "#fff" }}>{`${teamMembers} Users`}</Text>
          </View>
        </View>
        <View style={styles.whiteline}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ width: width * 0.2 }}>
              <Text style={[styles.activeword, { backgroundColor: "rgba(65, 232, 141, 0.69)" }]}>Active</Text>
            </View>
            <Text style={{ color: "#fff" }}>{`${activedUser} Users in my team`}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image source={images.profile_image6} style={{width:width * 0.1,height:width * 0.1,resizeMode:"contain", marginRight: -width * 0.03 }}></Image>
            <Image source={images.profile_image7} style={{width:width * 0.1,height:width * 0.1,resizeMode:"contain", marginRight: -width * 0.03 }}></Image>
            <Image source={images.profile_image8} style={{width:width * 0.1,height:width * 0.1,resizeMode:"contain", marginRight: -width * 0.03 }}></Image>
            <Image source={images.profile_image9} style = {{width:width * 0.1,height:width * 0.1,resizeMode:"contain",}}></Image>
          </View>
        </View>
        <View style={styles.whiteline}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ width: width * 0.23 }}>
              <Text style={[styles.activeword, { backgroundColor: "rgba(255, 86, 86, 0.71)" }]}>InActive</Text>
            </View>
            <Text style={{ color: "#fff" }}>{`${activedUser} Users in my team`}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom:height * 0.05 }}>
            <Image source={images.profile_image6} style={{width:width * 0.1,height:width * 0.1,resizeMode:"contain", marginRight: -width * 0.03 }}></Image>
            <Image source={images.profile_image7} style={{width:width * 0.1,height:width * 0.1,resizeMode:"contain", marginRight: -width * 0.03 }}></Image>
            <Image source={images.profile_image8} style={{width:width * 0.1,height:width * 0.1,resizeMode:"contain", marginRight: -width * 0.03 }}></Image>
            <Image source={images.profile_image9} style = {{width:width * 0.1,height:width * 0.1,resizeMode:"contain",}}></Image>
          </View>
        </View>








      </LinearGradient>
    </LinearGradient>
  );
};

export default TeamData;
