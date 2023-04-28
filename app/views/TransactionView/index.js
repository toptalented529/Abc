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
import ActivityIndicator from '../../containers/ActivityIndicator';

import MainScreen from '../../containers/MainScreen';
import StatusBar from '../../containers/StatusBar';
import MainHeader from '../../containers/MainHeader';
import SearchTransaction from './SearchTransaction';
import TransactionItem from './TransactionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const TransactionView = props => {
  const {width, height} = Dimensions.get("screen")
  const [allTransaction, setAllTransaction] = useState([])
  const [shoppingTransaction, setShoppingTransaction] = useState([])
  const [commissionTransaction, setCommissionTransaction] = useState([])
  const [withdrawTransaction, setWithdrawTransaction] = useState([])
  const [teamTransaction, setTeamTransaction] = useState([])
  const [directTransaction, setDirectTransaction] = useState([])
  const [matchingTransaction, setMatchingTransaction] = useState([])
  const [salesTransaction, setSalesTransaction] = useState([])
  const [annualTransaction, setAnnualTransaction] = useState([])
  const [started,setStart] = useState(false)

  let ifFocused = false
  ifFocused = useIsFocused()
  console.log("00000000000000",ifFocused)
  useEffect(() => {
    const handleFetch = async () => {

      const jwt = await AsyncStorage.getItem("jwt")
      const res = await axios.get("http://95.217.197.177:80/transaction/getMyTransaction", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )  
      let temp = []
      res.data.forEach((transaction, key) => {

        temp.push({
          id: key,
          title: transaction.productType?transaction.productType:'Token',
          price: transaction.imp,
          name: transaction.hayeks_pos > 0 ? "Hayek" : transaction.tkns > 0 ? "Genu" : "producto",
          date: transaction.fch_hra,
          description: transaction.name,
          tracking_number: transaction.tracking_number,
          mov_tip:transaction.mov_tip



        })
      })
      console.log("99999999999999999999999999999")
      setAllTransaction(temp)
      const shopping = temp.filter(transaction => transaction.mov_tip ==="A")
      setShoppingTransaction(shopping)
      const commit = temp.filter(transaction => transaction.mov_tip ==="I")
      setCommissionTransaction(commit)
      const withdraw = temp.filter(transaction => transaction.mov_tip ==="C")
      setWithdrawTransaction(withdraw)
      const direct = temp.filter(transaction => transaction.title ==="Direct")
      setDirectTransaction(direct)
      const matching = temp.filter(transaction => transaction.title ==="Empates")
      setMatchingTransaction(matching)
      const annual = temp.filter(transaction => transaction.title ==="Annual")
      setAnnualTransaction(annual)
      const team = temp.filter(transaction => transaction.title ==="Team")
      setTeamTransaction(team)
      const sales = temp.filter(transaction => transaction.title ==="Sales")
      setSalesTransaction(sales)






      setStart(true)
      console.log("slow",res.data)

      
    }
    handleFetch()
  }, [ifFocused])

  const handleScroll = () => {
    
  }


  const tData = [
    {
      id: 1,
      title: 'Token',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 2,
      title: 'Inversion',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 3,
      title: 'Producto',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 4,
      title: 'Token',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 5,
      title: 'Inersion',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
  ];

  const tabBarHeight = useBottomTabBarHeight();

  const RenderFlatListItem = ({ data, type }) => {
        // const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (data.length > 0) {
      if(data ===tData){
        return <Text style = {{color:"#FFD700",marginTop:height * 0.05,flexDirection:"column", textAlign:"center",justifyContent:"center",alignSelf:"center"}}>No transaction found</Text>
      }else{

        return (
          <ScrollView onScroll={handleScroll}>
            {started && <View>
              {data.map(idx => (
            <TransactionItem data={idx} key={'ti' + idx.id} /> 
            ))}
            </View>}
           
          
          </ScrollView>
        );
      }
    } else {
      return    <ActivityIndicator absolute theme={"light"} size={'large'} />
      ;
    }
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Shopping' },
    { key: 'third', title: 'Commissions' },
    { key: 'forth', title: 'Withdrawals' },
    { key: 'fifth', title: 'Direct' },
    { key: 'sixth', title: 'Matching' },
    { key: 'seventh', title: 'Team' },
    { key: 'eighth', title: 'Sales' },
    { key: 'ninth', title: 'Annual' },
  ]);

  const renderScene = SceneMap({
    first: () => <RenderFlatListItem type={'all'} data={allTransaction.length !==0?allTransaction:tData} />,
    second: () => <RenderFlatListItem type={'shopping'} data={shoppingTransaction.length !==0? shoppingTransaction:tData} />,
    third: () => <RenderFlatListItem type={'commisions'} data={commissionTransaction.length !==0?commissionTransaction:tData} />,
    forth: () => <RenderFlatListItem type={'Withdrawals'} data={withdrawTransaction.length !==0? withdrawTransaction:tData} />,
    fifth: () => <RenderFlatListItem type={'Direct'} data={directTransaction.length !==0? directTransaction:tData} />,
    sixth: () => <RenderFlatListItem type={'Matching'} data={matchingTransaction.length !==0? matchingTransaction:tData} />,
    seventh: () => <RenderFlatListItem type={'Team'} data={teamTransaction.length !==0? teamTransaction:tData} />,
    eighth: () => <RenderFlatListItem type={'Sales'} data={salesTransaction.length !==0? salesTransaction:tData} />,
    ninth: () => <RenderFlatListItem type={'Annual'} data={annualTransaction.length !==0? annualTransaction:tData} />,
  });
  const renderTabBar = props => {
    return (
      <View style={[styles.tabBarContainer]}>
        <View style={styles.tabBar}>
          <ScrollView horizontal = {true}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => setIndex(i)}>
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
                  <View>
                    <Text style={[styles.tabText, { color: COLOR_WHITE }]}>
                      {route.title}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <MainScreen style={{ backgroundColor: "#141436",paddingBottom:height * 0.02 + 31  }}>
      <View style={{ backgroundColor: "#02010c", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <StatusBar />
        <MainHeader />
        <SearchTransaction />
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
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(TransactionView));
