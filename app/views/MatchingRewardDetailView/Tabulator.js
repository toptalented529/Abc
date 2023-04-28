import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import images from '../../assets/images';
import styles from './styles';
import { COLOR_WHITE, COLOR_BLACK } from '../../constants/colors';

import { VectorIcon } from '../../containers/VectorIcon';
import { useNavigation } from '@react-navigation/native';

const Tabulator = ({ name, balance }) => {

    const [color, setColor] = useState("#fff")
    const [bonusPercent, setbonusPercent] = useState(null)
    const [lineColor, setLineColor] = useState("#fff")

    useEffect(() => {
        switch (name) {
            case "Blockchain":
                setColor("#42e8e0")
                setLineColor("#88fff3")
                break;
            case "Products":
                setColor("#3c53d7")
                setLineColor("#392ec3")
                break;
            case "Associated":
                setColor("#a857ff")
                setLineColor("#D1A6FFDE")
        }

        if(balance >400){
            setbonusPercent(balance/40000)
        }else{
            setbonusPercent(balance/400)

        }






    }, [name])
    const { width, height } = Dimensions.get("screen")
    const navigation = useNavigation()
    const handlepress = () => {
        navigation.navigate("Market", { indexID: name === 'Buy Investment' ? 3 : name === 'Buy Products' ? 2 : 1 })

    }
    return (
        <View style={{ paddingVertical: 20, borderRadius: 24, width: width * 0.8,alignSelf:"center" }}>

            <Text style={{ color: "#fff", textAlign: "left", fontWeight: "bold", fontSize: 18, marginBottom: height * 0.02 }}>Tabulator</Text>
            <Text style={[styles.tabulatorText,{color:color}]}>GOALS</Text>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: width * 0.7, marginLeft: width * 0.025, marginBottom: height * 0.007 }}>
                <Text style={[styles.rankText, { color: color }]}>$50</Text>
                <Text style={[styles.rankText, { color: color }]}>$125</Text>
                <Text style={[styles.rankText, { color: color }]}>$250</Text>
                <Text style={[styles.rankText, { color: color }]}>$500</Text>
                <Text style={[styles.rankText, { color: color }]}>$1250</Text>
                <Text style={[styles.rankText, { color: color }]}>$2500</Text>
                <Text style={[styles.rankText, { color: color }]}>$5000</Text>
            </View>
            <View style={styles.percentbox} >
          
                <View style={[styles.percentbox, { width:balance>200 ? width * 0.75 * balance/40000: width * 0.75 * balance/400, backgroundColor: color }]} />
    

                <View style={[styles.verticalline, { backgroundColor: lineColor }, { left: width * 0.075 }]} />
                <View style={[styles.verticalline, { backgroundColor: lineColor }, { left: width * 0.195 }]} />
                <View style={[styles.verticalline, { backgroundColor: lineColor }, { left: width * 0.315 }]} />
                <View style={[styles.verticalline, { backgroundColor: lineColor }, { left: width * 0.435 }]} />
                <View style={[styles.verticalline, { backgroundColor: lineColor }, { left: width * 0.555 }]} />
                <View style={[styles.verticalline, { backgroundColor: lineColor }, { left: width * 0.675 }]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: width * 0.7, marginLeft: width * 0.025 }}>
                <Text style={[styles.rankText, { color: "#fff" }]}>$4</Text>
                <Text style={[styles.rankText, { color: "#fff" }]}>$10</Text>
                <Text style={[styles.rankText, { color: "#fff" }]}>$20</Text>
                <Text style={[styles.rankText, { color: "#fff" }]}>$40</Text>
                <Text style={[styles.rankText, { color: "#fff" }]}>$100</Text>
                <Text style={[styles.rankText, { color: "#fff" }]}>$200</Text>
                <Text style={[styles.rankText, { color: "#fff" }]}>$400</Text>
            </View>

        </View>
    );
};

export default Tabulator;
