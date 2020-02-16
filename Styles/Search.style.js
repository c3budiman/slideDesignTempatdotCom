import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from './index.style.js';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

//change width/height here :
const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

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
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',
  },
  containerItemInsideImage: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
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
  aktivitasCard : {
    backgroundColor: colors.background1,
  },
});
