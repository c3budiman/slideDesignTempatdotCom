import React, { Component } from 'react';
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
import { sliderWidth, itemWidth } from '../Styles/SliderEntry.style';
import SliderEntry from '../Components/Widgets/Carousel/SliderEntry';
import styles from '../Styles/index.style.js';
import { DEALS, POPULARPLACE } from '../Static/entries';
import { Button, Icon } from 'native-base';
import styles2 from '../Styles/Search.style';
import { Item, Input, Content, Left, Thumbnail, Card, CardItem, Body } from 'native-base';
import { Base_url, Client_id, Client_secret } from '../env';
import AsyncStorage from '@react-native-community/async-storage';

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

  _renderItem({ item, index }) {
    return <SliderEntry data={item} />;
  }

  _renderSlider(data, header) {
    return (
      <View style={[styles.sliderContainer, this.state.FocusedSearching ? { opacity: 0.5 } : { opacity: 1 }]}>
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
      searchResult: null,
      mappedSearchResult: null,
      keyword: '',
    });
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
            'https://tempat.com' +
            '/api/autocomplete/merchant?areaId=7&areaClass=provinsi&query=' +
            keyword,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
            },
          )
            .then(response => response.json())
            .then(json => {
              if (json.error) {
                alert(json.error);
              } else {
                console.log(json.data)
                if (json.status) {
                  //this._renderSearchResult(json.data)
                  this.setState({ searchResult: json.data });
                  this.mapSearchResult();
                  console.log(this.state.searchResult);
                } else {
                  //Alert.alert('Error!', 'idk what just error.');
                  //console.error(error);
                  console.log(error);
                }
              }
            })
            .catch(error => {
              //Alert.alert('Error!', 'idk what just error.');
              //console.error(error);
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
    if (returntype == "branch_name") {
      return split[0];
    } else {
      return split[1];
    }
  }

  processImage(data) {
    if (data) {
      return data;
    } else {
      return "https://tempat.com/img/activities/restaurant.png";
    }
  }

  mapSearchResult() {
    if (this.state.searchResult.length > 0) {
      console.log(this.state.searchResult.length)
      let mappedSearchResult = this.state.searchResult.map(pic => {
        return (
          <TouchableOpacity
            key={pic['id']}
            activeOpacity={1}
            style={styles2.ItemTouchable}
            onPress={() => {
              alert(`Clicked on product : ` + pic['name']);
              this.props.navigation.navigate('Details', {
                slug: pic['slug'],
              })
              this.notSearching()
            }}
          >
            <CardItem bordered>
              <Left>
                <Thumbnail source={{ uri: this.processImage(pic['img']) }} />
                <Body>
                  <Text style>{this.namesplit(pic['name'], 'branch_name')}</Text>
                  <Text note>{pic['activity']['name']} - {pic['place']}</Text>
                </Body>
              </Left>
            </CardItem>
          </TouchableOpacity>
        );
      });
      this.setState({ mappedSearchResult: mappedSearchResult });
    } else {
      let mappedSearchResult = (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slideInnerContainer}
        >

          <CardItem bordered>
            <Left>
              <Thumbnail source={{ uri: "https://tempat.com/img/activities/restaurant.png" }} />
              <Body>
                <Text style>Not Found</Text>
              </Body>
            </Left>
          </CardItem>
        </TouchableOpacity>
      )

      this.setState({ mappedSearchResult: mappedSearchResult });
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
          source={{ uri: 'https://tempat.com/img/Home.png' }}
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
            source={{ uri: 'https://tempat.com/img/Home.png' }}
            style={styles2.image}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.FocusedSearching}
            presentationStyle='overFullScreen'
            onRequestClose={() => {
              this.notSearching()
            }}
          >
            <ScrollView>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => {
                  this.notSearching()
                }}>
                <View style={styles2.containerItemInsideImage2}>
                  <View style={styles2.ContainerTextBox}>
                    <Item style={styles2.searchTextBox}>
                      <Input
                        ref={c => (this._input = c)}
                        style={styles2.textBox}
                        onFocus={() => this.startSearching()}
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

              </TouchableOpacity>

            </ScrollView>


          </Modal>

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
              source={{ uri: "https://tempat.com/img/activities/restaurant.png" }}
            />

            {this._renderSlider(DEALS, `Deals of the Day`)}

            {this._renderSlider(POPULARPLACE, `Popular Place in Jakarta`)}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
