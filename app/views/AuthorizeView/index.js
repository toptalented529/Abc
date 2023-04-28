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
import sharedStyles from '../Styles';
import StatusBar from '../../containers/StatusBar';
import ActivityIndicator from '../../containers/ActivityIndicator';
import MainHeader from '../../containers/MainHeader';
import * as HeaderButton from '../../containers/HeaderButton';
import MainScreen from '../../containers/MainScreen';

import I18n from '../../i18n';
import styles from './styles';
import { withActionSheet } from '../../containers/ActionSheet';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { withTheme } from '../../theme';
import { COLOR_WHITE } from '../../constants/colors';

import BalanceDetail from './BalanceDetail';
import BuyButton from './BuyButton';
import RecentActivity from './RecentActivity';
import CardDataItem from './CardDataItem';

import images from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import i18n from '../../i18n';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RESULTS } from 'react-native-permissions';
const { width } = Dimensions.get('screen');

const AuthorizeView = props => {
  const { width, height } = Dimensions.get("screen")
  const navigation = useNavigation();
  const [state, setState] = useState({
    refreshing: false,
    loading: false,
    isUpdating: false,
  });
  const { loading, isUpdating, refreshing } = state;
  const tabBarHeight = useBottomTabBarHeight();

  const [approved, setApproved] = useState(false)
  const [request, setRequest] = useState()
  const [timer, setTimer] = useState(0)
  const [isRequest, setIsRequest] = useState(false)

  useEffect(() => {

    const handleEffect = async () => {

      const jwt = await AsyncStorage.getItem("jwt")
      setTimeout(async () => {

        try {

          console.log("started")
          const res = await axios.get("http://95.217.197.177:80/account/marketplaceRequestcheck", {

            headers: {
              authorization: `bearer ${jwt}`
            }
          }
          )
          if (res.data.success && res.data.request !==request) {
            setRequest(res.data.request)
          }
          setTimer(timer + 1)

        } catch (e) {



          setTimer(timer + 1)
        }



      }, 5000)
    }



    handleEffect()
  }, [timer])

  const handleContinue = async () => {

    try {

      const jwt = await AsyncStorage.getItem("jwt")

      const res = await axios.post("http://95.217.197.177:80/account/marketplaceRequestApprove", {

        email:request.email,
        nickname:request.nickname
      },
        {

          headers: {
            authorization: `bearer ${jwt}`
          }
        }
      )
      if(res.data.success){
        setApproved(true)
      }

      setTimeout(() => {
        navigation.navigate("Home")
      },5000)
    } catch (e) {

    }

  }
  const handlematamaskinstall = async() => {

    const jwt = await AsyncStorage.getItem("jwt")

    const res = await axios.post("http://95.217.197.177:80/account/marketplaceRequestReject", {

      email:request.email,
      nickname:request.nickname
    },
      {

        headers: {
          authorization: `bearer ${jwt}`
        }
      }
    )
    navigation.navigate("Home")

  }



  return (

    <MainScreen
      navigation={navigation}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-start"
      }}
    >
      <ImageBackground
        source={images.background}
        style={styles.backgroundImage}
      >

        <StatusBar />
        <MainHeader />
        {isUpdating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}

        <View style={[sharedStyles.headerContainer, { marginTop: -height * 0.04 }]}>
          <Image style={styles.logo} source={images.logo} />
          <Text style={styles.logoText}>{i18n.t('OFFICE')}</Text>
          <Text style={styles.appText}>{i18n.t('universo')}</Text>
        </View>

        <View style={styles.metamaskBox}>
          {
          approved? <Text style={[styles.UniversoText, { color: "#FFFF00" }]}>Sign up approved</Text>: request ? <>

          <Text style={[styles.UniversoText, { color: "#FFFF00" }]}>Request from</Text>
          <Text style={[styles.UniversoText, { color: "#FFFF00" }]}> {request.email}</Text>
          <Text style={[styles.UniversoText, { color: "#FFFF00" }]}>{i18n.t('You_can_accept_request_here')}</Text></> :
          <>
            <Text style={styles.metamaskText}>{i18n.t('MarketPlace_request')}</Text>
            <Text style={styles.UniversoText}> {i18n.t('will_be_here')}</Text>
            <Text style={styles.UniversoText}>{i18n.t('You_can_accept_request_here')}</Text>
          </>
          
          
        }

      
        </View>


        <View style={{ flexDirection: 'column', marginBottom: height * 0.02 }}>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,

            }}>
            <TouchableOpacity style={styles.registerButton} onPress={handleContinue}>
              <View style={{ flex: 1, height: 64, justifyContent: 'center' }}>
                <Text style={styles.registerText}>{i18n.t('Accept')}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <View
            style={{
              height: 20,
              backgroundColor: "transparent"
            }}
          >

          </View>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,
            }}>
            <TouchableOpacity style={styles.registerButton} onPress={handlematamaskinstall}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.registerText}>{i18n.t('Reject')}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

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
)(withActionSheet(withTheme(AuthorizeView)));
