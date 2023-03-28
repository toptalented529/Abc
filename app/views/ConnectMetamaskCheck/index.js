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

import { loginSuccess as loginSuccessAction } from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { appStart as appStartAction } from '../../actions/app';

import StatusBar from '../../containers/StatusBar';
import KeyboardView from '../../containers/KeyboardView';
import { Linking } from 'react-native';

import "react-native-get-random-values"
import "@ethersproject/shims"




const ConnectMetamask = props => {
  const navigation = useNavigation();
  const { loginSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errMetamask, seterrMetamask] = useState('')
  const [message, setMessage] = useState("signUp");
  const [signature, setSignature] = useState("");
  const [nonce, setNonce] = useState()
  const [address, setAddress] = useState('')
  const metamaskUrl = 'https://metamask.app.link'
  const [web3, setWeb3] = useState(null);


  useEffect(() => {
    setTimeout(
      () => {
        navigation.navigate("OldAccount")
      }, 1000
    )
  })


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
          <View style={{ flex: 1, flexDirection:"row", justifyContent: 'center' }}>
            <Text style={styles.metamaskText}>Connecting</Text>
            <Text style={styles.UniversoText}>  Universo</Text>
          </View>
          <View style={{ flex: 1, flexDirection:"row", justifyContent: 'center', marginBottom: 15 }}>
            <Text style={styles.metamaskText}>to</Text>
            <Text style={styles.UniversoText}>  Metamask</Text>
          </View>
        </View>


        <View style ={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
          <View style ={styles.circlebox}>
          <Image style={styles.metamask} source={images.logo}></Image>

          </View>
          <View style ={styles.dotedline}></View>
          <Image source={images.tick_circle}></Image>
          <View style ={styles.dotedline}></View>

          <View style ={styles.circlebox}>
          <Image style={styles.metamask} source={images.metamask_image}></Image>

          </View>

        </View>



        
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(ConnectMetamask));
