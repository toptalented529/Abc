import React, {useState, useEffect} from 'react';
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
import {connect} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLOR_BLACK, themes} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import styles from './styles';
import {setUser as setUserAction} from '../../actions/login';
import images from '../../assets/images';
import ActivityIndicator from '../../containers/ActivityIndicator';
import MainScreen from '../../containers/MainScreen';
import firebaseSdk, {
  NOTIFICATION_TYPE_COMMENT,
  NOTIFICATION_TYPE_FOLLOW,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk';
import {VectorIcon} from '../../containers/VectorIcon';
import I18n from '../../i18n';
import {dateStringFromNowShort} from '../../utils/datetime';
import {navigateToProfile} from '../../utils/const';
import {TabView, SceneMap} from 'react-native-tab-view';

const {width} = Dimensions.get('screen');

import {useNavigation} from '@react-navigation/native';

import MainHeader from '../../containers/MainHeader';

import BalanceDetail from './BalanceDetail';
import NavButton from './NavButton';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DimensionsContext } from '../../dimensions';
const {height} = Dimensions.get("screen")
const RewardsView = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    refreshing: false,
    loading: false,
    isUpdating: false,
  });
  const {loading, isUpdating, refreshing} = state;
  const tabBarHeight = useBottomTabBarHeight();
  console.log("sdfsdfsdfsdfsdf",tabBarHeight,height * 0.01)

  return (
    <MainScreen navigation={navigation} style={{backgroundColor: '#141436', paddingBottom:height * 0.02 + 31}}>
      <ImageBackground
       source={images.home_background}
       style={styles.backgroundImage}
      >
      <MainHeader />

      {isUpdating && (
        <ActivityIndicator absolute theme={"light"} size={'large'} />
      )}
      <ScrollView>
      <BalanceDetail />
      <View style={styles.btnContainer}>
        <NavButton name={'Direct'} />
        <NavButton name={'Empates'} />
        <NavButton name={'Team'} />
        <NavButton name={'Range'} />
        <NavButton name={'Annual'} />
        <NavButton name={'Sales'} />
        <NavButton name={'Igualacion'} />
        <NavButton name={'Embassador'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RewardsView);
