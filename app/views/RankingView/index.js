import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableHighlight,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { setUser as setUserAction } from '../../actions/login';
import ActivityIndicator from '../../containers/ActivityIndicator';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { withActionSheet } from '../../containers/ActionSheet';
import { VectorIcon } from '../../containers/VectorIcon';

import {
  COLOR_WHITE,
  COLOR_BLACK,
  COLOR_ULTRAMARINE,
  COLOR_DARKBLACK,
} from '../../constants/colors';
import { withTheme } from '../../theme';
import images from '../../assets/images';
import styles from './styles';

import StatusBar from '../../containers/StatusBar';
import MainHeader from '../../containers/MainHeader';
import MainScreen from '../../containers/MainScreen';
import PriceItem from './PriceItem';
import MyRanking from './MyRankingItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { Ranges } from '../../constants/app';
import { FlatList } from 'react-native-gesture-handler';
import { Badge } from 'react-native-elements';



const { width, height } = Dimensions.get("screen")
const RankingView = ({ subProp }) => {

  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState();
  const [children, setChildren] = useState();
  const [cdata, setCdata] = useState();

  const tabBarHeight = useBottomTabBarHeight();

  console.log('HayekView started -->', subProp);
  const route = useRoute()
  const { userID } = route.params

  useEffect(() => {
    const handle = async () => {
      const jwt = await AsyncStorage.getItem("jwt")
      if (userID == 0) {

        const res = await axios.get("http://95.217.197.177:80/account/me", {

          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )

        setUser(res.data.user)
        setChildren(res.data.children)
        let childrenData = []
        const currentRank = res.data.user.my_team_rank
        const prevRank = res.data.user.my_team_prev_rank
        console.log(currentRank,prevRank)

        res.data.children.forEach((child, index) => {
          const curRank = currentRank.indexOf(child.id)
          const preRank = prevRank.indexOf(child.id)
          let rankStatus = true
          if (curRank >= preRank) {
            rankStatus = true;
          } else {
            rankStatus = false;
          }

          childrenData.push(
            {
              id: index+1,
              userID: child.id,
              name: child.nickname,
              purchased_amount:parseInt(res.data.children_purchased[index]),
              range: parseInt(child.range),
              rankRised: rankStatus,
              rangeAmount:parseInt(res.data.rangeAmount[index][2])

            }
          )
        })

        if(childrenData.length > 0){
          setCdata(childrenData)
        }else{
          setCdata(tData)

        }
      } else {
        const res = await axios.get("http://95.217.197.177:80/account/getUser", {
          params: {
            userID: userID,
          },
          headers: {
            authorization: `bearer ${jwt}`
          }
        }
        )
        setUser(res.data.user)
        setChildren(res.data.children)
        let childrenData = []
        const currentRank = res.data.user.my_team_rank
        const prevRank = res.data.user.my_team_prev_rank
        console.log(currentRank,prevRank)
        res.data.children.forEach((child, index) => {
          const curRank = currentRank.indexOf(child.id)
          const preRank = prevRank.indexOf(child.id)
          let rankStatus = true
          if (curRank >= preRank) {
            rankStatus = true;
          } else {
            rankStatus = false;
          }

          childrenData.push(
            {
              id: index+1,
              userID: child.id,
              name: child.nickname,
              purchased_amount:parseInt(res.data.children_purchased[index]),
              range: parseInt(child.range),
              rankRised: rankStatus,
              rangeAmount:parseInt(res.data.children_rangeAmount[index][2])

            }
          )
        })

        if(childrenData.length > 0){
          setCdata(childrenData)
        }else{
          setCdata(tData)

        }
      }
    }

    handle()
  }, [userID])

  const tData = [
    {
      id: 1,
      userID: 1,
      issue: 10,
      amount: 20000,
      price: 224.1,
      existance: 224.1,
      range:1,
    },
    {
      id: 2,
      userID: 2,
      issue: 10,
      amount: 20000,
      price: 224.1,
      existance: 224.1,
      range:1,

    },
    // {
    //   id: 3,
    //   userID: 3,
    //   issue: 10,
    //   amount: 20000,
    //   price: 224.1,
    //   existance: 224.1,
    // },
    // {
    //   id: 4,
    //   userID: 4,
    //   issue: 10,
    //   amount: 20000,
    //   price: 224.1,
    //   existance: 224.1,
    // },
  ];

  const RenderFlatListItem = ({ data, type }) => {
    if (data.length > 0) {
      return (
        <ScrollView>
          <MyRanking data={userID} />

          {data.map(idx => (
            <PriceItem data={idx} key={'ti' + idx.id} />
          ))}
        </ScrollView>
      );
    } else {
      return <></>;
    }
  };

  const renderItem = ({ item }) => (

    <View>
      <Badge
        value={item.id}
        badgeStyle={{ backgroundColor: "#000", color: "blue", zIndex: 2, }}
      />
      <Image source={user && user.range >= item.id ? item.image : item.no_color_image} style={styles.rangeImage1} />
    </View>

  )
  const RenderFlatListItemForRange = ({ data, type }) => {
    if (data.length > 0) {
      return (
        <View>
            <ScrollView >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MyRanking data={userID} />
            <Text style={{ color: "#fff", marginLeft: width * 0.1, marginVertical: 12, alignSelf: "flex-start" }}>All Ranks</Text>
            <FlatList
              data={Ranges}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
            />
          </View>
            </ScrollView>
        </View>
      );
    } else {
      return <></>;
    }
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'My Team' },
    { key: 'second', title: 'Rangos' },
  ]);

  const renderScene = SceneMap({
    first: () => <RenderFlatListItem type={'emissions'} data={cdata?cdata:tData} />,
    second: () => <RenderFlatListItemForRange type={'distribution'} data={tData} />,
  });
  const renderTabBar = props => {
    return (
      <View style={[styles.tabBarContainer]}>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setIndex(i)}
                style={{ width: '50%', paddingHorizontal: 4 }}>
                {i == index ? (
                  <LinearGradient
                    colors={['#6da0ee', '#a755ff']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.tabItem}>
                    <Text style={[styles.tabText, { color: COLOR_WHITE }]}>
                      {route.title}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View
                    style={[styles.tabItemNone, { borderColor: COLOR_WHITE }]}>
                    <Text style={[styles.tabText, { color: COLOR_WHITE }]}>
                      {route.title}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <MainScreen style={{ backgroundColor: COLOR_DARKBLACK,paddingBottom:height * 0.02 + 31}}>
      <StatusBar />
      <MainHeader />
      <View style={styles.summaryBoxContainer}>
        <Text style={{ color: "#fff", fontSize: 16,marginTop:-12, }}>Ranks</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        onIndexChange={setIndex}
        style={{
          backgroundColor: COLOR_ULTRAMARINE,
        }}
      />
    </MainScreen>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withActionSheet(withTheme(RankingView)));
