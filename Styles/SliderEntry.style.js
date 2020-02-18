import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from './index.style.js';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

//change width/height of slider here :
const slideHeight = viewportHeight * 0.6;
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
    position: 'relative',
    justifyContent: 'flex-start'
  },
  containerType: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative',
  },
  starIcon: {
    fontSize: 15,
    color: colors.white,
    lineHeight: 25,
  },
  textWhite: {color: colors.white, marginLeft: 5, lineHeight: 25},
  ratingBadge: {
    borderRadius: 0,
    borderTopRightRadius: 25,
    paddingRight: 10,
  },
  ratingBadgeInner: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexWrap: {
    flex: 1,
  },
  wrapRowWithSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  heartImage: {
    height: 20,
    width: 25,
    justifyContent: 'flex-end',
    marginTop: 15,
    marginRight: 15,
    resizeMode: 'stretch',
  },
  shadow: {
    //position: 'absolute',
    top: 20,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.realBlack,
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
    //position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: IS_IOS ? entryBorderRadius : 0,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  productContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderColor: colors.semiGray,
  },
  textContainer: {
    paddingHorizontal: 16,
  },
  bookContainer: {
    backgroundColor: colors.purpleBG,
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 48,
    borderColor: colors.realBlack,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  SvgHalfElips: {
    height: 54,
    //width: itemWidth - entryBorderRadius - 6.5,
    width: '100%',
    marginBottom: '-7%',
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  type: {
    marginTop: 6,
    color: '#000',
    fontSize: 12,
  },
  adv_type: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
  },
  bookedText: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'sans-serif',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  buttonWrapper: {
    borderColor: colors.realBlack,
    borderTopWidth: 0.5,
  },
  bookedTextCount: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: colors.orange,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
