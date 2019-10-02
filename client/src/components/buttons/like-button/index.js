import React, { Component } from "react"
import { GoHeart } from "react-icons/go"

class LikeButton extends Component {

  handleFavorite = () => {
    this.setState({
      isOpen: true
    });
  }

  renderButton = () => {

    const { buttonColor, buttonText } = this.props
    const propsToPass = Object.assign({}, this.props)

    delete propsToPass.buttonColor
    delete propsToPass.buttonText

    return (
      <button
        color={buttonColor}
        onClick={this.handleFavorite}
        {...propsToPass}>
        {buttonText}
        {GoHeart}
      </button>
    )
  }

  render() {
    return this.renderButton()
  }
}

export default LikeButton
