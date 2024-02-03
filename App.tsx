import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomSheetView, {BottomSheetRefProps} from './bottom-sheet';
import ContentView from './ContentView';

const App = () => {
  const bottomSheet = useRef<BottomSheetRefProps>(null);
  return (
    <GestureHandlerRootView style={style.flexView}>
      <SafeAreaProvider>
        <View style={style.container}>
          <TouchableOpacity onPress={() => bottomSheet.current?.show()}>
            <Text style={style.title}>Show</Text>
          </TouchableOpacity>
          <BottomSheetView ref={bottomSheet}>
            <ContentView hide={() => bottomSheet.current?.hide()} />
          </BottomSheetView>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
  },
  flexView: {
    flex: 1,
  },
  sheetContent: {
    paddingHorizontal: 24,
  },
  titleView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 24,
  },
  buttonText: {
    color: 'red',
  },
});
export default App;
