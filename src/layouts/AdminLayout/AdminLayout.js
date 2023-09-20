import React from 'react'
import './AdminLayout.scss'
import { Icon } from '../../assets';
import {AdminMenu, Logout } from '../../components/Admin/AdminLayout'

export const AdminLayout = (props) => {
  const { children } = props;

  return (
    <div className='admin-layout'>
      <div className='admin-layout__left'>
        <Icon.LogoWhite className='logo'/>
        <AdminMenu />
      </div>

      <div className='admin-layout__right'>
        <div className='admin-layout__right-header'>
          <Logout/>
        </div>
        <div className='admin-layout__right-content'>
          { children }
        </div>
      </div>
    </div>
  )
}
