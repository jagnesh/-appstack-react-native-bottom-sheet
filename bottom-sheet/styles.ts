import {DimensionValue, StyleSheet} from 'react-native';

interface Props {
  maxHeight?: DimensionValue;
  height?: DimensionValue;
  adjustToContentHeight?: boolean;
  screenHeight?: DimensionValue;
  backgroundColor: string;
}

const styles = ({
  maxHeight,
  adjustToContentHeight,
  height,
  screenHeight,
  backgroundColor,
}: Props) =>
  StyleSheet.create({
    bottomSheetContainer: {
      maxHeight: maxHeight,
      minHeight: 0,
      height: adjustToContentHeight ? undefined : height,
      width: '100%',
      backgroundColor: backgroundColor,
      borderRadius: 25,
      position: 'absolute',
      top: adjustToContentHeight ? undefined : screenHeight,
      bottom: 0,
    },
    line: {
      width: 75,
      height: 4,
      backgroundColor: 'grey',
      alignSelf: 'center',
      marginVertical: 15,
      borderRadius: 2,
    },
    backdrop: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      height: '100%',
    },
    flexView: {
      flex: 1,
    },
    whiteBg: {
      backgroundColor: 'white',
    },
  });

export default styles;
