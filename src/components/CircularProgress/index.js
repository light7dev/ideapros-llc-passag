import React from "react"
import PropTypes from "prop-types"
import { View } from "react-native"
import Svg, { Path, Circle } from "react-native-svg"

import styles from "./styles"

const PADDING = 10
const PROGRESS_OFFSET = 0.05

/**
 * A circular progress bar built from react-native-svg
 * https://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands
 */
class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props)

    const { width, height } = props.size
    const { strokeWidth } = props
    const progress = this.validateProgress(props.progress)
    const angle = this.getAngleFromProgress(progress)
    const { x, y } = this.getArcFinalPoint(angle, width / 2)

    this.state = {
      // mx, my are starting points
      x: x + width / 2 + PADDING,
      y: y + height / 2 + PADDING,
      mx: width + PADDING,
      my: width / 2 + PADDING,
      radii: width / 2,
      width,
      height,
      center: { x: width / 2 + PADDING, y: height / 2 + PADDING },
      strokeWidth
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.progress !== this.props.progress) {
      const progress = this.validateProgress(this.props.progress)
      const angle = this.getAngleFromProgress(progress)
      const { x, y } = this.getArcFinalPoint(angle, this.state.radii)
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(prevState => ({
        x: x + prevState.center.x,
        y: y + prevState.center.y
      }))
    }
  }

  /**
   * Validates and returns the valid progress value
   *
   * @param {Number} progress
   * @returns {Number}
   */
  validateProgress = progress => {
    if (progress <= 0) return 0
    if (progress >= 100) return 100 - PROGRESS_OFFSET

    return progress - PROGRESS_OFFSET
  }

  /**
   * Converts the progress percentage to the progress angle.
   *
   * @param {Number} progress
   * @returns {Number}
   */
  getAngleFromProgress = progress => (360 * progress) / 100

  /**
   * Returns the arc point (x, y) after the curve is drawn.
   *
   * @param {Number} angle
   * @param {Number} radius
   * @returns {Number}
   */
  getArcFinalPoint = (angle, radius) => ({
    x: Math.cos((Math.PI / 180) * angle) * radius,
    y: Math.sin((Math.PI / 180) * angle) * radius
  })

  render() {
    const rotation = 0
    const isClockwise = 1 // 1 -> true & 0 -> false
    const { mx, my, radii, width, height, x, y } = this.state
    const isLargeArc = y < radii + PADDING ? 1 : 0
    const d = `M${mx} ${my} A${radii} ${radii} ${rotation} ${isLargeArc} ${isClockwise} ${x} ${y}`

    return (
      <View style={styles.mainContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.placeholderCircle}>
            <Svg height={height + PADDING * 2} width={width + PADDING * 2}>
              <Circle
                cx={this.state.center.x}
                cy={this.state.center.y}
                r={this.state.radii}
                fill="transparent"
                stroke="#eeeeee"
                strokeWidth={this.state.strokeWidth - 2}
              />
            </Svg>
          </View>
          <View style={styles.textHolder}>{this.props.children}</View>
          <Svg height={height + PADDING * 2} width={width + PADDING * 2}>
            <Path
              d={d} // {'M 100 50 A 50,50 0 0 1 150 100'} // M 100,50 A 50,50 0 1 0 140.45, 129.389
              fill="none"
              strokeWidth={this.state.strokeWidth}
              strokeLinecap="round"
              stroke={this.props.progressColor}
            />
          </Svg>
        </View>
      </View>
    )
  }
}

CircularProgressBar.defaultProps = {
  children: <View />,
  progressColor: "#4bbe83",
  size: { width: 200, height: 200 },
  strokeWidth: 8
}

CircularProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  progressColor: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
}

export default CircularProgressBar
