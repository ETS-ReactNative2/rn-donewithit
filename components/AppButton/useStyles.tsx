import React, { useMemo } from 'react'
import { StyleSheet, Platform } from 'react-native'
import CONSTS from './consts'
import COLORS from '../../config/colors'
import { useStylesProps } from './types'

function useStyles({
  height = CONSTS.BUTTON_HEIGHT,
  fontSize = CONSTS.FONT_SIZE,
  backgroundColor = CONSTS.BACKGROUND_COLOR,
  borderRadius = CONSTS.BUTTON_BORDER_RADIUS
}: useStylesProps) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        buttonBox: {
          ...Platform.select({
            android: {
              borderRadius,
              overflow: 'hidden'
            }
          })
        },
        button: {
          height,
          borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor
        },
        text: {
          fontSize,
          fontWeight: 'bold',
          color: COLORS.WHITE,
          textTransform: 'uppercase'
        }
      }),
    []
  )

  return styles
}

export default useStyles
