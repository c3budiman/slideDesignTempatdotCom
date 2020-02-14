import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from './index.style.js';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

//change width/height of slider here :
const slideHeight = viewportHeight * 0.5;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  containerType: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
  },
  starIcon: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 25,
  },
  textWhite: {color: '#fff', marginLeft: 5, lineHeight: 25},
  ratingBadge: {
    borderRadius: 0,
    borderTopRightRadius: 25,
    paddingRight: 10,
  },
  ratingBadgeInner: {marginTop: 10, marginLeft: 10},
  wrapRow: {flexDirection: 'row', flexWrap: 'wrap'},
  heartImage: {height: 19, width: 21, marginLeft: 220, marginTop: 10},
  shadow: {
    position: 'absolute',
    top: 20,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 20,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: IS_IOS ? entryBorderRadius : 0,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderColor: '#f5f5f5',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  bookContainer: {
    backgroundColor: '#cec9e6',
    paddingTop:20 - entryBorderRadius,
    paddingBottom:30,
  },
  SvgHalfElips: {
    height:30,
    width:itemWidth-entryBorderRadius-10,
    marginLeft: -16,
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleEven: {
    color: 'white',
  },
  type: {
    marginTop: 6,
    color: '#000',
    fontSize: 12,
  },
  adv_type: {
    marginTop: 6,
    color: '#808080',
    fontSize: 12,
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
