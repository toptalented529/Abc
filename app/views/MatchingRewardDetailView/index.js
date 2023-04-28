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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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
import RecentActivity from './RecentActivity';
import CardDataItem from './CardDataItem';

import images from '../../assets/images';
import Tabulator from './Tabulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ethers } from 'ethers';
import { bonus_ABI, bonus_address } from '../../constants/app';
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen');

const MatchingRewardDetailView = props => {
  const route = useRoute()
  const { type, active } = route.params
  const { ethereum } = props;
  const { width, height } = Dimensions.get("screen")

  const navigation = useNavigation();
  const [state, setState] = useState({
    refreshing: false,
    loading: false,
    isUpdating: false,
  });
  const [user, setUser] = useState()
  const [matchingBonus, setMatchingBonus] = useState(0.000)
  const { loading, isUpdating, refreshing } = state;
  const [color, setColor] = useState("#fff")
  const [lineColor, setLineColor] = useState("#fff")
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    const handleEffect = async () => {

      const jwt = await AsyncStorage.getItem("jwt")

      const res = await axios.get("http://95.217.197.177:80/account/me", {

        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )
      setUser(res.data.user)

      const provider = new ethers.providers.JsonRpcProvider('http://193.203.15.109:8545/');
      const contractToken = new ethers.Contract(bonus_address, bonus_ABI, provider);
      console.log("smart contracts", provider)

      const result = await contractToken.getReservedTotalBonusAmount(res.data.user.id, "blockchain", "Matching")
      console.log("smart contract", ethers.utils.formatUnits(result, 18))
      setMatchingBonus(ethers.utils.formatUnits(result, 18))


      switch (type) {
        case "Blockchain":
          setColor("#42e8e0")
          setLineColor("#88fff3")
          break;
        case "Products":
          setColor("#3c53d7")
          setLineColor("#392ec3")
          break;
        case "Associated":
          setColor("#a857ff")
          setLineColor("#D1A6FFDE")
      }

    }
    handleEffect()
  }, [type])



  return (

    <MainScreen
      navigation={navigation}
      style={{ backgroundColor: 'transparent',paddingBottom:height * 0.02 + 31  }}
    >
      <ImageBackground
        source={images.home_background}
        style={styles.backgroundImage}
      >
        <StatusBar />
        <MainHeader />
        {isUpdating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}

        <ScrollView style={{ flexGrow: 1, borderRadius: 20, width: width * 0.88, alignSelf: "center" }}>
          <LinearGradient
            colors={['#7470ba', '#06042e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            // locations={[0, 0.67, 1]}
            style={{ flexGrow: 1, borderColor: color, borderWidth: 1, borderRadius: 25, width: width * 0.88, alignSelf: "center" }}
          >
            <View style={[styles.cardItems, { marginTop: height * 0.05, marginBottom: height * 0.03 }]}>
              <View style={styles.imagebox}>
                <Image source={type === "Blockchain" ? images.ico_wallet : type === "Products" ? images.ico_bag1 : images.ico_invest} style={styles.cardPicHeader} />
              </View>
              <Text style={{ color: "#fff", textAlign: "center" }}>{type}</Text>

            </View>
            <BalanceDetail name={type} balance={matchingBonus} ethereum = {ethereum.sdk.getProvider()} />
            <Tabulator name={type} balance={matchingBonus} />



          </LinearGradient>
        </ScrollView>
      </ImageBackground>
    </MainScreen>

  );
};


const mapStateToProps = state => ({
  user: state.login.user,
  ethereum: state.app.ethereum
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withActionSheet(withTheme(MatchingRewardDetailView)));
