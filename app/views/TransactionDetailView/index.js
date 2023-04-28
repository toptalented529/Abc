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
} from '../../constants/colors';
import { withTheme } from '../../theme';
import images from '../../assets/images';
import styles from './styles';

import MainScreen from '../../containers/MainScreen';
import StatusBar from '../../containers/StatusBar';
import MainHeader from '../../containers/MainHeader';
import SearchTransaction from './SearchTransaction';
import TransactionItem from './TransactionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen")
const TransactionDetailView = props => {
  const route = useRoute()
  const { title, price, date, description, trackingNumber } = route.params






  return (
    <MainScreen style={{ backgroundColor: "#141436",paddingBottom:height * 0.02 + 31  }}>
      <View style={{ backgroundColor: "#02010c", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, height: height * 0.2 }}>
        <StatusBar />
        <MainHeader />
        <Text style={styles.mediumLetters}>Detail of my transaction</Text>
      </View>
      
      <ScrollView style={styles.mainOutBox}>
        <View style={styles.mainBox}>
        </View>
      </ScrollView>


      <ScrollView style={styles.mainReBox}>
        <View style={{ flexDirection: "row" }}>
          <LinearGradient
            colors={

              ['#52e8d9', '#2ca7a1']

            }
            style={[styles.TransactionItemAvatarBox]}>
            <Image
              source={images.ico_wallet_white}
              style={styles.btnAvatar}
            />
          </LinearGradient>

          <View style={{ marginLeft: width * 0.05, }}>
            <Text style={styles.dataText}> {date}</Text>
            <Text style={{ color: "#fff", fontSize: 24, fontFamily: "Poppins", fontWeight: "bold" }}>{title}</Text>
          </View>
        </View>
        <View style={styles.whiteline}></View>
        <View style={{ flexDirection: "row" }}>
          <Image source={images.tick_circle} style={{ width: width * 0.05, height: width * 0.05, resizeMode: "contain" }}></Image>
          <Text style={styles.completeTexxt}>Complete</Text>
        </View>
        <View>
          <Text style={[styles.mediumLetters, { marginHorizontal: 0, fontSize: 12 }]}>The transaction was completed successfully</Text>
        </View>


        <View>
          <Text style={styles.descriptionText}>Product description</Text>
          <Text style={[styles.descriptionText, { fontWeight: "normal" }]}>{description}</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>Reference</Text>
          <Text style={[styles.descriptionText, { fontWeight: "normal" }]}>this is description and this will be data from transaction's name</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>Amount</Text>
          <Text style={[styles.descriptionText, { fontWeight: "normal" }]}>{price}</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>Tracking Number</Text>
          <Text style={[styles.descriptionText, { fontWeight: "normal" }]}>{trackingNumber}</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>Taracking URL</Text>
          <Text style={[styles.descriptionText, { fontWeight: "normal" }]}>this is description and this will be data from transaction's name</Text>
        </View>

      </ScrollView>



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
)(withTheme(TransactionDetailView));
