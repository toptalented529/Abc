import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import {
  COLOR_WHITE,
  COLOR_ULTRAMARINE,
  COLOR_DARKBLACK,
  COLOR_GRAY_DARK,
} from '../../constants/colors';
import { withTheme } from '../../theme';
import images from '../../assets/images';
import styles from './styles';
import ActivityIndicator from '../../containers/ActivityIndicator';

import MainScreen from '../../containers/MainScreen';
import StatusBar from '../../containers/StatusBar';
import MainHeader from '../../containers/MainHeader';
import SearchTransaction from './SearchTransaction';
import TransactionItem from './TransactionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomTextInput from '../../containers/CustomTextInput';
import i18n from '../../i18n';
const EditNicknameView = props => {


  const [success, setSuccess] = useState(false)
  const [announce,setAnnounce] = useState('')
  const [nickName, setNickname] = useState()
  const [isSelected, SetIsSelected] = useState(false)
  useEffect(() => {
    const handleFetch = async () => {

      const jwt = await AsyncStorage.getItem("jwt")
      const res = await axios.get("http://95.217.197.177:80/transaction/getMyTransaction", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )

    }
    handleFetch()
  }, [])


  const { width, height } = Dimensions.get("screen")
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Shopping' },
    { key: 'third', title: 'Commissions' },
    { key: 'forth', title: 'Withdrawals' },
  ]);

  const onSubmit = async () => {
    try{
      const jwt = await AsyncStorage.getItem("jwt")
      const res = await axios.post("http://95.217.197.177:80/account/setnickname",{
        nickname:nickName
      }, {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )

      if(res.data.success){
        setAnnounce('you successfully changed your nickname')
        setSuccess(true)
      } 




    }catch(e){

      if((await e.response).status == 404) {
        setAnnounce("you've entered wrong name")
      }
      if((await e.response).status == 400) {
        setAnnounce("This name already set")
      }



    }

  }



  return (
    <MainScreen style={{ backgroundColor: "#141436", }}>
      <View style={{ backgroundColor: "#02010c", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, }}>
        <StatusBar />
        <MainHeader />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient
            colors={['#a755ff', '#6da0ee']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.67, 1]}
            style={styles.userBox}>
            <Image source={images.icon_user} style={styles.userImage} />
          </LinearGradient>
          <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Poppins" }}>Edit my nickname</Text>
        </View>
      </View>

      <View style={{ alignSelf: "center", marginTop: height * 0.05,alignItems:"center", width: width * 0.8 }}>

        <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Poppins",marginBottom:height * 0.02 }}>Change <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Poppins", fontWeight: "bold" }}>nickname</Text></Text>
        <CustomTextInput
          returnKeyType="next"
          keyboardType="email-address"
          textContentType="oneTimeCode"
          label={'Nickname'}
          placeholder={'Nickname'}
          theme={"dark"}
          backgroundColor={"rgba(255, 252, 252, 0.08)"}
          onChangeText={val => setNickname(val)}
        />

        <LinearGradient
          colors={['#6c40bd', '#1b97c0', '#01dfcc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.67, 1]}
          style={{
            marginHorizontal: 20,
            borderRadius: 43,
          }}>
          <TouchableOpacity disabled={!nickName} style={[styles.registerButton, { borderBottom: 20 }]} onPress={onSubmit}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.registerText}>{i18n.t("Save")}</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>

        <Text style = {styles.announce}>{announce}</Text>
      </View>
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
)(withTheme(EditNicknameView));
