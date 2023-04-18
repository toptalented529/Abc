import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    width: '100%',
    borderBottomWidth: 1,
  },
  tabContainer: {
    width: '33%',
  },
  tabLabel: {
    textAlign: 'center',
    paddingVertical: 12,
  },
  addMeetupBtn: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 10,
  },
  addImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  homeLogo: {
    width: 73,
    height: 44,
    resizeMode: 'contain',
  },
  postUserList: {
    paddingVertical: 20,
    paddingLeft: 15,
  },
  postUser: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#5790DF',
    padding: 2,
  },
  postUserAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  postUserName: {
    fontWeight: '600',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
    color: 'white',
  },
  textContainer: {
    justifyContent: 'center',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
  },
  activeTab: {
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  tabText: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 19,
  },
  suggestBoxHeader: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 28,
    marginTop: 20,
  },
  miniIcon: {
    width: 17,
    height: 15,
  },
  rankText: {
    fontSize: 9,
    lineHeight: 17,
    marginTop: 8,
  },

  optionValue: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 17,
    marginTop: 8,
  },
  optionTitle: {
    fontFamily: 'Montserrat',
    fontSize: 8,
    lineHeight: 17,
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  followWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
    borderRadius: 29,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  avatarIcon: {
    width: 112,
    height: 112,
  },
  balanceText: {
    fontSize: 18,
    lineHeight: 50,
  },
  balancePriceBox: {
    alignItems: 'center',
    width: 170,
    height: 33,
    borderRadius: 13,
    marginBottom: 20,
    marginTop: 6,
  },
  balancePriceText: {
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: '800',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnBox: {
    width: 100,
    height: 127,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 29,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnAvatar: {
    width: 28,
    height: 28,
  },
  btnText: {
    fontFamily: 'Montserrat',
    fontSize: 13.5,
    fontWeight: '600',
    lineHeight: 17,
    marginTop: 18,
    textAlign: 'center',
  },

  recentActivityText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  recentActivityBox: {
    height: 73,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 22,
  },
  recentActivityAvatarBox: {
    width: 39,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  recentActivityBoxText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    marginLeft: 16,
  },
  moreActivityBtn: {
    paddingLeft: 22,
    paddingRight: 10,
    borderLeftWidth: 1,
  },

  cardContainer: {
    borderRadius: 29,
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  cardContainerBorder: {
    borderRadius: 29,
    marginHorizontal: 28,
    marginVertical: height * 0.01,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  cardBox: {
    height: 139,
    borderRadius: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPic: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode:"contain",
    marginLeft: -width * 0.15
  },
  cardpiccontainer: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor:"#141436",
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  cardpicbox: {
    width: width * 0.18,
    height: width * 0.2,
    backgroundColor:"#000000",
    borderRadius:12,
    // marginLeft:width * 0.1,

  },
  cardInfo: {
    marginLeft: 26,
    alignItems: 'flex-start',
   
  },
  cardInfoText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    width: 129,
  },
  activeword : {
    paddingHorizontal:width * 0.05,
    backgroundColor:"rgba(65, 232, 141, 0.69)",
    color:"white",
    borderRadius:12,
    fontFamily:"Poppins",
    fontWeight:"light",
    marginBottom:height * 0.005
  },
  cardInfoBtn: {
    width: 129,
    height: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    marginTop: 13,
  },
  cardInfoBtnText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  backgroundImage: {
    flex:1,
    resizeMode:"contain",
    justifyContent:"flex-start",
    padding:24,
    height:"125%",
    marginTop:-23,
    //  flex: 1,
    // flexDirection:"column",
    // justifyContent:"flex-start",
    // alignItems:"center"
  },
  cardItems : {
    flex:0,
    flexDirection:"column",
    margin:0,
    padding:0,
  },
  metamaskBox: {
    width: width * 0.8,
    height: height * 0.2,
    marginBottom: height *0.05,
    marginTop: height *0.05,
    flexDirection:"column",
    borderRadius: 25,
    backgroundColor:`rgba(255,255,255,0.1)`,
    justifyContent:"center",
    alignItems:"center",

    paddingHorizontal:2,
  },
  metamaskText: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "white",
    fontWeight: "100"
  },
  UniversoText: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  logo: {
    width: width * 0.2,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  registerButton: {
    height: height * 0.08,
    width:width * 0.8,
  },
  registerText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.4,
    textAlign: 'center',
    color: '#fff',
  },
  logoText: {
    width: 275,
    height: 33,
    marginTop: 11,
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  appText: {
    width: width * 0.7,
    marginTop: 0,
    fontFamily: 'Poppins',
    fontSize: 48,
    fontWeight: '600',
    letterSpacing: 4,
    textAlign: 'center',
    color: '#fff',
  },
 
});
