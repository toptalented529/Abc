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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { withTheme } from '../../theme';
import sharedStyles from '../Styles';
import styles from './styles';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_YELLOW } from '../../constants/colors';

import { loginSuccess as loginSuccessAction } from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';

import StatusBar from '../../containers/StatusBar';
import CustomTextInput from '../../containers/CustomTextInput';
import KeyboardView from '../../containers/KeyboardView';
import { CheckBox } from 'react-native-elements';
import OldTransactionImport from '../OldTransactionImport';
import { borderBottom } from '../../utils/navigation';
import axios from 'axios';
import i18n from '../../i18n';
import ActivityIndicator from '../../containers/ActivityIndicator';

const theme = 'light';

const CreateSponserNickName = props => {
  const navigation = useNavigation();
  const { loginSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errNickname, seterrNickname] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const nicknameInput = useRef(null);
  const passwordInput = useRef(null);
  const [isSelected, setSelection] = useState(false);

  const onGoToSignUp = props => {
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

    return true;
  };

  const onSubmit = async () => {
    if (isValid() && nickname) {
      setIsLoading(true);
      console.log("h334",isLoading)
      const jwt = await AsyncStorage.getItem("jwt")
      try{

        const response = await axios.post("http://95.217.197.177:80/account/setsponsername",{
          sponsername:nickname
        },{
          headers: {
            authorization: `bearer ${jwt}`
          }
        })
        setIsLoading(false);

        // loginSuccess({});
        if((await response).status === 200)
        navigation.navigate("CreatePin")
     
      }catch(e){

        setIsLoading(false);

        console.log(e)
        if((await e.response).status == 404) {
          setPassword("you've entered wrong name")
        }
        if((await e.response).status == 401) {
          setPassword("you already have account ")
        }
      }
    }
  };
  const onCheckChange = () => {
    setSelection(!isSelected);
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
              <Text style={styles.logoText}>{i18n.t('OFFICE')}</Text>
              <Text style={[styles.appText, { marginTop: -10 }]}>{i18n.t('universo')}</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.description}>
                <Text style={styles.loginText}>
                {i18n.t('Enter_your_sponser_nickname')}
                </Text>
              </View>
              <CustomTextInput
                inputRef={nicknameInput}
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="oneTimeCode"
                label={'Nickname'}
                placeholder={'Nickname'}
                theme={theme}
                error={errNickname}
                onChangeText={val => setNickname(val)}
              />

              <View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ marginTop: -15, marginRight: -15, marginLeft: -10 }}
                  >
                    <CheckBox
                      // title = "check box"
                      checked={isSelected}
                      onPress={onCheckChange}
                      style={{ margin: 0, backgroundColor: "#000", margin: 0 }}
                    />
                  </View>
                  <Text
                    style={[styles.termText, { color: COLOR_WHITE, marginRight: 5 }]}
                  >{i18n.t('I_have_read_and_agree')}</Text>
                  <Text
                    style={[styles.termText, { color: "#01dfcc" }]}
                  >{i18n.t('to_the_term_and_conditions')}</Text>
                </View>

              </View>


            </View>
          </ScrollView>
        </KeyboardView>

        <View style={{ flexDirection: 'column', marginBottom: 60 }}>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,
            }}>
            <TouchableOpacity disabled={!isSelected ||isLoading} style={[styles.registerButton, { borderBottom: 20 }]} onPress={onSubmit}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
              {
                !isLoading?
                <Text style={styles.registerText}>{!isSelected?<>{i18n.t('CONTINUE')}</>:<>{i18n.t('Save')}</> }</Text>
                :<ActivityIndicator  absolute theme={"light"} size={'large'}/>
              }

              </View>
            </TouchableOpacity>
          </LinearGradient>
          <Text style = {styles.error}>{password}</Text>

        </View>
      </ImageBackground>

    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(CreateSponserNickName));
