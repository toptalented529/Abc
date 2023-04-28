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
import ProductItem from './ProductItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
// const https = require('https');

const MarketView = props => {
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [itemData, setItemData] = useState([])
  const tabBarHeight = useBottomTabBarHeight();
  const { ethereum } = props;
  const navigation = useNavigation();


  const route = useRoute();
  let { indexID } = route.params;
  if (indexID === undefined) {
    indexID = 1;
  }

  // const agent = new https.Agent({
  //   rejectUnauthorized: false
  // });


  useEffect(() => {
    const handleAxois = async () => {
      const data = []
      const response = await axios.get("http://95.217.197.177:80/transaction/getProducts")
      await response.data.items.map((item, index) => {

        data.push({
          id: index + 1,
          title: item.name,  
          price:item.price,
          description: item.description[0].value,
          // category: item.category,
          category:"blockchain",
          // subcategory: item.subcategory,
          subcategory:"pro",
          image:item.image,
        })



      })

      setItemData(data)






    }




    handleAxois()
    setIndex(indexID)
  }, [])



 const {width, height} = Dimensions.get("screen")

  const tData = [
    {
      id: 1,
      title: 'Product1',
      price: '$000.000',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      title: 'Product2',
      price: '$000.000',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      title: 'Product3',
      price: '$000.000',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 4,
      title: 'Product4',
      price: '$000.000',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  const RenderFlatListItem = ({ data, type }) => {
    if (data.length > 0) {
      return (
        <ScrollView>
          {data.map(idx => (
            <ProductItem data={idx} etheruem ={ethereum.sdk.getProvider()} key={'ti' + idx.id} />
          ))}
        </ScrollView>
      );
    } else {
      if(itemData.length > 0){
        return<Text style = {{color:"#FFD700",marginTop:height * 0.05,flexDirection:"column", textAlign:"center",justifyContent:"center",alignSelf:"center"}}>No Items found</Text>;

      }else{
      return <ActivityIndicator  absolute theme={"light"} size={'large'}/>;

      }
    }
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(indexID);

  console.log("IIIIIIII", index)
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Blockchain' },
    { key: 'third', title: 'Products' },
    { key: 'firth', title: 'Investments' },
  ]);

  const renderScene = SceneMap({
    first: () => <RenderFlatListItem type={'all'} data={itemData} />,
    second: () => <RenderFlatListItem type={'blockchain'} data={itemData?.filter((item) => {
      return item.category ==="blockchain"
    })} />,
    third: () => <RenderFlatListItem type={'products'}data={itemData?.filter((item) => {
      return item.category ==="products"
    })} />,
    firth: () => <RenderFlatListItem type={'investment'}data={itemData?.filter((item) => {
      return item.category ==="investments"
    })} />,
  });
  const renderTabBar = props => {
    return (
      <View style={[styles.tabBarContainer]}>
        <View style={styles.tabBar}>
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
        </View>
      </View>
    );
  };

  return (
    <MainScreen style={{ backgroundColor: "#141436",paddingBottom:height * 0.02+31}}>
      <View style={{ backgroundColor: "#02010c" }}>
        <StatusBar />
        <MainHeader />
      </View>
      <View style={styles.notificationBox}>
        <Text style={[styles.notificationText, { color: COLOR_WHITE }]}>
          Shop Market
        </Text>
        <LinearGradient
          colors={['#8d8be5', '#3c3ca0']}
          style={{ borderRadius: 12, opacity: 0.3 }}>
          <View style={[styles.searchBox]}>
            <Image source={images.ico_search} style={styles.searchBtn} />
            <TextInput
              inputRef={searchInput}
              iconLeft={images.ico_search}
              returnKeyType="search"
              keyboardType="searchContent"
              textContentType="oneTimeCode"
              label={'search'}
              placeholder={'Input your item key'}
              placeholderTextColor={'#aaa'}
              onChangeText={val => setSearchText(val)}
              style={{ marginLeft: 10, color: COLOR_WHITE }}
            />
          </View>
        </LinearGradient>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        onIndexChange={setIndex}
        style={{
          backgroundColor: COLOR_ULTRAMARINE,
          // paddingBottom: tabBarHeight,
        }}
      />
    </MainScreen>
  );
};

const mapStateToProps = state => ({
  ethereum:state.app.ethereum
});

// const mapDispatchToProps = dispatch => ({
//   // setUser: params => dispatch(setUserAction(params)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(withActionSheet(withTheme(MarketView)));
