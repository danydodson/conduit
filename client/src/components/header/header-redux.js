import React, { Fragment } from 'react'

import { Head } from './header-styles'
import { List } from './header-styles'
import { Item } from './header-styles'
import { Ruller } from './header-styles'
import { LnkTo } from './header-styles'
import { IcoLnk } from './header-styles'
import { Image } from './header-styles'
import { IcoImg } from './header-styles'

import Title from './title'
import Search from '../searchbox'
import Kebab from './icons/kabob-icon'
import Gear from './icons/gear-icon'
import Logout from './icons/arrow-icon'
import Pencil from './icons/pencil-icon'
import Heart from './icons/heart-icon'
import Archive from './icons/archive-icon'
import Magnifier from './icons/search-icon'

const Visitor = (
  <Fragment>
    <Item><LnkTo to="/login">{`Sign in`}</LnkTo></Item>
    <Item><LnkTo to="/register">{`Sign up`}</LnkTo></Item>
  </Fragment>
)

const IsAuth = props => {
  return (
    <List>
      <IcoLnk to='/'><Archive size='30px' title='Mediums' /></IcoLnk>
      <IcoLnk to='/editor'><Pencil size='30px' title='Upload' /></IcoLnk>
      <IcoLnk to='/'><Magnifier size='30px' title='Search' /></IcoLnk>
      <IcoLnk to='/@danydodson'><Heart size='30px' title='Show some love' /></IcoLnk>
      {
        props.currentUser ?
          (<IcoLnk to='/settings'><Gear size='30px' title='Settings' /></IcoLnk>) :
          (<IcoLnk to='/login'><Gear size='30px' title='Login' /></IcoLnk>)
      }
      <Item><LnkTo to="/">{`Mediums`}</LnkTo></Item>
      <Item><LnkTo to="/">{`Tags`}</LnkTo></Item>
      <Item><Kebab title='Droptions' size='20px' /></Item>
      <Ruller />
      {
        props.currentUser ? (
          <Fragment>
            <Item><LnkTo to='/editor'>{`Create`}</LnkTo></Item>
            <Item><Logout title='Logout' size='20px' onClick={props.onClickLogout} /></Item>
            <IcoImg>
              <LnkTo to={`/@${props.currentUser.username}`}>
                <Image
                  src={props.currentUser.image}
                  alt={props.currentUser.username} />
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
