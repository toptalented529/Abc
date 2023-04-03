import React, { useRef } from 'react'
import { Dimensions, Image, ImageBackground, SafeAreaView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import styles from './styles'
import images from '../../assets/images'
import AppIntroSlider from 'react-native-app-intro-slider'
import sharedStyles from '../Styles'
import { themes } from '../../constants/colors'
import I18n from '../../i18n'
import Button from '../../containers/Button'
import { appReady } from '../../actions/app'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

const theme = 'light'
const {width, height } = Dimensions.get('window');

const slides = [
  {
    key: 1,
    title_first: 'you can',
    title: ' Buy licenses',
    text: ' ',
    text_last: 'tokens and products',
    image: images.onboarding_mobile,
  },
  {
    key: 2,
    title_first: 'Lorem lpsum is simply dummy ',
    title: '',
    text: 'text of the printing',
    text_last: '',
    image: images.onboarding_coin,
  },
  {
    key: 3,
    title_first: '',
    title: 'Create your community',
    text: 'and',
    text_last: ' earn money',
    image: images.onboarding_people,
  },
]

const IntroView = ({ appReady }) => {
  const sliderRef = useRef(null)
  const _renderItem = ({ item }) => (
    <ImageBackground style={styles.container} source={images.background}>
      <View style={sharedStyles.headerContainer}>
        <Image source={images.logo} style={styles.logo}></Image>
        <Text style ={styles.logoText}>OFFICE</Text>
        <Text style = {styles.appText}>UNIVERSO</Text>
      </View>
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.description}>
          <View style  ={{flexDirection:"row"}}>
          <Text style={[styles.title_first, { color: "#fff" }]}>{item.title_first}</Text>
          <Text style={[styles.title, { color: "#fff" }]}>{item.title}</Text>
          </View>
          <View style ={{flexDirection:"row", alignSelf:'center'}}>
          <Text style={[styles.text, { color: "#fff" }]}>{item.text}</Text>
          <Text style={[styles.text_last, { color: "#fff", alignSelf:"center" }]}>{item.text_last}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  )

  const _renderPagination = (activeIndex) => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {slides.length > 1 &&
              slides.map((_, i) => (
                <View
                  key={i}
                  style={i === activeIndex ? styles.activatedDot : [styles.dot]}
                />
              ))}
          </View>
          <View style={{ marginHorizontal: 48, marginTop:height *0.02 }}>
            <LinearGradient
              colors={['#6c40bd', '#1b97c0', '#01dfcc']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.67, 1]}
              style={{
                marginHorizontal: height * 0.01,
                borderRadius: 43,
              }}>
              <TouchableOpacity style={[styles.registerButton, { borderBottom: 20 }]} onPress={() => _onDone(activeIndex)}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={styles.registerText}>NEXT</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            {/* <Button
              style={styles.submitBtn}
              title={activeIndex < slides.length - 1 ? I18n.t('Next').toUpperCase() : 'Continue to app'}
              size="W"
              onPress={() => _onDone(activeIndex)}
              theme={theme}
              pressingHighlight
            /> */}
          </View>
        </SafeAreaView>
      </View>
    )
  }


  const _onDone = (activeIndex) => {
    if (activeIndex < slides.length - 1) {
      sliderRef.current.goToSlide(++activeIndex)
    } else {
      appReady()
    }
  }
  return (
    <View
      style={[
        sharedStyles.container,
        { backgroundColor: themes[theme].backgroundColor },
      ]}>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        renderPagination={_renderPagination}
        bottomButton
      />
    </View>

  )
}

const mapDispatchToProps = dispatch => ({
  appReady: () => dispatch(appReady()),
})

export default connect(null, mapDispatchToProps)(withTheme(IntroView))
