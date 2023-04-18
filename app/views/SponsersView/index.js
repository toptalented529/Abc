import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLOR_BLACK, themes } from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import { withTheme } from '../../theme';
import styles from './styles';
import { setUser as setUserAction } from '../../actions/login';
import images from '../../assets/images';
import ActivityIndicator from '../../containers/ActivityIndicator';
import MainScreen from '../../containers/MainScreen';
import firebaseSdk, {
  NOTIFICATION_TYPE_COMMENT,
  NOTIFICATION_TYPE_FOLLOW,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk';
import { VectorIcon } from '../../containers/VectorIcon';
import I18n from '../../i18n';
import { dateStringFromNowShort } from '../../utils/datetime';
import { navigateToProfile } from '../../utils/const';
import { TabView, SceneMap } from 'react-native-tab-view';

const { width } = Dimensions.get('screen');

import { useNavigation } from '@react-navigation/native';

import MainHeader from '../../containers/MainHeader';

import BalanceDetail from './BalanceDetail';
import NavButton from './NavButton';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge } from 'react-native-elements/dist/badge/Badge';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ranges } from '../../constants/app';





const SponsersView = props => {
  const tabBarHeight = useBottomTabBarHeight();

  const [sponser, setSonser] = useState()
  useEffect(() => {
    const handle = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt")
        const res = await axios.get("http://95.217.197.177:80/account/sponser", {
          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )
        console.log("66666666666", res.data.user)
        setSonser(res.data.user)
      } catch (e) {
        console.log(e)
      }
    }
    handle()
  },[])



  const navigation = useNavigation();
  const [state, setState] = useState({
    refreshing: false,
    loading: false,
    isUpdating: false,
  });
  const { loading, isUpdating, refreshing } = state;

  return (
    <MainScreen navigation={navigation} style={{ backgroundColor: '#141436'}}>
      <ImageBackground
        source={images.home_background}
        style={[styles.backgroundImage,{paddingBottom: tabBarHeight+ 60 }]}
      >
        <MainHeader />

        {isUpdating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        <ScrollView style={{ flexGrow: 0 }}>
        <BalanceDetail />


          <View style={styles.btnContainer}>
            <View>
              <View style={styles.badge}>
                <Badge value={sponser&& sponser.range} badgeStyle={{ backgroundColor: "#000" }} />
              </View>
              <Image source={sponser && Ranges[sponser.range-1].image} style={styles.rangeImage}></Image>
            </View>
            <View >
             <Text style = {styles.rankText}>Range Actual</Text> 
             <Text style = {styles.rankTextMain}>Centuro Balance</Text> 
            </View>
            <View>
              <Text style = {styles.balanceText}>Info</Text>
              <Text style = {styles.rankText}>I am a experienced traderI am a experienced traderI am a experienced trader</Text>
            </View>
            <View>
              <Text style = {styles.balanceText}>Info</Text>
              <Text style = {styles.rankText}>I am a experienced traderI am a experienced traderI am a experienced trader</Text>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    </MainScreen>
  );
};
const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SponsersView);
