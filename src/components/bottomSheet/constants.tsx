import type { ViewStyle } from 'react-native';

export const defaultContainerStyle: ViewStyle = {
  backgroundColor: 'rgb(33, 37, 43)',
  flexGrow: 1,
};

export const defaultGrabBarContainerStyle: ViewStyle = {
  paddingVertical: 10,
};
export const defaultGrabBarStyle: ViewStyle = {
  height: 5,
  width: '10%',
  borderRadius: 4,
  backgroundColor: 'rgb(172,178,192)',
  alignSelf: 'center',
};

export const defaultHeaderContainerStyle: ViewStyle = {
  backgroundColor: 'rgb(33, 37, 43)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
};
