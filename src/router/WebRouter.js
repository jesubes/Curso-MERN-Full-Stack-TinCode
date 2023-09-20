import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ClientLayout } from '../layouts'
import { Blog, Contact, Courses, Home, Post } from '../pages/web'


export const WebRouter = () => {
  const loadLayout = (Layout, Page) =>{
    return(
      <Layout>
        <Page />
      </Layout>
    )
  }

  return (
    <Routes>
      <Route path='/' element= {loadLayout(ClientLayout, Home)} />
      <Route path='/contact' element= {loadLayout(ClientLayout, Contact)} />
      <Route path='/courses' element= {loadLayout(ClientLayout, Courses)} />
      <Route path='/blog' element= {loadLayout(ClientLayout, Blog)} />
      <Route path='/blog/:path' element= {loadLayout(ClientLayout, Post)} />
    </Routes>   
  )
}
