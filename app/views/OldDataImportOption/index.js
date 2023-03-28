import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { withTheme } from '../../theme';
import sharedStyles from '../Styles';
import styles from "./styles"
import images from '../../assets/images';
const { width, height } = Dimensions.get('screen');


import { loginSuccess as loginSuccessAction } from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';

import StatusBar from '../../containers/StatusBar';
import CustomTextInput from '../../containers/CustomTextInput';
import KeyboardView from '../../containers/KeyboardView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const theme = 'light';

const OldDataImportOption = props => {
  const navigation = useNavigation();
  const { loginSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errNickname, seterrNickname] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const nicknameInput = useRef(null);
  const passwordInput = useRef(null);

  const onGoToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const forgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const isValid = () => {
    seterrNickname('');
    setErrPassword('');
    if (!nickname.length) {
      seterrNickname('Please enter Nickname');
      nicknameInput.current.focus();
      return false;
    }
    if (!password.length) {
      setErrPassword('Please enter password');
      passwordInput.current.focus();
      return false;
    }
    return true;
  };
  const handleContinue = async () => {
    const parentId = await AsyncStorage.getItem("parentId")
    console.log("777777777777777",parentId)
    try{

      const jwt = await AsyncStorage.getItem("jwt")
        const response = await axios.post("http://95.217.197.177:80/account/importolddata", {
          email: parentId,
          vitalImport:false,
        }, {
          headers: {
            authorization: `bearer ${jwt}`
          }
        })
        if(response.status === 200)
      navigation.navigate("OldDataImported")
    } catch(e){
      console.log(e)
    }
  }
  const handleSignContinue = async () => {
    const parentId = await AsyncStorage.getItem("parentId")
    console.log("777777777777777",parentId)
    try{

      const jwt = await AsyncStorage.getItem("jwt")
        const response = await axios.post("http://95.217.197.177:80/account/importolddata", {
          email: parentId,
          vitalImport:true,
        }, {
          headers: {
            authorization: `bearer ${jwt}`
          }
        })
        if(response.status === 200)
      navigation.navigate("OldDataImported")
    } catch(e){
      console.log(e)
    }
  }

  const onSubmit = () => {
    if (isValid()) {
      setIsLoading(true);

      loginSuccess({});
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <ImageBackground style={styles.container} source={images.background}>
        <StatusBar />
        {/* <KeyboardView
          style={sharedStyles.container}
          keyboardVerticalOffset={128}>
          <ScrollView
            style={{ flex: 1, height: '100%' }}
            {...scrollPersistTaps}
            keyboardShouldPersistTaps="handled"> */}
        <View style={sharedStyles.headerContainer}>
          <Image style={styles.logo} source={images.logo} />
          <Text style={styles.logoText}>OFFICE</Text>
          <Text style={styles.appText}>universo</Text>
        </View>
        {/* 
          </ScrollView>
        </KeyboardView> */}

        <View style={styles.metamaskBox}>
          <Image style={styles.metamask} source={images.logo_white}></Image>

            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.metamaskText}>You can import all your data</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.metamaskText}>or your vital data</Text>
            </View>
            
        </View>




        <View style={{ flexDirection: 'column', marginBottom: height * 0.05 }}>
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
                <Text style={styles.registerText}>IMPORT ALL MY DATA (20USD)</Text>
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
              borderWidth: 3,
              // borderColor:"#fff"
            }}>
            <TouchableOpacity style={styles.registerButton} onPress={handleSignContinue}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.registerText}>IMPORT MY VITAL DATA (10USD)</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(OldDataImportOption));
