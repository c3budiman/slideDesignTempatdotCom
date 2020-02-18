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
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../Styles/SliderEntry.style';
import SliderEntry from '../Components/Widgets/Carousel/SliderEntry';
import styles from '../Styles/index.style.js';
import {DEALS, POPULARPLACE} from '../Static/entries';
import {Button, Icon} from 'native-base';
import styles2 from '../Styles/Search.style';
import {Item, Input, Content,Left,Thumbnail, Card, CardItem, Body} from 'native-base';
import {Base_url, Client_id, Client_secret} from '../env';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var cancel;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      searchResult: null,
      loading: true,
      FocusedSearching: false,
      Token: '',
      mappedSearchResult: null,
    };
    AsyncStorage.getItem('token', (error, result) => {
        if (result) {
            this.setState({
                Token: result
            });
        }
    });
  }

  fetchToken() {
    fetch(Base_url + '/api/v1/auth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: Client_id,
        client_secret: Client_secret,
      }),
    })
      .then(response => response.json())
      .then(json => {
        //this.setState({Token: json.access_token});
        AsyncStorage.setItem('token', json.access_token);
        console.log(this.state.Token);
      })
      .catch(error => {
        Alert.alert('Error!', 'idk what just error.');
        console.error(error);
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchToken();
  }

  _renderItem({item, index}) {
    return <SliderEntry data={item} />;
  }

  _renderSlider(data, header) {
    return (
      <View style={[styles.sliderContainer, this.state.FocusedSearching ? {opacity: 0.5} : {opacity: 1} ]}>
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
    // this.setState({
    //   //FocusedSearching: false,
    //   //searchResult: null,
    //   //mappedSearchResult: null,
    //   //keyword: '',
    // });
  }

  doSearching(keyword) {
    if (keyword.length > 1) {
      if (this.state.Token != '') {
        if (this.timeout) {
          console.log('canceled');
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          if (cancel != undefined) {
            cancel();
          }
          fetch(
            Base_url +
              '/api/v2/search?page=1&per_page=10&class=provinsi&idx=7&query=' +
              keyword,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.state.Token,
                'Content-Type': 'application/json',
              },
            },
          )
            .then(response => response.json())
            .then(json => {
              if (json.error) {
                alert(json.error);
              } else {
                if (json.status) {
                  //this._renderSearchResult(json.data)
                  this.setState({searchResult: json.data});
                  this.mapSearchResult();
                  console.log(this.state.searchResult);
                } else {
                  Alert.alert('Error!', 'idk what just error.');
                  console.error(error);
                  console.log(error);
                }
              }
            })
            .catch(error => {
              Alert.alert('Error!', 'idk what just error.');
              console.error(error);
              console.log(error);
            });
        }, 600);
      } else {
        this.fetchToken();
      }
    }
  }

  startTyping(text) {
    console.log(text);
    this.setState({
      keyword: text,
    });
    this.doSearching(text);
  }

  namesplit(data, returntype) {
    var split = data.split("-");
    if(returntype == "branch_name") {
      return split[0];
    } else {
      return split[1];
    }
  }

  processImage(data) {
    if(data) {
      return data['image_url_thumb'];
    } else {
      return "https://tempat.com/img/activities/restaurant.png";
    }
  }

  mapSearchResult() {
    if (this.state.searchResult.length > 0) {
      let mappedSearchResult = this.state.searchResult.map(pic => {
        return (
          <TouchableOpacity
              activeOpacity={1}
              style={styles2.ItemTouchable}
              onPress={() => {
                alert(`Clicked on product : ` + pic['_source']['branch_group_activity'][0]['activity_group']['group_name']);
              }}
              >
                <CardItem key={pic['_source']['id']} bordered>
                    <Left>
                        <Thumbnail source={{uri: this.processImage(pic['_source']['branch_images']) }} />
                        <Body>
                          <Text style>{this.namesplit(pic['_source']['branch_name'],'branch_name')}</Text>
                          <Text note>{pic['_source']['branch_group_activity'][0]['activity_group']['group_name']} - {this.namesplit(pic['_source']['branch_name'],'type')}</Text>
                        </Body>
                      </Left>
                </CardItem>
          </TouchableOpacity>
          );
      });
      this.setState({mappedSearchResult: mappedSearchResult});
    } else {
      let mappedSearchResult = (
        <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              >
              
              <CardItem bordered>
                  <Left>
                      <Thumbnail source={{uri: "https://tempat.com/img/activities/restaurant.png"}} />
                      <Body>
                        <Text style>Not Found</Text>
                      </Body>
                    </Left>
              </CardItem>
        </TouchableOpacity>
      )
      
      this.setState({mappedSearchResult: mappedSearchResult});
    }
  }

  render() {
    const searchResult = this.state.mappedSearchResult ? (
      <Card style={styles.containerCard}>
        <CardItem bordered style={styles2.aktivitasCard}>
          <Body>
            <Text>Merchant</Text>
          </Body>
        </CardItem>
        {this.state.mappedSearchResult}
      </Card>
    ) : (
      <Card>
        <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => {
                this.props.navigation.navigate('Details')
              }}>
          <CardItem style={styles2.aktivitasCard} bordered>
            <Body>
              <Text>Aktivitas</Text>
            </Body>
          </CardItem>
        </TouchableOpacity>
        <CardItem bordered>
          <Body>
            <Text>
              {' '}
              <Icon type="FontAwesome" active name="search" /> Daycation
            </Text>
          </Body>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>
              {' '}
              <Icon type="FontAwesome" active name="search" /> Restaurant
            </Text>
          </Body>
        </CardItem>
      </Card>
    );

    const SearchBar = !this.state.FocusedSearching ? (
      <View style={[styles2.imageContainer]}>
        <Image
          source={{uri: 'https://tempat.com/img/Home.png'}}
          style={styles2.image}
        />
        <View style={styles2.containerItemInsideImage}>
          <Text style={styles2.findDeal}>Cari deal terbaik di sekitar mu</Text>
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
    ) : (
      <View style={[styles2.imageContainer]}>
        <Image
          source={{uri: 'https://tempat.com/img/Home.png'}}
          style={styles2.image}
        />
        <View style={styles2.containerItemInsideImage2}>
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
                onChangeText={text => this.startTyping(text)}
              />
              <Icon type="FontAwesome" active name="search" />
            </Item>
            {/* Search Result here : */}
            <View style={styles2.tes}>{searchResult}</View>
            {/* Search Result here : */}
          </View>
        </View>
      </View>
    );

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

            {SearchBar}

            {/* For the categories later use, for now it is just an invisible padding : */}
            <Image
              style={styles.stretch}
              source={{uri : "https://tempat.com/img/activities/restaurant.png"}}
            />

            {this._renderSlider(DEALS, `Deals of the Day`)}

            {this._renderSlider(POPULARPLACE, `Popular Place in Jakarta`)}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
