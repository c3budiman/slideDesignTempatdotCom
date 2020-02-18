import React, {Component} from 'react';
import {Base_url, Client_id, Client_secret} from '../env';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, Image, TouchableOpacity} from 'react-native';

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

  render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Detail Screen</Text>
        </View>
      )
  }




}