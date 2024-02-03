/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Dimensions,
  Modal as RNModal,
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {Modal} from 'react-native-paper';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import style from './styles';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const ZERO = 0;
const SNAP_DIVIDER = 2;
const RADIUS = 25;
const END_RADIUS = 5;

type BottomSheetProps = {
  children?: React.ReactNode;
  initialHeight?: number;
  height?: number;
  adjustToContentHeight?: boolean;
  useReactModal?: boolean;
  backdropStyle?: ViewStyle;
  withoutBackdrop?: boolean;
  dismissOnBackdropClick?: boolean;
  disableSwipe?: boolean;
  backgroundColor?: string;
};

export type BottomSheetRefProps = {
  show: () => void;
  hide: () => void;
};

const Component = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (
    {
      children,
      initialHeight,
      adjustToContentHeight = false,
      height = SCREEN_HEIGHT,
      useReactModal = false,
      backdropStyle,
      withoutBackdrop = false,
      dismissOnBackdropClick = true,
      disableSwipe = false,
      backgroundColor = 'white',
    },
    ref,
  ) => {
    const safeArea = useSafeAreaInsets();
    const safeAreaTop =
      Platform.OS === 'ios' ? safeArea.top : StatusBar.currentHeight;

    const MAX_HEIGHT_Y = -(height - safeAreaTop!);
    const INPUT_RANGE = [MAX_HEIGHT_Y + safeAreaTop!, MAX_HEIGHT_Y];
    const OUTPUT_RANGE = [RADIUS, END_RADIUS];

    const styles = style({
      maxHeight: -MAX_HEIGHT_Y,
      adjustToContentHeight: adjustToContentHeight,
      height: height,
      screenHeight: SCREEN_HEIGHT,
      backgroundColor: backgroundColor,
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const translateY = useSharedValue(ZERO);
    const adjustHeight = useSharedValue<number | undefined>(ZERO);
    const context = useSharedValue({y: 0});

    const scrollToPosition = useCallback(
      (position: number, callback?: () => void) => {
        translateY.value = withTiming(position, undefined, callback);
      },
      [],
    );

    const hide = useCallback(() => {
      scrollToPosition(initialHeight ? -initialHeight : -MAX_HEIGHT_Y, () => {
        'worklet';
        runOnJS(setModalVisible)(false);
      });
    }, []);

    const show = useCallback(() => {
      if (adjustToContentHeight) {
        scrollToPosition(ZERO);
      } else {
        scrollToPosition(initialHeight ? -initialHeight : MAX_HEIGHT_Y);
      }
      setModalVisible(true);
    }, []);

    useImperativeHandle(ref, () => ({hide, show}), [hide, show]);
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        if (!disableSwipe) {
          if (
            (adjustToContentHeight && event.translationY > ZERO) ||
            !adjustToContentHeight
          ) {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, MAX_HEIGHT_Y);
          }
        }
      })
      .onEnd(() => {
        if (translateY.value > MAX_HEIGHT_Y / SNAP_DIVIDER) {
          if (
            (adjustToContentHeight && translateY.value > ZERO) ||
            !adjustToContentHeight
          ) {
            runOnJS(scrollToPosition)(
              initialHeight ? -initialHeight : -MAX_HEIGHT_Y,
            );
            runOnJS(setModalVisible)(false);
          }
        } else if (translateY.value < MAX_HEIGHT_Y / SNAP_DIVIDER) {
          runOnJS(scrollToPosition)(MAX_HEIGHT_Y);
        }
      });

    const rnBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        INPUT_RANGE,
        OUTPUT_RANGE,
        Extrapolation.CLAMP,
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });
    const adjustHeightStyle = useAnimatedStyle(() => ({
      opacity: adjustHeight.value,
    }));
    useEffect(() => {
      if (adjustToContentHeight) {
        translateY.value = -MAX_HEIGHT_Y;
        adjustHeight.value = 1;
      }
    }, []);

    const getSlideView = () => (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            rnBottomSheetStyle,
            adjustToContentHeight && adjustHeightStyle,
          ]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
    if (initialHeight || withoutBackdrop) {
      return <Fragment>{getSlideView()}</Fragment>;
    } else {
      const WrapperModal = useReactModal ? RNModal : Modal;
      return (
        <WrapperModal
          transparent
          contentContainerStyle={[styles.flexView, styles.whiteBg]}
          style={styles.whiteBg}
          visible={isModalVisible}
          onDismiss={() => dismissOnBackdropClick && hide()}>
          <TouchableWithoutFeedback
            onPress={() => dismissOnBackdropClick && hide()}
            style={[styles.backdrop, backdropStyle]}>
            {getSlideView()}
          </TouchableWithoutFeedback>
        </WrapperModal>
      );
    }
  },
);

export default Component;
