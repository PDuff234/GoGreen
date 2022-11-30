import { StyleSheet, View, StatusBar, Platform, SafeAreaView } from 'react-native';

import { recycleGreen } from '../styles/constants';

const StatusBarContent = ({ backgroundColor }) => {
  return(
    <View style={[styles.statusBar]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} barStyle="light-content"/>
      </SafeAreaView>
    </View>
  )
}

const CustomStatusBar = () => {
  return (
      <StatusBarContent backgroundColor={recycleGreen}/>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: recycleGreen,
    height: STATUSBAR_HEIGHT,
  },
});

export default CustomStatusBar;