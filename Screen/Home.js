import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../Styles/SliderEntry.style';
import SliderEntry from '../Components/Widgets/Carousel/SliderEntry';
import styles from '../Styles/index.style.js';
import {DEALS, POPULARPLACE} from '../Static/entries';
import {Button, Icon} from 'native-base';
import styles2 from '../Styles/Search.style';
import {Item, Input, Content, Card, CardItem, Body} from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      searchResult: null,
      loading: true,
      FocusedSearching: false,
    };
  }

  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderSlider(data, header) {
    return (
      <View style={styles.sliderContainer}>
        {/* Header Text : */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{header}</Text>
          <View style={styles.seeMoreButtonContainer}>
            <Button transparent styles={styles.seeMoreButton}>
              <Text style={styles.seeMoreButtonText}>
                SEE ALL{' '}
                <Icon
                  type="FontAwesome"
                  name="chevron-right"
                  style={styles.arrowRightIcon}
                />
              </Text>
            </Button>
          </View>
        </View>
        {/* The Carousel : */}
        <Carousel
          data={data}
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
    );
  }

  handleTitleInputSubmit() {
    this.setState({
      FocusedSearching: true,
    });
  }

  startSearching() {
    //Alert.alert('You started typing');
    this.setState({
      FocusedSearching: true,
    });
  }
  notSearching() {
    //Alert.alert('stop typing');
    this.setState({
      FocusedSearching: false,
    });
  }

  render() {
    //console.log(this.state.FocusedSearching);
    const FillHomePage = this.state.keyword == '' ? (
      this._renderSlider(DEALS, `Deals of the Day`)
    ) :
    (
      this._renderSlider(POPULARPLACE, `Popular Place in Jakarta`)
    );
    
    const HomePage = this.state.FocusedSearching ? (
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
          {/* Search Bar : */}
          <View style={[styles2.imageContainer]}>
            <Image
              source={{uri: 'https://tempat.com/img/Home.png'}}
              style={styles2.image}
            />
            <View style={styles2.containerItemInsideImage}>
              <Text style={styles2.findDeal}>
                Cari deal terbaik di sekitar mu
              </Text>
              <View style={styles2.ContainerTextBox}>
                <Item style={styles2.searchTextBox}>
                  <Input
                    ref={c => (this._input = c)}
                    style={styles2.textBox}
                    onFocus={() => this.startSearching()}
                    onBlur={() => this.notSearching()}
                    onSubmitEditing={this.handleTitleInputSubmit}
                    placeholder="Cari restoran, cafe, meeting atau keyword lainnya"
                  />
                  <Icon type="FontAwesome" active name="search" />
                </Item>
              </View>
            </View>
          </View>
          {/* Search Bar END */}

          {this._renderSlider(DEALS, `Deals of the Day`)}

          {this._renderSlider(POPULARPLACE, `Popular Place in Jakarta`)}
        </ScrollView>
      </View>
    ) : (
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
          {/* Search Bar : */}
          <View style={[styles2.imageContainer]}>
            <Image
              source={{uri: 'https://tempat.com/img/Home.png'}}
              style={styles2.image}
            />
            <View style={styles2.containerItemInsideImage}>
              <View style={styles2.ContainerTextBox}>
                <Item style={styles2.searchTextBox}>
                  <Input
                    ref={c => (this._input = c)}
                    style={styles2.textBox}
                    onFocus={() => this.startSearching()}
                    onBlur={() => this.notSearching()}
                    onSubmitEditing={this.handleTitleInputSubmit}
                    placeholder="Cari restoran, cafe, meeting atau keyword lainnya"
                  />
                  <Icon type="FontAwesome" active name="search" />
                </Item>
                <Card>
                    <CardItem bordered>
                      <Body>
                        <Text>Aktivitas</Text>
                      </Body>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text>Daycation</Text>
                      </Body>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text>Restaurant</Text>
                      </Body>
                    </CardItem>
                  </Card>
              </View>
            </View>
          </View>
          {/* Search Bar END */}
          {FillHomePage}
        </ScrollView>
      </View>
    );
    return <SafeAreaView style={styles.safeArea}>{HomePage}</SafeAreaView>;
  }
}
