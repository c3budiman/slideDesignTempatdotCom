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
import { Base_url,Client_token } from '../env'

var cancel;

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

  _renderSearchResult(data) {
    
    <Card>
      <CardItem bordered style={styles2.aktivitasCard}>
        <Body>
          <Text>Merchant</Text>
        </Body>
      </CardItem>
    </Card>
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
      searchResult: null,
      keyword: '',
    });
  }

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

  doSearching(keyword) {
    if(keyword.length>1) {
      if(this.timeout) {
        console.log('canceled')
        clearTimeout(this.timeout);
      }
    
      this.timeout = setTimeout(() => {
          if (cancel != undefined) {
              cancel();
          }
          fetch(Base_url+'/api/v2/search?page=1&per_page=10&class=provinsi&idx=11&query='+keyword, {
            method:'GET',
            headers: {
              'Accept'       : 'application/json',
              'Authorization': 'Bearer ' + Client_token,
              'Content-Type' : 'application/json'
            }
          })
          .then((response) => response.json())
          .then((json) => {
            if (json.error) {
              alert(json.error)
            } else {
              if(json.status) {
                //this._renderSearchResult(json.data)
                this.setState({searchResult: json.data});
                console.log(this.state.searchResult);
              } else {
                Alert.alert('Error!','idk what just error.')
                console.error(error)
                console.log(error);
              }
            }
          })
          .catch((error) => {
            Alert.alert('Error!','idk what just error.')
            console.error(error)
            console.log(error);
          })
        }, 600);
    }
  }
  
  startTyping(text){
    console.log(text)
    this.setState({
      keyword:text,
    })
    this.doSearching(text);
  }

  render() {
    //console.log(Base_url);
    const FillHomePage = this.state.searchResult == null ? (
      this._renderSlider(POPULARPLACE, `Popular Place in Jakarta`)
    ) :
    (
      this._renderSearchResult(this.state.searchResult)
    );

    const searchResult = this.state.searchResult ? (
      this._renderSearchResult(this.state.searchResult)
      
    ) : (
      <Card>
        <CardItem bordered style={styles2.aktivitasCard}>
          <Body>
            <Text>Aktivitas</Text>
          </Body>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text> <Icon type="FontAwesome" active name="search" /> {" "} Daycation</Text>
          </Body>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text> <Icon type="FontAwesome" active name="search" /> {" "} Restaurant</Text>
          </Body>
        </CardItem>
      </Card>
    )

    const HomePage = !this.state.FocusedSearching ? (
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
                    autoFocus
                    onSubmitEditing={this.handleTitleInputSubmit}
                    placeholder="Cari restoran, cafe, meeting atau keyword lainnya"
                    onChangeText={(text) => this.startTyping(text)}
                  />
                  <Icon type="FontAwesome" active name="search" />
                </Item>
                
                {searchResult}
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
