import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProfileItem extends Component {

  render() {

    const { profile } = this.props

    return (
      <section style={{padding: '20px' }}>
        <Link to={`/profile/handle/${profile.handle}`}>
          <img
            width='100px'
            height='100px'
            src={profile.src}
            alt={profile.src}
          />
        </Link>

      </section>
    )
  }
}

export default ProfileItem
