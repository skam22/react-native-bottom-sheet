# react-native-bottom-sheet

A performant interactive bottom sheet

## Installation

```sh
git clone https://github.com/skam22/react-native-bottom-sheet.git

cd react-native-bottom-sheet

yarn

yarn example ios

yarn example android
```

## Usage

Check the example folder for a working implementation

```js
import BottomSheet, { BottomSheetType } from 'react-native-bottom-sheet';

const Screen = () => {
  const bottomSheetRef = React.useRef<BottomSheetType>(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapPoint={'90%'}                  // starting position of bottom sheet
        snapPoints={[0, '25%', '50%', '90%']}     // positions to snap to (number of pixels from top or % of screen height)
        headerComponent={Header}                  // opaque header that fades into view when sheet is open
        headerTransitionPoint={'20%'}             // position which to trigger header fading in
        bodyComponent={Body}                      // content of the BottomSheet itself
        contentContainerStyle={{flex: 1}}         // style applied to container of body
      >
        <View style={{flex: 1}}>
          ...screen content here
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

​

// ...
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
