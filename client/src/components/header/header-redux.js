import React, { Fragment } from 'react'

import { Head } from './styles/header-styles'
import { List } from './styles/header-styles'
import { Item } from './styles/header-styles'
import { Ruller } from './styles/header-styles'
import { LnkTo } from './styles/header-styles'
import { IcoLink } from './styles/header-styles'
import { Image } from './styles/header-styles'
import { IcoImg } from './styles/header-styles'

import Title from './title'
import Search from '../searchbar'

import Kebab from './styles/kabob-icon'
import Gear from './styles/gear-icon'
import Logout from './styles/arrow-icon'
import Pencil from './styles/pencil-icon'
import Heart from './styles/heart-icon'
import Archive from './styles/archive-icon'
import Magnifier from './styles/search-icon'

const Visitor = (
  <Fragment>
    <Item><LnkTo to="/login">{`Sign in`}</LnkTo></Item>
    <Item><LnkTo to="/register">{`Sign up`}</LnkTo></Item>
  </Fragment>
)

const IsAuth = props => {
  return (
    <List>
      <IcoLink to='/'><Archive size='30px' title='Mediums' /></IcoLink>
      <IcoLink to='/editor'><Pencil size='30px' title='Upload' /></IcoLink>
      <IcoLink to='/'><Magnifier size='30px' title='Search' /></IcoLink>
      <IcoLink to='/@danydodson'><Heart size='30px' title='Show some love' /></IcoLink>
      {
        props.currentUser
          ?
          (<IcoLink to='/settings'><Gear size='30px' title='Settings' /></IcoLink>) :
          (<IcoLink to='/login'><Gear size='30px' title='Login' /></IcoLink>)
      }
      <Item><LnkTo to="/">{`Mediums`}</LnkTo></Item>
      <Item><LnkTo to="/">{`Tags`}</LnkTo></Item>
      <Item><Kebab title='Droptions' size='20px' /></Item>
      <Ruller />
      {
        props.currentUser
          ?
          (<Fragment>
            <Item><LnkTo to='/editor'>{`Create`}</LnkTo></Item>
            <Item><Logout title='Logout' size='20px' onClick={props.onClickLogout} /></Item>
            <IcoImg>
              <LnkTo to={`/@${props.currentUser.username}`}>
                <Image src={props.currentUser.image} alt={props.currentUser.username} />
              </LnkTo>
            </IcoImg>
          </Fragment>
          ) : Visitor
      }
    </List>
  )
}

class Header extends React.Component {
  render() {
    return (
      <Head>
        <Title appName={this.props.appName} />
        <Search />
        <IsAuth
          currentUser={this.props.currentUser}
          onClickLogout={this.props.onClickLogout} />
      </Head>
    )
  }
}

export default Header
// export default connect(mapStateToProps, mapDispatchToProps)(Home)