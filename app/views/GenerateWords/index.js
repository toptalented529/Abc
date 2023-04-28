import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  FlatList,
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
import bip39 from 'react-native-bip39';

import { loginSuccess as loginSuccessAction } from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';
import Clipboard from '@react-native-community/clipboard';

import StatusBar from '../../containers/StatusBar';
import KeyboardView from '../../containers/KeyboardView';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';
import { ethers } from 'ethers';
import  {fromSeed} from 'bip32';
import { createHash } from 'react-native-crypto';


const { width, height } = Dimensions.get('screen');

const theme = 'light';

const GenerateWords = props => {
  const navigation = useNavigation();
  const { loginSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errNickname, seterrNickname] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const nicknameInput = useRef(null);
  const passwordInput = useRef(null);
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000);
    }
  }, [copied])

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
  const handleContinue = () => {
    navigation.navigate("PublicKeyImport")
  }

  const handleCopy = () => {
    Clipboard.setString(mnemonic)
    setCopied(true)
  }

  const handlewords = async () => {

    try {
      // const response = await axios.get("http://95.217.197.177:80/account/mnemonic")
      // console.log(response.data)


      const seed = ethers.utils.randomBytes(32);

      // Convert the seed to a HDNode object
      const mnemonic = bip39.entropyToMnemonic(seed);
      // const seeds = bip39.mnemonicToSeed(mnemonic);
      // console.log(seeds)


      // Create a Wallet object from the seed
      const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
      // const wallets = ethers.Wallet.fromMnemonic(mnemonic);

      // Extract the private key and public key from the Wallet object
      const privateKey = wallet.privateKey;
      const publicKey = wallet.publicKey;
      const address = wallet.address;
      console.log('Private key:', privateKey);
      console.log('Public key:', publicKey);
      console.log('Address:', address);





      setMnemonic(mnemonic)
      setPrivateKey(privateKey)
      // const tempString = `${response.data.privateKey}`
      await AsyncStorage.setItem("privateKey", privateKey)
      await AsyncStorage.setItem("publicKey", publicKey)

    

    } catch (e) {
      console.log(e)
    }

  }
  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.item}>{`${index + 1}. ${item}`}  </Text>
    </View>
  )


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
              <Text style={styles.logoText}>{i18n.t('OFFICE')}</Text>
              <Text style={styles.appText}>{i18n.t('universo')}</Text>
            </View>

          </ScrollView>
        </KeyboardView>

        <View style={styles.metamaskBox}>
          {privateKey &&
            <TouchableOpacity style={styles.copyText} onPress={handleCopy}>
              <Text style={styles.copyText}>{!copied ? "copiar clave" : "copied"}</Text>
            </TouchableOpacity>
          }
          <View style={styles.FlatList}>
            {mnemonic ? <FlatList
              data={mnemonic.split(" ")}
              renderItem={renderItem}
              numColumns={4}
              columnWrapperStyle={styles.row}

            /> : <Text style={styles.dontText}>{i18n.t('Mnemonic_will_be_here')}</Text>}
          </View>
        </View>




        <View style={{ flexDirection: 'column', marginBottom: height * 0.06 }}>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,

            }}>
            <TouchableOpacity disabled={!privateKey} style={styles.registerButton} onPress={handleContinue}>
              <View style={{ flex: 1, height: 64, justifyContent: 'center' }}>
                <Text style={styles.registerText}>{i18n.t('CONTINUE')}</Text>
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
            <TouchableOpacity style={styles.registerButton} onPress={handlewords}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.registerText}>{i18n.t('GENERATE_MNEMONIC')}</Text>
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

export default connect(null, mapDispatchToProps)(withTheme(GenerateWords));
