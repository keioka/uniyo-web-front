import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FaSearch from 'react-icons/lib/fa/search'
import {
  wrapper,
  header,
  headerNav,
  headerNavActive,
  ul,
  inputSearch,
  inputSearchWrapper,
  listUserInvite,
  listUserInviteLeft,
  listUserInviteRight,
  listUserInviteLeftImg,
  listUserInviteLeftText,
  listUserInviteLeftTitle,
  listUserInviteLeftSubtitle,
} from './style'

import {
  ListDonutsReceive,
  ListUserDonutGive,
  ButtonDonut,
} from '../../'

export default class SidebarRightHisotryDonuts extends Component {

  state = {
    type: 1,
  }

  render() {
     const { donutsHistory, allUsers, userSearch } = this.props
     const classNameFirstTab = this.state.type === 0 ? headerNavActive : headerNav
     const classNameSecondTab = this.state.type === 1 ? headerNavActive : headerNav

     return (
       <div className={wrapper} >
         <div className={header}>
           <span className={classNameFirstTab} onClick={() => this.setState({ type: 0 })}>Donuts to give (2)</span>
           <span className={classNameSecondTab} onClick={() => this.setState({ type: 1 })}>Donuts receive (2)</span>
         </div>

         {this.state.type === 0 ?
           (<ul className={ul}>
             <div className={inputSearchWrapper}>
               <FaSearch />
               <input
                 type="text"
                 className={inputSearch}
                 placeholder="Search in your campus"
                 onChange={event => userSearch({ query: event.target.value })}
               />
             </div>
             <div className={listUserInvite}>
               <div className={listUserInviteLeft}>
                 <div className={listUserInviteLeftImg}></div>
                 <div className={listUserInviteLeftText}>
                   <span className={listUserInviteLeftTitle}>Invite Friend</span>
                   <span className={listUserInviteLeftSubtitle}>With a donut</span>
                 </div>
               </div>
               <span className={listUserInviteRight}><ButtonDonut donutsCount={0}/></span>
             </div>
             {allUsers && allUsers.map(user => <ListUserDonutGive {...user} />)}
           </ul>) :
           (<ul className={ul}>
             {donutsHistory && donutsHistory.map(history => <ListDonutsReceive {...history} />)}
           </ul>)
          }
       </div>
     )
  }
}
