import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { withTheme } from '../../theme';
import sharedStyles from '../Styles';
import styles from './styles';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_YELLOW } from '../../constants/colors';

import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';
import { loginSuccess as loginSuccessAction } from '../../actions/login';
import StatusBar from '../../containers/StatusBar';
import KeyboardView from '../../containers/KeyboardView';
import axios from 'axios';
import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePINView = props => {
  const navigation = useNavigation();



  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const refs = useRef([]);
  const [fullPin, setFullPin] = useState(false)
  const [backKeyPress, setBackKeyPress] = useState(false)
  const [createPin, setCreatePin] = useState(false)
  const { loginSuccess } = props;

  useEffect(() => {
    const getPin = async () => {
      const address = AsyncStorage.getItem("currentAddress")
      const jwt = await AsyncStorage.getItem("jwt")
      const res = await axios.get("http://95.217.197.177:8000/account/me", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )
      console.log("88888", res.data)
      user = res.data.user;
      if (user.pin === "1") {
        setCreatePin(true)
      } else {

      }


    }
    getPin()

  }, [])






  const handlePinChange = (index, value) => {

    if (index > 0 && !pin[index - 1]) {
      return;
    }
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (index < 5 && value) {
      refs.current[index + 1].focus();
      setFullPin(false)
    } else if (index === 5 && value) {
      // Call function for handling the full pin
      handleFullPin(newPin.join(''));
    }
  };

  const handleFullPin = async (pin) => {
    // Handle the full pin here
    const jwt = await AsyncStorage.getItem("jwt")
    if (createPin) {
      const res = await axios.post("http://95.217.197.177:8000/account/setpin", {
        pin: pin
      }, {
        headers: {
          authorization: `bearer ${jwt}`
        }
      })
      if (res.data.success) {
        loginSuccess({})
      }
    } else {

      const res = await axios.get("http://95.217.197.177:8000/account/me", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      })
      if (pin === res.data.user.pin) {
        console.log("pin", res.data.user.pin)
        loginSuccess({});
      }
    }
    console.log('Full pin:', pin);
    setFullPin(true)
  };

  const handleFocus = (index) => {

    if (index > 0 && pin[index - 1] === '') {
      refs.current[index - 1].focus();
    }
    console.log("focus", index)
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace') {
      if (index > 0) {
        refs.current[index - 1].focus();
      } else {
        refs.current[0].focus();
      }
    }
  };

  const handleContinue = () => {
    navigation.navigate("CreateNickName")
  }












  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <ImageBackground style={styles.container} source={images.background}>
        <StatusBar />
        <KeyboardView
          style={sharedStyles.container}
          keyboardVerticalOffset={128}>
          <ScrollView
            style={{ flex: 1, height: '100%' }}
            {...scrollPersistTaps}
            keyboardShouldPersistTaps="handled">
            <View style={sharedStyles.headerContainer}>
              <Image style={styles.logo} source={images.logo} />
              <Text style={styles.logoText}>OFFICE</Text>
              <Text style={styles.appText}>universo</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.description}>
                <Text style={styles.loginText}>
                  {!createPin ? <> Enter your </> : (!fullPin ? <> Create a </> : <>This is your </>)}  <Text style={{ fontWeight: '700' }}>6-digit code</Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {pin.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(input) => (refs.current[index] = input)}
                    style={[
                      styles.digitBox,
                      { borderColor: COLOR_WHITE, color: COLOR_WHITE },]} value={digit}
                    onChangeText={(text) => handlePinChange(index, text)}
                    keyboardType="numeric"
                    maxLength={1}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      if (index < 5) {
                        refs.current[index + 1].focus();
                      }
                    }}

                    onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                    onFocus={() => handleFocus(index)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </KeyboardView>

        <LinearGradient
          colors={['#6c40bd', '#1b97c0', '#01dfcc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.67, 1]}
          style={{
            marginHorizontal: 20,
            marginBottom: 30,
            borderRadius: 43,
          }}>
          <TouchableOpacity disabled={!fullPin} style={styles.registerButton} onPress={handleContinue}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.registerText}>CONTINUE</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(CreatePINView));
