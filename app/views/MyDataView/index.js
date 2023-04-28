import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import {
  COLOR_WHITE,
  COLOR_ULTRAMARINE,
  COLOR_DARKBLACK,
} from '../../constants/colors';
import {withTheme} from '../../theme';
import images from '../../assets/images';
import styles from './styles';

import MainScreen from '../../containers/MainScreen';
import StatusBar from '../../containers/StatusBar';
import MainHeader from '../../containers/MainHeader';
import SearchData from './SearchData';
import DataItem from './DataItem';
import BalanceDetail from './BalanceDetail';

const MyDataView = props => {
  const tData = [
    {
      id: 1,
      title: 'Edit PIN',
    },
    {
      id: 2,
      title: 'Edit My Information',
    },
  
  ];

  return (
    <MainScreen  style={{backgroundColor: '#141436' }}>
      <ImageBackground
       source={images.home_background}
       style={styles.backgroundImage}
      >
      <StatusBar />
      <MainHeader />
      <BalanceDetail />
      <View style={{flexGrow: 1}}>
        {tData.map(idx => (
          <DataItem data={idx} key={'dat' + idx.id} />
        ))}
      </View>
      </ImageBackground>
    </MainScreen>
  );
};
const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(MyDataView));
