import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../../../Styles/SliderEntry.style';
import {Badge, Button, Icon} from 'native-base';
import HappyHour from '../Particles/HappyHour';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {illustration},
      parallax,
      parallaxProps,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{uri: illustration}}
        containerStyle={[styles.imageContainer]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={'#fff'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{uri: illustration}} style={styles.image} />
    );
  }

  render() {
    const {
      data: {title, type, rating, location, adv_type},
    } = this.props;

    const ProductTitle = title ? (
      <Text style={[styles.title]} numberOfLines={2}>
        {title}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          alert(`Clicked on product : '${title}'`);
        }}>
        <View style={styles.shadow} />
        {/* Image : */}
        <View style={[styles.imageContainer]}>
          {this.image}
          <View style={[styles.radiusMask]} />

          <View style={styles.containerType}>
            <Badge success style={styles.ratingBadgeInner}>
              <View style={styles.wrapRow}>
                <Icon name="star" style={styles.starIcon} />
                <Text style={styles.textWhite}>{rating}</Text>
              </View>
            </Badge>

            <Image
              source={{uri: 'https://i.imgur.com/nLcy7y4.png'}}
              style={styles.heartImage}
            />
          </View>

          <Badge warning style={styles.ratingBadge}>
            <View style={styles.wrapRow}>
              <Text style={styles.textWhite}>{type}</Text>
            </View>
          </Badge>
        </View>
        {/* Description : */}
        <View style={[styles.textContainer]}>
          {ProductTitle}
          <Text style={[styles.type]} numberOfLines={2}>
            {location}
          </Text>
          <Text style={[styles.adv_type]} numberOfLines={2}>
            {adv_type}
          </Text>

          {/* Discount: */}
          <HappyHour />
        </View>

        <View style={[styles.bookContainer]}></View>
      </TouchableOpacity>
    );
  }
}
