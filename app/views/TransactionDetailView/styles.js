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
  mediumLetters:{
    color:"#fff",
    fontFamily:"Poppins",
    fontSize:16,
    marginHorizontal:width * 0.1,
  },  

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox: {
    width : width * 0.8,
    height: height * 0.6,
    borderColor:"#fff",
    borderWidth:1,
    borderRadius:24,
    opacity:0.03,
    backgroundColor:"#fafafa"

  }, 
  descriptionText:{
    fontFamily:"Poppins",
    fontWeight:"bold",
    fontSize:12,
    color:"#fff",
    marginTop:width * 0.02,
  } ,
  mainReBox: {
    margin:width * 0.15,
    marginTop: -height * 0.58,
    // width : width * 0.8,
    height: height * 0.6,
    overflow:"hidden",

  },
  mainOutBox: {
    marginHorizontal: width * 0.1,
    marginTop:- height * 0.05,
    width : width * 0.8,
    height: height * 0.6,
    borderColor:"#fff",
    borderWidth:1,
    borderRadius:24,
    overflow:"hidden"

  },
  whiteline: {
    width: width * 0.7,
    borderStyle:"solid",
    borderTopColor:"#fff",
    borderWidth:0.5,
    marginVertical:height * 0.03,
  },
  completeTexxt:{
    fontFamily:"Poppins",
    fontWeight:"bold",
    fontSize:12,
    color:"#41e88d",
    marginLeft:width* 0.03,
  },
  dataText: {
    color:"#52e8d9",
    fontSize:16,
    fontFamily:"Poppins"
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
