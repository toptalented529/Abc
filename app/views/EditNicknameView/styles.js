import {Dimensions, StyleSheet} from 'react-native';
import { COLOR_WHITE } from '../../constants/colors';


const {width,height} = Dimensions.get("screen")
export default StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 37,
    paddingBottom: 10,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    backgroundColor:"#02010c",
    marginTop:-12,
  },
  searchBtn: {
    width: width * 0.05,
    height: width * 0.05,
  },
  searchBox: {
    paddingHorizontal: 11,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TransactionItemBox: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 19,
  },
  TransactionItemAvatarBox: {
    width: 48,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAvatar: {
    width: 25,
    height: 25,
  },
  TransactionItemBoxText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    marginLeft: 8,
    marginBottom: 4,
  },
  TransactionItemDateText: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    marginLeft: 9,
  },
  moreBtn: {
    paddingLeft: 21,
    borderLeftWidth: 1,
    height: 54,
    justifyContent: 'center',
  },
  transactionText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    marginBottom: 9,
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    width: '100%',
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
    paddingHorizontal: width * 0.04,
    paddingVertical: 12,
  },
  tabItem: {
    borderRadius: 12,
  },
  userBox: {
    width:width * 0.15,
    height:width * 0.15,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50,
    marginHorizontal:width * 0.05,
    marginBottom:height * 0.01,
  },
  userImage: {
    width: width * 0.1,
    resizeMode:"contain"
  },
  registerButton: {
    height: height * 0.07,
    width:width * 0.8,
    justifyContent:"center",
    alignItems:"center"
  },
  registerText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.4,
    textAlign: 'center',
    color: '#fff',
  },
  textInput: {
    color:COLOR_WHITE,
    width:width * 0.7,
    alignSelf:"center",
    marginVertical:height * 0.02,
    backgroundColor:"#232246",
    borderRadius:24,
    borderBottomWidth: 0
    
  },
  announce: {
    color:"#FFD700",
    alignSelf:'center'
  }
});
