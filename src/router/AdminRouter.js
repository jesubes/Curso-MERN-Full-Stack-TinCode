import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../layouts'
import { Auth, Users, Blog, Courses, Menu, Newsletter } from '../pages/admin'
import { useAuth } from '../hooks'


export const AdminRouter = () => {

  const { user } = useAuth(); //destructori para sacar user

  const loadLayout = ( Layout, Page ) =>{
    return(
      <Layout>
        <Page />
      </Layout>
    )
  }


  return (
    <Routes>
      { !user ? (
        <Route path='/admin/*' element={<Auth/>}/>
      ) : (
        <>
          {["/admin","/admin/blog"].map((path) => (
            <Route 
              key={path}
              path={path}
              element={ loadLayout( AdminLayout, Blog )}
            />
          ))}
          <Route path='/admin/users' element={loadLayout(AdminLayout, Users )}/>
          <Route path='/admin/courses' element={loadLayout(AdminLayout, Courses )}/>
          <Route path='/admin/menu' element={loadLayout(AdminLayout, Menu )}/>
          <Route path='/admin/newsletter' element={loadLayout(AdminLayout, Newsletter )}/>
          
        </>
      )}
    </Routes>
  )
}
