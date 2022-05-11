import React, { useEffect, useReducer } from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import AppIcon from '../AppIcon'
import * as ImagePicker from 'expo-image-picker'
import { requestMediaPermissions } from './askPermissions'
import { AppImageInputProps, ActionKind } from './types'
import { reducer } from './reducers'
import COLORS from '../../config/colors'
import CONSTS from './consts'
import styles from './styles'

function AppImageInput({
  onChange,
  onAddButtonPress,
  imgageUris = CONSTS.IMAGE_URIS,
  max = CONSTS.MAX_PHOTOS,
  addButtonBackgroundColor = COLORS.INPUT_BACKGROUND_COLOR,
  addButtonIconName = CONSTS.ADD_BUTTON_ICON_NAME,
  addButtonIconColor = CONSTS.ADD_BUTTON_ICON_COLOR,
  addButtonIconSize = CONSTS.ADD_BUTTON_ICON_SIZE
}: AppImageInputProps) {
  const customStyles = StyleSheet.create({
    addButton: {
      backgroundColor: addButtonBackgroundColor
    }
  })
  const [state, dispatch] = useReducer(reducer, {
    values: imgageUris
  })
  useEffect(() => {
    requestMediaPermissions()
  }, [])
  useEffect(() => {
    typeof onChange === 'function' && onChange(state.values)
  }, [state.values])
  const handleAddButtonPress = async () => {
    try {
      typeof onAddButtonPress === 'function' && onAddButtonPress()
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // default value
        quality: 0.5
      })
      if (!result.cancelled) {
        dispatch({ type: ActionKind.ADD, payload: result.uri })
      }
    } catch (error) {
      console.log('Error reading an image', error)
    }
  }
  const handleImagePress = (index: number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this image?', [
      {
        text: 'No',
        style: 'cancel' // ios
      },
      {
        text: 'Yes',
        onPress: () => dispatch({ type: ActionKind.REMOVE, payload: index })
      }
    ])
  }
  return (
    <View style={styles.container}>
      {state.values.map((value: string, index: number) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            onPress={() => {
              handleImagePress(index)
            }}
          >
            <Image
              style={[styles.box, styles.image]}
              source={{
                uri: value
              }}
            />
          </TouchableOpacity>
        )
      })}
      {state.values.length < max && (
        <TouchableOpacity activeOpacity={0.85} onPress={handleAddButtonPress}>
          <View style={[styles.box, styles.addButton, customStyles.addButton]}>
            <AppIcon
              color={addButtonIconColor}
              size={addButtonIconSize}
              name={addButtonIconName}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default AppImageInput