import {Dimensions, StyleSheet} from 'react-native';
import { COLOR_WHITE } from '../../constants/colors';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  summaryBoxContainer: {
    paddingHorizontal: 35,
    // paddingVertical: -20,
  },
  summaryBox: {
    paddingHorizontal: 17,
    paddingVertical: 25,
    borderRadius: 29,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 9,
  },
  summaryTokenDescription: {
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  summaryTokenPrice: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '700',
  },
  summaryIconBox: {
    width: 81,
    height: 81,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  summaryBoxMain: {
    paddingHorizontal: 11,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabBarContainer: {
    width: '100%',
    paddingHorizontal: 27,
    // paddingVertical: 6,
    backgroundColor:"#000",
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24,
  },
  searchBox: {
    paddingHorizontal: 11,
    // paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    width: 24,
    height: 24,
  },
  tabContainer: {
    width: '33%',
  },
  badge: {
    backgroundColor:"#000",
    marginBottom: -width * 0.05,
    marginRight: -width * 0.11,
    zIndex:2,
  },
  rangeImage : {
    width:width * 0.2,
    height:width * 0.2,
    resizeMode:"contain",
  },  
  cupImages : {
    // position:"absolute",
    width:width * 0.2,
    height:width * 0.2,
    marginTop: -width * 0.05,
    backgroundColor:"#fff",
    borderRadius:50,
    zIndex:3,
    justifyContent:"center",
    alignItems:"center"
  },  
  cupImage : {
    width:width * 0.15,
    height:width * 0.15,
    resizeMode:"contain",
     },  
  cupBox: {
    marginTop:height * 0,
    backgroundColor:"blue",
    padding:5,
    borderRadius:50,
  },  
  rangeImage1 : {
    width:width * 0.2,
    height:width * 0.2,
    resizeMode:"contain",
    margin:width * 0.03,
    marginTop: -width  * 0.03

  },  
  tabLabel: {
    textAlign: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  tabItem: {
    borderRadius: 29,
    alignItems: 'center',
  },
  tabItemNone: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 29,
  },
  priceContainer: {
    paddingHorizontal: 26,
    paddingVertical: 7,
    // width: width * 0.8
  },
  priceBox: {
    paddingHorizontal: 2,
    paddingVertical: 27,
    borderRadius: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:"center",
    alignItems:"center",
    borderStyle:"solid",
    bordercolor:"#ffff",
    borderWidth:1,
     width: width * 0.8,
  },
 
  teamImage: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode:"contain"
  },  
  RankingBox: {
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.02,
    borderRadius: 29,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:"center",
    alignItems:"center",
    marginTop:width * 0.05,
  },
  rangeline: {
    backgroundColor:"#bfa4f5",
    width: width* 0.8,
    height:height * 0.03,
    borderRadius:24,
  },  
  rangeTeamline: {
    backgroundColor:"#bfa4f5",
    width: width* 0.5,
    height:height * 0.012,
    borderRadius:24,
  },  
  verticalLine: {
    height: width * 0.15,
    width:1,
    backgroundColor:"#fff",
    marginHorizontal:width * 0.02,
  },  
  rangePercentage: {
    height:height * 0.03,
    borderRadius:24,
  },  
  rangeTeamPercentage: {
    height:height * 0.012,
    borderRadius:24,
  },  
  itemBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#aaaaaa',
    paddingHorizontal: 19,
    paddingVertical: 8,
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  valueText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700',
  },
});
