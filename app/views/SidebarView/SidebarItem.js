import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {VectorIcon} from '../../containers/VectorIcon';

import styles from './styles';
import {COLOR_BLACK, themes} from '../../constants/colors';

const Item = React.memo(
  ({id, left, text, onPress, textStyle, theme, hasRight}) => {
    const navigation = useNavigation();

    const gotoPage = name => {
      if (name === 'Token') navigation.navigate('TokenView');
      if (name === 'My data') navigation.navigate('MyData');
      if (name === 'Transactions') navigation.navigate('Transaction');
      if (name === 'Rewards') navigation.navigate('RewardsView');
      if (name === 'Authorization') navigation.navigate('AuthorizationView');
    };

    const gotoSubPage = (item, subName) => {
      if (item.name === 'Token') {
        if (subName === 'Hayek')
          navigation.navigate('Hayek', {subProp: subName});
        if (subName === 'Genu')
          navigation.navigate('Hayek', {subProp: subName});
      }
      if (item.name === 'My data') {
        navigation.navigate('MyData');
      }
      if (item.name === 'Rewards') {
        if(subName ==="Direct")
        navigation.navigate('RewardsDetailView',{name:"Direct"});
        if(subName ==="Range")
        navigation.navigate('RewardsDetailView',{name:"Range"});
        if(subName ==="Team")
        navigation.navigate('RewardsDetailView',{name:"Team"});
        if(subName ==="Annual")
        navigation.navigate('RewardsDetailView',{name:"Annual"});
        if(subName ==="Igualacion")
        navigation.navigate('RewardsDetailView',{name:"Igualacion"});
        if(subName ==="Embassador")
        navigation.navigate('RewardsDetailView',{name:"Embassador"});
        if(subName ==="Empates")
        navigation.navigate('MatchingRewardView',{userID:0});
        if(subName ==="Sales")
        navigation.navigate('RewardsDetailView',{name:"Sales"});
      }
    };

    return (
      <View style={styles.subItemContainer}>
        <TouchableOpacity
          key={id}
          style={styles.subItemBox}
          onPress={() => gotoPage(text.name)}>
          <View style={styles.item}>
            {left && <View style={styles.itemLeft}>{left}</View>}
            <View style={styles.itemCenter}>
              <Text
                style={[styles.itemText, {color: COLOR_BLACK, ...textStyle}]}>
                {text.name}
              </Text>
            </View>
          </View>
          {hasRight && (
            <VectorIcon
              type="MaterialCommunityIcons"
              name="chevron-right"
              color={COLOR_BLACK}
              size={24}
            />
          )}
        </TouchableOpacity>
        {true ? (
          <View style={{paddingHorizontal: 10}}>
            {text.subItems?.map(idx => (
              <TouchableOpacity
                style={{flexDirection: 'row', paddingVertical: 8}}
                onPress={() => gotoSubPage(text, idx)}>
                <VectorIcon
                  type={'Entypo'}
                  name={'dot-single'}
                  size={18}
                  color={COLOR_BLACK}
                />
                <Text style={[styles.itemSubText, {color: COLOR_BLACK}]}>
                  {idx}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  },
);

export default Item;
