import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#eaeaea',
  background2: '#21D4FD',
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    marginTop: 30,
  },
  exampleContainerDark: {
    backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 25,
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
    color: '#7263c6',
    lineHeight: 25,
    fontWeight: 'bold',
  },
  arrowRightIcon: {
    marginLeft: 10,
    fontSize: 15,
    color: '#7263c6',
    lineHeight: 25,
  },
  titleDark: {
    color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
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
});
