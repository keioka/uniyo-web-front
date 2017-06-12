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

export default class SidebarRightHistoryDonuts extends Component {

  state = {
    type: 1,
    userSearchQuery: '',
  }

  get usersDonutsToGive() {
    const { allUsers, userSearch, channelCreate, allChannels } = this.props
    const filteredUsers = allUsers && this.state.userSearchQuery !== '' ? allUsers.filter(user => user.name.toLowerCase().includes(this.state.userSearchQuery)) : allUsers
    return filteredUsers.map(user =>
      <ListUserDonutGive
        {...user}
        channelCreate={channelCreate}
        channels={allChannels}
      />
    )
  }

  render() {
     const { donutsHistory, allUsers, userSearch, channelCreate, allChannels, currentUser } = this.props
     const classNamesFirstTab = this.props.rightbar.donutsHistoryTabNumber === 0 ? [headerNav, headerNavActive] : [headerNav]
     const classNamesSecondTab = this.props.rightbar.donutsHistoryTabNumber === 1 ? [headerNav, headerNavActive] : [headerNav]

     return (
       <div className={wrapper} >
         <div className={header}>
           <span className={classNamesFirstTab.join(' ')} data-count={currentUser.availableDonutsCount} onClick={() => this.props.showHistoryDonut(0)}>Donuts to give</span>
           <span className={classNamesSecondTab.join(' ')} data-count={currentUser.receivedDonutsCount} onClick={() => this.props.showHistoryDonut(1)}>Donuts receive</span>
         </div>

         {this.props.rightbar.donutsHistoryTabNumber === 0 ?
           (<ul className={ul}>
             <div className={inputSearchWrapper}>
               <FaSearch />
               <input
                 type="text"
                 className={inputSearch}
                 placeholder="Search in your campus"
                 onChange={event => { this.setState({ userSearchQuery: event.target.value }); userSearch({ query: event.target.value }) }}
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
             {this.usersDonutsToGive}

           </ul>) :
           (<ul className={ul}>
             {donutsHistory && donutsHistory.map(history => <ListDonutsReceive {...history} />)}
           </ul>)
          }
       </div>
     )
  }
}
