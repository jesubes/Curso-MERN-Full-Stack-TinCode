import React from 'react'
import {Container, Icon} from 'semantic-ui-react'
import {map} from 'lodash' 
import {itemsData} from './HowMyCoursesWork.data.js'
import './HowMyCoursesWork.scss'


export const HowMyCoursesWork = () => {
  return (
    <Container className='how-my-courses-work'>
      <h1>Cómo funcionan los Cursos?</h1>
      <h4>Cada curso cuenta con contenido multimedia, activa los 24horas del día, los 365 del año</h4>

      <div className='how-my-courses-work__items'>
        {map(itemsData, (item, index) =>(
          <div key={index}>
            <div>
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
