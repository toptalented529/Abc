import {Dimensions, StyleSheet} from 'react-native';


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
});
