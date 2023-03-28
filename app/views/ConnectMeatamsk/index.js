import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from '@react-navigation/native';

import { withTheme } from '../../theme';
import sharedStyles from '../Styles';
import styles from './styles';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_YELLOW } from '../../constants/colors';

import { loginSuccess as loginSuccessAction } from '../../actions/login';
// import { setEthereum } from '../../actions/app';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';

import StatusBar from '../../containers/StatusBar';
import CustomTextInput from '../../containers/CustomTextInput';
import KeyboardView from '../../containers/KeyboardView';
import { Linking } from 'react-native';

import BackgroundTimer from 'react-native-background-timer';
// import MetaMaskSDK from '@metamask/sdk';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from 'ethers';
import axios from 'axios';

import { decode as atob, encode as btoa } from 'base-64';
import store from '../../lib/createStore';
global.atob = atob;
global.btoa = btoa;
const theme = 'light';



// const sdk = new MetaMaskSDK({
//   openDeeplink: link => {
//     Linking.openURL(link);
//   },
//   timer: BackgroundTimer,
//   dappMetadata: {
//     name: 'React Native Test Dapp',
//     url: 'example.com',
//   },
// });
// const ethereum = sdk.getProvider();
// const provider = new ethers.providers.Web3Provider(ethereum);


const ConnectMetamask = props => {
  const navigation = useNavigation();
  const {ethereum, loginSuccess } = props;
  // const { setEthereum } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errMetamask, seterrMetamask] = useState('')
  const [message, setMessage] = useState("signUp");
  const [signature, setSignature] = useState("");
  const [nonce, setNonce] = useState()
  const [address, setAddress] = useState('')
  const metamaskUrl = 'https://metamask.app.link'
  const [web3, setWeb3] = useState(null);
  const [ethereums, setEthereums] = useState()
  // useEffect(() => {
  //   store.dispatch(setEthereum({sdk}))
  //   // AsyncStorage.setItem("ethereum",ethereum)
  //   console.log("9999999999999999999999999", ethereum)
  // }, [ethereum])

  useEffect(() => {
    const setItme = async () => {
      // const result = await ethereum.request({ method: 'eth_requestAccounts' });
      // console.log('RESULT', result?.[0],ethereum.selectedAddress);
      console.log("77777777777777777777777777777",ethereum)
      const eth = ethereum.sdk.getProvider();
      // const result = await eth.request({ method: 'eth_requestAccounts' });
      setEthereums(eth)
    }
    setItme()
  },[])
  
  const handleContinue = async () => {
    navigation.navigate("ConnectMetamaskCheck")
  }

  const handlemetamask = async () => {
    try {
      if (!address) {
        console.log("dfdf", ethereums)
        const result = await ethereums.request({ method: 'eth_requestAccounts' });
        console.log('RESULT', result?.[0],ethereums.selectedAddress);
        setAddress(result?.[0])
        AsyncStorage.setItem("currentAddress", result?.[0])


        
      } else {
        sign()
      }

    } catch (e) {
      console.log('ERROR', e);
    }

  }


  const sign = async () => {
    var nonce1 = "12";
    if (address) {
      console.log("33333333333333333333333333333")
      const res = await axios.post("http://95.217.197.177:80/account/signup", {
        address: address
      })
      setNonce(res.data.nonce)
      nonce1 = res.data.nonce;


      const params = [address, nonce1];
      const method = 'personal_sign';
      console.log("11111111111111111", nonce1)

      const resp = await ethereums.request({ method, params });
  
      console.log("sign data", resp)

      const res1 = await axios.post("http:///95.217.197.177:80/account/signin", {
        address: address,
        signature: resp,
      })
      AsyncStorage.setItem("jwt", JSON.stringify(res1.data.jwt))
      const flag = await AsyncStorage.getItem("jwt")
      console.log("here", flag)
      setTimeout(() => {
        handleContinue()
        
      }, 1000);
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

          {/* </ScrollView>
        </KeyboardView> */}

        <View style={styles.metamaskBox}>
          <Image style={styles.metamask} source={images.metamask_image}></Image>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.metamaskText}>Connect</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 15 }}>
            <Text style={styles.metamaskText}>MetaMask to the office</Text>
          </View>
        </View>




        <View style={{ flexDirection: 'column', marginBottom: 55 }}>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,

            }}>
            <TouchableOpacity style={styles.registerButton} onPress={handlemetamask}>
              <View style={{ flex: 1, height: 64, justifyContent: 'center' }}>
                {!address ? <Text style={styles.registerText}>YES,CONTINUE</Text> : <Text style={styles.registerText}>SIGN IN</Text>}
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

          <Text style={styles.error}>{errMetamask}</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
  // setEthereum: params => dispatch(setEthereum(params)),
});


const mapStateToProps = state => ({
  ethereum: state.app.ethereum
});


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ConnectMetamask));
