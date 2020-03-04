import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, TouchableOpacity,ImageBackground,ScrollView } from 'react-native';
import { Container, Header, Content, Tab, Tabs, ScrollableTab, TabHeading,Icon,Left,Right,Body,Title,Thumbnail,CardItem  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles2 from '../../Styles/Search.style';

export default class tabOne extends Component {

  render() {
    const {
      data: {branch_name},
    } = this.props;

    return (
      <Container >
        <ImageBackground
          source={{ uri: 'https://tempat.com/img/Home.png' }}
          style={{
            alignSelf: 'center',
            height: 250,
            width: '100%',
            backgroundColor: '#fff'
          }}
          resizeMode="stretch"
        />
      <CardItem style={{marginTop:-250, backgroundColor: 'rgba(0,0,0,0)'}} >
          <Left>
            <Thumbnail source={{uri:'https://tempat.com/img/ic_happyhour.png'}} />
            <Body>
              <Text style={styles2.happyHour}>Happy Hours!</Text>
              <Text style={{color:'#fff'}} note>Booked 1003 times since yesterday</Text>
            </Body>
          </Left>
        </CardItem>
        <Tabs style={{marginLeft: '4%', marginRight: '4%',marginTop:10}}  tabBarBackgroundColor='#f5f5f5' tabBarUnderlineStyle = {{backgroundColor: '#7263c6'}} renderTabBar={()=> <ScrollableTab />}>
            <Tab style={{backgroundColor: '#f5f5f5', maxHeight:'98%'}} heading={ <TabHeading style={{backgroundColor: '#f5f5f5', color: '#000'}}><Text>Today {"\n"} 24-dec</Text></TabHeading>}>
              <ScrollView>
                <View style={{marginTop: 10,marginLeft: 10, marginRight: 10,flex:1, flexDirection: 'row'}}>
                  <View style={{backgroundColor:'#9d48cf', width: 60, height: 60, borderRadius:10,marginRight: '2%', borderColor:'rgb(254, 202, 255)', borderWidth:1}}>
                    <View style={{backgroundColor:'rgb(182, 92, 234)', width: '100%', borderRadius:10, height: 38, position: 'absolute'}}>
                      <Text style={styles2.percentageDisc}>30%</Text>
                    </View>
                    <Text note style={styles2.textScheduleHours}>15.00-18.00</Text>
                  </View>

                  <View style={{backgroundColor:'#e9ecef', width: 60, height: 60, borderRadius:10,marginRight: '2%', borderColor:'#d8d8e0', borderWidth:1}}>
                    <View style={{backgroundColor:'#fff', width: '100%', borderRadius:10, height: 38, position: 'absolute'}}>
                      <Text style={styles2.percentageDiscInact}>20%</Text>
                    </View>
                    <Text note style={styles2.textScheduleHoursInact}>15.00-18.00</Text>
                  </View>

                  <View style={{backgroundColor:'#e9ecef', width: 60, height: 60, borderRadius:10,marginRight: '2%', borderColor:'#d8d8e0', borderWidth:1}}>
                    <View style={{backgroundColor:'#fff', width: '100%', borderRadius:10, height: 38, position: 'absolute'}}>
                      <Text style={styles2.percentageDiscInact}>20%</Text>
                    </View>
                    <Text note style={styles2.textScheduleHoursInact}>15.00-18.00</Text>
                  </View>
                  <View style={{backgroundColor:'#e9ecef', width: 60, height: 60, borderRadius:10,marginRight: '2%', borderColor:'#d8d8e0', borderWidth:1}}>
                    <View style={{backgroundColor:'#fff', width: '100%', borderRadius:10, height: 38, position: 'absolute'}}>
                      <Text style={styles2.percentageDiscInact}>20%</Text>
                    </View>
                    <Text note style={styles2.textScheduleHoursInact}>15.00-18.00</Text>
                  </View>

                </View>
              </ScrollView>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: '#f5f5f5', color: '#000'}}><Text>Today {"\n"} 24-dec</Text></TabHeading>}>
              <Text> hp hour </Text>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: '#f5f5f5', color: '#000'}}><Text>Today {"\n"} 24-dec</Text></TabHeading>}>
              <Text> hp hour </Text>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: '#f5f5f5', color: '#000'}}><Text>Today {"\n"} 24-dec</Text></TabHeading>}>
              <Text> hp hour </Text>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: '#f5f5f5', color: '#000'}}><Text>Today {"\n"} 24-dec</Text></TabHeading>}>
              <Text> hp hour </Text>
            </Tab>

          </Tabs>
      </Container>

    );
  }
}
