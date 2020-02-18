import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from './index.style.js';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

//change width/height here :
const slideHeight = viewportHeight * 0.3;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const marginBottom = wp(40);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: colors.background1,
    width: '100%',
    height: slideHeight,
    position: 'absolute',
    zIndex: 99,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',
  },
  containerItemInsideImage: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: '20%',
    //justifyContent: 'center',
  },
  containerItemInsideImage2: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: '2%',
    //justifyContent: 'center',
  },
  findDeal: {
    backgroundColor: 'transparent',
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -20,
  },
  ContainerTextBox: {
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
  },
  searchTextBox: {
    backgroundColor: colors.white,
    marginTop: 20,
  },
  searchTextBoxFocused: {
    backgroundColor: colors.white,
  },
  textBox: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  aktivitasCard: {
    backgroundColor: colors.background1,
  },
  ContainerCardItemRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ContainerCardItemColumn: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  ItemTouchable: {
    zIndex: 999,
    //position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
  }
  
});
