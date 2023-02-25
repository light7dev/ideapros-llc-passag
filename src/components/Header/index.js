import React from 'react'

// components
import { SafeAreaView } from 'react-native'
import { Title, View } from 'native-base'

// styles
import { Layout } from 'src/theme'
import styles from './styles'

const Header = ({
  title,
  left,
  right,
  content,
  color,
  large,
  body,
  rounded,
  shadow,
}) => {
  const {
    header,
    roundedBg,
    largeHeader,
    leftStyle,
    bodyStyle,
    titleText,
    rightStyle,
    roundedCorner,
  } = styles
  const { justifyContentCenter } = Layout

  return (
    <SafeAreaView style={styles[color]}>
      <View style={[rounded && roundedBg]}>
        <View
          style={[
            header,
            large && largeHeader,
            rounded && roundedCorner,
            styles[color],
          ]}
        >
          <View style={leftStyle}>{left}</View>
          {content ? (
            content
          ) : body ? (
            body
          ) : (
                <View style={[bodyStyle, justifyContentCenter]}>
                  <Title style={[titleText, styles[`${color}Text`]]}>{title}</Title>
                </View>
              )}
          {!body && <View style={rightStyle}>{right}</View>}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header
