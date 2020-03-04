import React, { Component } from 'react';
import { Base_url, Client_id, Client_secret } from '../env';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, TouchableOpacity,ImageBackground,ScrollView } from 'react-native';
import { Container, Header, Content, Tab, Tabs, ScrollableTab, TabHeading, Footer, FooterTab, Button, Left, Right, Body, Title, Subtitle  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Tab1 from '../Components/Tabs/tabOne';
import Tab2 from '../Components/Tabs/tabTwo';
import Tab3 from '../Components/Tabs/tabThree';
import styles2 from '../Styles/Search.style';


export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: '',
      loading: true,
      Token: '',
      Details: null,
      mappedDetails: null,
    };
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        this.setState({
          Token: result
        });
      }
    });

  }

  componentDidMount() {
    //console.log(this.state.slug)
    // if (this.props.route.params.slug) {
    //   this.fetchDetailPages(this.props.route.params.slug)
    //   this.setState({
    //     slug: this.props.route.params.slug
    //   });
    // } else {
    //   this.fetchDetailPages('dante-coffee-slipi')
    // }
    this.fetchDetailPages('dante-coffee-slipi')
  }

  namesplit(data, returntype) {
    var split = data.split("/");
    if (returntype == "slug") {
      return split[1];
    } else {
      return split[0];
    }
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
        //console.log(this.state.Token);
        this.fetchDetailPages(this.state.slug)
      })
      .catch(error => {
        //Alert.alert('Error!', 'idk what just error.');
        //.error(error);
        console.log(error);
      });
  }

  fetchDetailPages() {
    //console.log(this.namesplit(slug,'slug'))
    if(this.state.Token != '') {
      //console.log(Base_url + '/api/v2/branch/' + this.namesplit(slug,'slug'))
      //fetch(Base_url + '/api/v2/branch/' + this.namesplit(slug,'slug'), {
      fetch(Base_url + '/api/v2/branch/' + 'dante-coffee-slipi', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.state.Token,
        },
      })
        .then(response => response.json())
        .then(json => {
          console.log(json.data)
          //this.setState({Token: json.access_token});
          if(json.status) {
            this.setState({
              Details : json.data,
              loading : false,
            })

          }
        })
        .catch(error => {
          //Alert.alert('Error!', 'idk what just error.');
          //console.error(error);
          console.log(error);
        });
    } else {
      this.fetchToken()
    }

  }


  render() {
    //console.log(this.props.route.params)

    return (
      <Container>
        <Header hasTabs>
          <Left />
          <Body>
            <Title>detail page...</Title>
            <Subtitle>...</Subtitle>
          </Body>
          <Right />
        </Header>
        <ScrollView>

          <Tabs  tabBarPosition='top' tabBarBackgroundColor='#fff' tabBarUnderlineStyle = {{backgroundColor: '#7263c6'}} renderTabBar={()=> <ScrollableTab />}>
            <Tab tabStyle={{backgroundColor: '#fff'}} activeTabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTextStyle={{color: '#7263c6'}} heading="Happy Hours">
              {this.state.loading ? <Text> Loading... </Text> : <Tab1 data={this.state.Details} />}
            </Tab>
            <Tab tabStyle={{backgroundColor: '#fff'}} activeTabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTextStyle={{color: '#7263c6'}} heading="About">
              <Tab2 />
            </Tab>
            <Tab tabStyle={{backgroundColor: '#fff'}} activeTabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTextStyle={{color: '#7263c6'}} heading="Menu">
              <Tab3 />
            </Tab>
            <Tab tabStyle={{backgroundColor: '#fff'}} activeTabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTextStyle={{color: '#7263c6'}} heading="Reviews">
              {this.state.loading ? <Text> Loading... </Text> : <Tab1 data={this.state.Details} />}
            </Tab>
          </Tabs>

        </ScrollView>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }




}
