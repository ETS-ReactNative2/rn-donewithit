import {
  Animated,
  GestureResponderEvent,
  ImageSourcePropType,
  StyleProp,
  ViewStyle
} from 'react-native'

export type AppListItemProps = {
  title: string
  subTitle?: string
  titleMaxLines?: number
  subTitleMaxLines?: number
  image: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  onPress?: (e?: GestureResponderEvent) => void
  renderRightActions?: (
    progressAnimatedValue: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation
  ) => React.ReactNode
}
