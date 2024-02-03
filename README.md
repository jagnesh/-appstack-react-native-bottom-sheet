# React Native Bottom Sheet View

A versatile and customizable React Native Bottom Sheet View component that provides a smooth sliding interface for presenting content from the bottom of the screen. This package seamlessly integrates with React Native applications, offering easy-to-use functionalities for creating interactive and dynamic bottom sheets.

## Installation

```bash
npm install appstack-rn-bottom-sheet
```

```bash
yarn add appstack-rn-bottom-sheet
```

## Usage

```javascript
import BottomSheetView, { BottomSheetRefProps } from 'appstack-rn-bottom-sheet';

// ...

const MyComponent = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.show();
  };

  const hideBottomSheet = () => {
    bottomSheetRef.current?.hide();
  };

  return (
    <View>
      {/* Your main content */}
      <Button title="Show Bottom Sheet" onPress={showBottomSheet} />

      {/* Bottom Sheet */}
      <BottomSheetView ref={bottomSheetRef}>
        {/* Content to be displayed in the bottom sheet */}
        <Text>Your bottom sheet content goes here</Text>
        {/* ... */}
      </BottomSheetView>
    </View>
  );
};
```

## Props

- `children`: React node to be rendered within the bottom sheet.
- `initialHeight`: Initial height of the bottom sheet when closed.
- `height`: Height of the bottom sheet when fully opened.
- `adjustToContentHeight`: Adjust the height of the bottom sheet based on its content.
- `useReactModal`: Use React Native Modal instead of Paper Modal from `react-native-paper`.
- `backdropStyle`: Style for the backdrop behind the bottom sheet.
- `withoutBackdrop`: If true, the bottom sheet will not have a backdrop.
- `dismissOnBackdropClick`: Dismiss the bottom sheet on backdrop click.
- `disableSwipe`: Disable swipe gestures to interact with the bottom sheet.
- `backgroundColor`: Background color of the bottom sheet.

## Features

- Smooth sliding animations
- Adjustable height and appearance
- Customizable backdrop and styling
- Support for React Native Modal or Paper Modal

Explore the flexibility of this React Native Bottom Sheet View to enhance your app's user experience by seamlessly integrating dynamic content presentations.
