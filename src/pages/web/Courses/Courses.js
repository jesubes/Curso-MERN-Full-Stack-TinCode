import React, {useState, useEffect} from 'react'
import {Course} from '../../../api'
import './Courses.scss';

const courseController = new Course()

export const Courses = () => {
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    (
      async() =>{
        try{
          const response = await courseController.getCourses();
          setCourses(response.payload.docs);
        } catch(error){
          console.error( error )
        }
      }
    )()
  }, [])
  return (
    <div>
      <h1>Estamos en Cliente COURSES </h1>
    </div>
  )
}
