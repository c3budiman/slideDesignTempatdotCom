import React, {Component} from 'react';
import {View} from 'react-native';
import styles from '../../../Styles/SliderEntry.style';
import Svg, {Ellipse, Image, Text} from 'react-native-svg';

export default class HappyHour extends Component {
  render() {
    return (
      <View style={styles.wrapRow}>
        <Svg style={[styles.SvgHalfElips]}>
          <Ellipse
            cx="50%"
            cy="110%"
            rx="60%"
            ry="65%"
            stroke="purple"
            strokeWidth="1"
            fill="#cec9e6"
          />
          <View style={styles.wrapRowWithSpace}>
            <Text
              x="15%"
              y="31%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="12"
              fill="purple">
              50%
            </Text>
            <Image
              href={{uri: 'https://tempat.com/img/planet/high.png'}}
              width="20%"
              height="40%"
              x="5%"
              y="35%"
            />
            <Text
              x="15%"
              y="90%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="10"
              fill="black">
              09:00-12:00
            </Text>
            <Text
              x="50%"
              y="18%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="12"
              fill="purple">
              50%
            </Text>
            <Image
              width="20%"
              height="40%"
              x="40%"
              y="22%"
              href={{uri: 'https://tempat.com/img/planet/high.png'}}
            />
            <Text
              x="50%"
              y="80%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="10"
              fill="black">
              13:00-16:30
            </Text>
            <Text
              x="83%"
              y="28%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="12"
              fill="purple">
              50%
            </Text>
            <Image
              width="20%"
              height="40%"
              x="73%"
              y="32%"
              href={{uri: 'https://tempat.com/img/planet/high.png'}}
            />
            <Text
              x="83%"
              y="86%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="10"
              fill="black">
              18:00-21:30
            </Text>
          </View>
        </Svg>
      </View>
    );
  }
}
