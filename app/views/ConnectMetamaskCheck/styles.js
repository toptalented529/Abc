import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_WHITE } from '../../constants/colors';


const { width, height } = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logo: {
    width: 93,
    height: 48,
    resizeMode: 'contain',
  },
  logoText: {
    width: 275,
    height: 33,
    marginTop: 11,
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  appText: {
    width: width * 0.7,
    marginTop: 4,
    fontFamily: 'Poppins',
    fontSize: 48,
    fontWeight: '600',
    letterSpacing: 4,
    textAlign: 'center',
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  submitBtn: {
    height: 64,
    borderRadius: 43,
    backgroundI:
      'linear-gradient(104deg, #6c40bd -3%, #1b97c0 67%, #01dfcc 100%)',
  },
  forgotContainer: {
    marginBottom: 10,
  },
  forgotText: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 30,
  },
  description: {
    alignItems: 'center',
    marginBottom: 19,
  },
  loginTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'HindVadodara-Bold',
  },
  loginText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    lineHeight: 24,
    color: '#fff',
  },
  dontText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#fff',
  },
  registerText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.4,
    textAlign: 'center',
    color: '#fff',
  },
  registerButton: {
    height: height * 0.08,
    width: width * 0.8,
  },
  metamaskBox: {
    width: width * 0.8,
    height: height * 0.2,
    flexGrow: 0,
    marginBottom: height * 0.02,
    flexDirection: "column",
    // marginVertical: 32.7,
    // marginTop: 32.7,
    // marginBottom: 3,
    // marginLeft: 1,
    // paddingVertical: 0.3,
    // paddingHorizontal: 30,
    // paddingTop: 0.3,
    // paddingBottom: 1.4,
    // opacity: 0.1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  metamask: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode:'contain'
  },
  circlebox: {
    width: width *0.25,
    height: width *0.25,

    borderRadius: 50,
    backgroundColor: `rgba(255,255,255,0.1)`,
    justifyContent:"center",
    alignItems:"center"
  },
  dotedline: {
    borderColor:"white",
    width:width * 0.1,
    borderStyle:'dotted',
    borderWidth:1,
    borderDashArray: [100, 100],
    marginHorizontal:1,
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
  error: {
    color: "#FFD700",
    alignSelf: 'center'
  }
});
