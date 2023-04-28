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
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';
import { ethers } from 'ethers';

const CreatePINView = props => {
  const navigation = useNavigation();



  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const refs = useRef([]);
  const [fullPin, setFullPin] = useState(false)
  const [backKeyPress, setBackKeyPress] = useState(false)
  const [createPin, setCreatePin] = useState(false)
  const { loginSuccess } = props;
  const {ethereum} = props
  const [loginUser,seLoginUser] = useState()
  const [wrongPin,setWrongPin] = useState(false)
  const [ethereums, setEthereums] = useState()
  const [jwtFlag, setJwtFlag] = useState(true)
  const [existing, setExisting] = useState(true)
  const [signinFlag,setSigninFlag] = useState(0)
  const [userFlag,setUserFlag] = useState(true)
  const [nonce,setNonce] = useState()
  const [connected,setConntected] = useState(false)
  useEffect(() => {
    const getPin = async () => {

      try{
        const jwt = await AsyncStorage.getItem("jwt")
        if(jwt === null){
          setJwtFlag(false)
        }else{
          setJwtFlag(true)
        }
        const res = await axios.get("http://95.217.197.177:80/account/me", {
          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )
        console.log("88888", res.data.user)
       const user = res.data.user;
       if(user){
        setUserFlag(true)
       }else{
        setUserFlag(false)
       }
        seLoginUser(user)
        if (user.pin === "1" && existing) {
          setCreatePin(true)
        } else {
  
        }
        setEthereums(ethereum.sdk.getProvider())
        console.log("66666666",ethereum.sdk.getProvider())
      }catch(e){
       
          setUserFlag(false)

          setEthereums(ethereum.sdk.getProvider())
          console.log("66666666",ethereum.sdk.getProvider())
      }
    
    } 
    getPin()

  }, [signinFlag])






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
      const res = await axios.post("http://95.217.197.177:80/account/setpin", {
        pin: pin
      }, {
        headers: {
          authorization: `bearer ${jwt}`
        }
      })
      if (res.data.success) {
        await AsyncStorage.setItem("current",JSON.stringify(loginUser))
        loginSuccess({data:loginUser})
      }
    } else {

      const res = await axios.get("http://95.217.197.177:80/account/me", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      })
      if (pin === res.data.user.pin) {
        console.log("pin", res.data.user.pin)
        await AsyncStorage.setItem("current",JSON.stringify(loginUser))

        loginSuccess({data:loginUser});
      } else{
        setWrongPin(true)
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

  const handlemetamask = async () => {
    try {
      if (!ethereums.isConnected()) {
        console.log("dfdf", ethereums)
        const result = await ethereums.request({ method: 'eth_requestAccounts' });
        console.log('RESULT', result?.[0], ethereums.selectedAddress);
        AsyncStorage.setItem("currentAddress", result?.[0])
        const provider = new ethers.providers.Web3Provider(ethereums);
        const address = '0x735951C5519704203a1e76ef5251A3D9fe3ED61f';

        // Get the balance for the address
        provider.getBalance(address)
          .then(balance => {
            console.log(`Balance for ${address}: ${ethers.utils.formatEther(balance)} ETH`);
          })
          .catch(error => {
            console.error(error);
          });
          setConntected(true)

    }else{
      sign()
    }

    } catch (e) {
      console.log('ERROR', e);
    }

  }


  const sign = async () => {
    var nonce1 = "12";
    if (ethereums.isConnected()) {
      try{
        const address = await AsyncStorage.getItem("currentAddress")
        console.log("33333333333333333333333333333",address)
        const res = await axios.post("http://95.217.197.177:80/account/restoreaccount", {
          address: address
        })
        console.log("666666666666666666666677",res.data)
        setNonce(res.data.nonce)
        setExisting(res.data.existing)
        nonce1 = res.data.nonce;
        console.log(nonce1,"ddd")
        const signatureBuffer = Buffer.from(nonce1, 'hex');
        const signatureString = signatureBuffer.toString('base64');
  
        const params = [address, `Signing to Office: ${nonce1}`];
        const method = 'personal_sign';
        console.log("11111111111111111", signatureString)
  
        const resp = await ethereums.request({ method, params });
  
        console.log("sign data", resp)
  
        const res1 = await axios.post("http:///95.217.197.177:80/account/signin", {
          address: address,
          signature: resp,
        })
        AsyncStorage.setItem("jwt", JSON.stringify(res1.data.jwt))
        setSigninFlag(signinFlag +1)
      }catch(e) {
        const result = await ethereums.request({ method: 'eth_requestAccounts' });
        console.log('RESULT', result?.[0], ethereums.selectedAddress);
        await AsyncStorage.setItem("currentAddress",result?.[0])
      }
    
    
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
                  {!createPin ? <> {i18n.t('Enter_your')} </> : (!fullPin ? <>{i18n.t('Create_a')} </> : <>{i18n.t('This_is_your')} </>)}  <Text style={{ fontWeight: '700' }}>{i18n.t('digit_code6')}</Text>
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
              {
                wrongPin &&
              <Text style ={styles.wrongPinText}>You've entered wrong pin!</Text>
              }
              {
                !jwtFlag &&
              <Text style ={styles.wrongPinText}>You need to  login to the app first </Text>
              }
              {
               !wrongPin && userFlag &&
              <Text style ={styles.wrongPinText}>Plese enter Pin</Text>
              }
              {
                !existing &&
              <Text style ={styles.wrongPinText}>this is not a registered user account, you need to connect registered wallet</Text>
              }
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
          <TouchableOpacity disabled={userFlag && existing} style={styles.registerButton} onPress={handlemetamask}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.registerText}>{ethereums?<>{!connected? <Text>Connect</Text>:<Text>Signin</Text>}</>:<Text>Connect</Text>}</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};


const mapStateToProps = state => ({
  ethereum: state.app.ethereum
});
const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CreatePINView));
