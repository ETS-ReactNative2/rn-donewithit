import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import {
  Animated,
  GestureResponderEvent,
  ImageSourcePropType,
  StyleSheet
} from 'react-native'
import AppSafeAreaView from '../components/AppSafeAreaView'
import {
  AppFlatList,
  AppListItemDeleteAction,
  AppListItem
} from '../components/lists'
import produce from 'immer'
import { LONG_TEXT } from '../config/texts'

type Message = {
  id: number
  title: string
  description: string
  image: ImageSourcePropType
}

const messages: Message[] = [
  {
    id: 1,
    title: LONG_TEXT,
    description: LONG_TEXT,
    image: require('../assets/materials/mosh.jpg')
  },
  {
    id: 2,
    title: 'T2',
    description: 'D2',
    image: require('../assets/materials/mosh.jpg')
  },
  {
    id: 3,
    title: 'T3',
    description: 'D3',
    image: require('../assets/materials/mosh.jpg')
  }
]

const styles = StyleSheet.create({
  item: {
    padding: 20
  }
})

export default function App() {
  let [msgs, setMsgs] = useState<Message[]>(messages)
  const handlePress = useCallback(
    (e?: GestureResponderEvent, data?: Message) => {},
    []
  )
  const handleRenderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation,
      item: Message
    ): ReactNode => {
      return (
        <AppListItemDeleteAction
          onDelete={() => {
            handleDelete(item.id)
          }}
        />
      )
    },
    []
  )
  const handleDelete = useCallback((id: number) => {
    const deletedMsgs: Message[] = produce(msgs, (draft) => {
      const index = draft.findIndex((msg: Message) => msg.id === id)
      if (index !== -1) draft.splice(index, 1)
    })
    msgs = deletedMsgs // 解决获取 msgs 参数不准问题
    setMsgs(deletedMsgs)
  }, [])
  return (
    <AppSafeAreaView>
      <AppFlatList
        data={msgs}
        keyExtractor={(msg) => msg.id.toString()}
        renderItem={({ item, index, separators }) => {
          const { title, description, image }: Message = item
          return (
            <AppListItem
              style={styles.item}
              title={title}
              subTitle={description}
              image={image}
              titleMaxLines={1}
              subTitleMaxLines={5}
              onPress={(e) => {
                handlePress(e, item)
              }}
              renderRightActions={(
                progress: Animated.AnimatedInterpolation,
                dragX: Animated.AnimatedInterpolation
              ) => {
                return handleRenderRightActions(progress, dragX, item)
              }}
            />
          )
        }}
      />
    </AppSafeAreaView>
  )
}
