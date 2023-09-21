import React, { useState, useEffect } from 'react'
import { Course } from '../../../../api'

const coursesController = new Course();

export const ListCourses = () => {
  const [courses, setCourses] = useState(false)

  useEffect(() => {
    ( async () =>{
      try{
        const response = await coursesController.getCourses();
        setCourses(response.payload.docs)
        console.log('course -->',courses);
      } catch (error){
        console.error( error )
      }
    })()
  }, [])
  

  return (
    <>
      <h1>LIST COURSES DESDE COMPONENTES</h1>
    </>
  )
}
