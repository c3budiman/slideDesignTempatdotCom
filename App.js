import React, {Component} from 'react';
import {View, ScrollView, Text, StatusBar, SafeAreaView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from './Styles/SliderEntry.style';
import SliderEntry from './Components/Widgets/Carousel/SliderEntry';
import styles from './Styles/index.style.js';
import {DEALS,POPULARPLACE} from './Static/entries';
import {Button, Icon} from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}>
            <View style={styles.exampleContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{`Deals of the Day`}</Text>
                <View style={styles.seeMoreButtonContainer}>
                  <Button transparent styles={styles.seeMoreButton}>
                    <Text style={styles.seeMoreButtonText}>
                      SEE ALL {' '}
                      <Icon
                        type="FontAwesome"
                        name="chevron-right"
                        style={styles.arrowRightIcon}
                      />
                    </Text>
                  </Button>
                </View>
              </View>
              <Carousel
                data={DEALS}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={0.95}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                activeAnimationType={'spring'}
                activeAnimationOptions={{
                  friction: 4,
                  tension: 40,
                }}
              />
            </View>

            <View style={styles.exampleContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{`Popular Place in Jakarta`}</Text>
                <View style={styles.seeMoreButtonContainer}>
                  <Button transparent styles={styles.seeMoreButton}>
                    <Text style={styles.seeMoreButtonText}>
                      SEE ALL {' '}
                      <Icon
                        type="FontAwesome"
                        name="chevron-right"
                        style={styles.arrowRightIcon}
                      />
                    </Text>
                  </Button>
                </View>
              </View>
              <Carousel
                data={POPULARPLACE}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={0.95}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                activeAnimationType={'spring'}
                activeAnimationOptions={{
                  friction: 4,
                  tension: 40,
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
