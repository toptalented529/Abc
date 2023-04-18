import {Dimensions, StyleSheet} from 'react-native';


const {width,height} = Dimensions.get("screen")
export default StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 37,
    paddingBottom: 23,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    backgroundColor:"#02010c"
  },
  searchBtn: {
    width: 24,
    height: 24,
  },
  logoimage: {
    width: width * 0.2,
    height: width * 0.2,
    marginTop:width * 0.02,
  },
  logoText: {
    color:"#fff",
    fontWeight:"bold",
    fontSize:24,
    letterSpacing:2,
  },
  logoSmallText: {
    color:"#fff",
    fontWeight:"normal",
    fontSize:16,
    letterSpacing:2,
  },
  logoBox : {
    width : width * 0.4,
    height:width * 0.5,
    backgroundColor:"#000",
    borderColor:"rgba(255, 239, 252, 0.5)",
    borderWidth:1,
    borderRadius:30,
    margin:width * 0.05,
    justifyContent:"center",
    alignItems:"center"
  },
  searchBox: {
    paddingHorizontal: 11,
    paddingVertical: 3,
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
    paddingHorizontal: width * 0.05,
    paddingVertical: 12,
  },
  tabItem: {
    borderRadius: 12,
  },
});
