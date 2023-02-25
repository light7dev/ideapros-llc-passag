import React from 'react'
import { View } from 'native-base'

// styles
import Text from '../Text'
import styles from './styles'
import { Layout, Fonts, Gutters } from 'src/theme'

const Title = ({ text, subText, title, color = 'primary' }) => {

  const { mediumLPadding } = Gutters;
  const { titleLarge, titleSmall } = Fonts;
  const { center, justifyContentCenter } = Layout;

  return (
    <View style={[subText || title ? [mediumLPadding, justifyContentCenter] : center, styles.header]}>
      {subText && <Text text={subText} color={color} />}
      {text && <Text text={text} style={titleLarge} color={color} />}
      {title && <Text text={title} style={titleSmall} color={color} />}
    </View>
  )
}

export default Title
