import React from 'react'
import settingsIcon from '../assets/svgs/settings.svg'
import '../styles/components/settings.scss'

const settings = () => {
  return (
    <div className='settings'>
      <img src={settingsIcon} alt="" />
      <div className="card settings-items">
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Log out</li>
        </ul>
      </div>
    </div>
  )
}

export default settings