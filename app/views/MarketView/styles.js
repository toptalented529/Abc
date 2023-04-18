import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  notificationText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 9,
  },
  notificationBox: {
    paddingHorizontal: 35,
    paddingBottom:20,
    backgroundColor:"#02010c",
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  searchContainer: {
    paddingHorizontal: 37,
    paddingBottom: 23,
  },
  searchBtn: {
    width: width * 0.05,
    height: width * 0.05,
  },
  searchBox: {
    paddingHorizontal: 11,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    justifyContent: 'center',
    paddingVertical: 26,
  },
  tabContainer: {
    width: '33%',
  },
  tabLabel: {
    textAlign: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: width *0.05,
    paddingVertical: 12,
  },
  tabItem: {
    borderRadius: 12,
  },

  productContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  priceBtn: {
    width: 100,
    height: 30,
    borderRadius: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 9,
    flexDirection: 'row',
    position: 'absolute',
    top: 12,
    right: 20,
    zIndex: 5,
  },
  priceBtnText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  productItemBox: {
    backgroundColor: '#ebe8fc',
    height: 190,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productItem: {
    width: 60,
    height: 170,
  },
  productInfoContainer: {
    paddingLeft: 28,
    paddingRight: 10,
    paddingVertical: 16,
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Montserrat',
    fontSize: 11,
  },
  productItemBtn: {
    width: 250,
    height: 42,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  productItemBtnText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineSpacing: 2,
  },
});
