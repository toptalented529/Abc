import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Image,
  RefreshControl,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import StatusBar from '../../containers/StatusBar';
import ActivityIndicator from '../../containers/ActivityIndicator';
import MainScreen from '../../containers/MainScreen';

import I18n from '../../i18n';
import styles from './styles';
import { withActionSheet } from '../../containers/ActionSheet';
import { withTheme } from '../../theme';
import { COLOR_WHITE } from '../../constants/colors';


import images from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from '../../i18n';
import MainHeader from '../../containers/MainHeader';
import { Share } from 'react-native';

const { width } = Dimensions.get('screen');

const ReferralView = props => {
  const { width, height } = Dimensions.get("screen")
  const navigation = useNavigation();

  const tabBarHeight = useBottomTabBarHeight();

  const [users, setUsers] = useState()

  useEffect(() => {

    const handleEffect = async () => {

      const jwt = await AsyncStorage.getItem("jwt")

      const res = await axios.get("http://95.217.197.177:80/account/me", {

        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )

      console.log(res.data.user)
      setUsers(res.data.user)

    }



    handleEffect()
  }, [])

  const onSubmit = async () => {
    try {
      await Share.share({
        message: `This is the referral User name ${users.nickname}`,
      });
      console.log('Shared successfully via SMS');
    } catch (error) {
      console.error('Failed to share via SMS:', error);
    }
  }


  return (

    <MainScreen
      navigation={navigation}
      style={{ backgroundColor: 'transparent', paddingBottom: tabBarHeight, width: width }}
    >
      <ImageBackground
        source={images.home_background}
        style={styles.backgroundImage}
      >
        <StatusBar />
        <View style={{ width: width, marginBottom: height * 0.02 }}>
          <MainHeader />
        </View>
        <LinearGradient
          colors={['#a755ff', '#6da0ee']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.67, 1]}
          style={styles.box}
        >
          <Image source={images.onboarding_people} style={styles.refImage} />
          <Text style={{ color: "#fff", fontSize: 20, padding: 10, }}>REFERRAL LINK!</Text>
          <Text style={{ color: "#fff", marginBottom: height * 0.05, textAlign: "center", paddingHorizontal: width * 0.1, fontWeight: "bold" }}>Share this link <Text style={{ fontWeight: "100" }}>with whoever you want to </Text> increate your community!</Text>

        </LinearGradient>



        <LinearGradient
          colors={['#6c40bd', '#1b97c0', '#01dfcc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.67, 1]}
          style={{
            marginHorizontal: 20,
            borderRadius: 43,
            marginTop: height * 0.07,
          }}>
          <TouchableOpacity style={[styles.registerButton, { borderBottom: 20 }]} onPress={onSubmit}>
            <View style={{ flex: 1, justifyContent: 'center' }}>

              <Text style={styles.registerText}>{<>{i18n.t('Save')}</>}</Text>


            </View>
          </TouchableOpacity>
        </LinearGradient>



      </ImageBackground>
    </MainScreen>

  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withActionSheet(withTheme(ReferralView)));
