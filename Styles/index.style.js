import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#eaeaea',
  background2: '#21D4FD',
  purple: '#7263c6',
  white: '#fff',
  realBlack: '#000',
  semiGray: '#f5f5f5',
  purpleBG: '#ebe2f5',
  transparent: 'rgba(0,0,0,0)',
  orange: '#ff8559',
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    flexDirection: 'column'
  },
  scrollview: {
    flex: 1,
  },
  sliderContainer: {
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingHorizontal: 10,
    //marginTop: 10,
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  seeMoreButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 5,
  },
  seeMoreButton: {},
  seeMoreButtonText: {
    fontSize: 15,
    color: colors.purple,
    lineHeight: 25,
    fontWeight: 'bold',
  },
  arrowRightIcon: {
    marginLeft: 10,
    fontSize: 15,
    color: colors.purple,
    lineHeight: 25,
  },
  slider: {
    marginTop: 0,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  stretch: {
    marginTop: '60%',
    width: 0,
    height: 0,
    resizeMode: 'stretch'
  }
});
