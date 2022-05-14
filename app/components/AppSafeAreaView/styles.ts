import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

/**
 * Constants.statusBarHeight
 * sdk_gphone64_x86_64: 24
 * M2102K1C: 39
 * IOS device: 44
 */

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  }
})

export default styles
