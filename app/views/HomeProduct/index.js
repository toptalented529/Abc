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
import TeamData from './TeamData';
const { width,height } = Dimensions.get('screen');

const HomeProduct = props => {
  const route = useRoute()
  const {type} = route.params

  console.log("5645678456",type)
  const navigation = useNavigation();
  const [state, setState] = useState({
    refreshing: false,
    loading: false,
    isUpdating: false,
  });
  const { loading, isUpdating, refreshing } = state;
  const tabBarHeight = useBottomTabBarHeight();

  return (

    <MainScreen
      navigation={navigation}
      style={{backgroundColor: 'transparent', paddingBottom: tabBarHeight-30 }}
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
        <ScrollView style={{ flexGrow: 1 }}>
          <View style = {[styles.cardItems,{marginTop:height * 0.05}]}>
          <CardDataItem name = {type} />
          {/* <CardDataItem name = {'Products'}/>
          <CardDataItem name = {'Associated'}/> */}
          </View>
          <BalanceDetail />
          <TeamData/>
          <RecentActivity />
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
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withActionSheet(withTheme(HomeProduct)));
