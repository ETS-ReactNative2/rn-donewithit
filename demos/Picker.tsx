import React, { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'
import AppSafeAreaView from '../components/AppSafeAreaView'
import AppPicker from '../components/AppPicker'
import AppTextInput from '../components/AppTextInput'

/**
 * third-part component
 * 1.picker
 * - rn: https://github.com/react-native-picker/picker
 * - expo: https://docs.expo.dev/versions/v44.0.0/sdk/picker/
 *
 * 2.date-time-picker
 * - rn: https://github.com/react-native-datetimepicker/datetimepicker
 * - expo: https://docs.expo.dev/versions/v44.0.0/sdk/date-time-picker
 */

export default function App() {
  const categorys = useMemo(
    () => [
      {
        label: 'Furniture',
        value: 1
      },
      {
        label: 'Clothing',
        value: 2
      },
      {
        label: 'Cameras',
        value: 3
      }
    ],
    []
  )
  return (
    <AppSafeAreaView>
      <AppPicker
        style={styles.formItem}
        iconName="apps"
        placeholder="Category"
        options={categorys}
      />
      <AppTextInput
        style={styles.formItem}
        iconName="email"
        placeholder="Email"
      />
      <Text style={styles.formItem}>picker</Text>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  formItem: {
    margin: 20
  }
})