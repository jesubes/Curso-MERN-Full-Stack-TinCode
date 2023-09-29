import React from 'react'
import {Tab} from 'semantic-ui-react'
import {ListEmails} from '../../../components/Admin/Newsletter'

export const Newsletter = () => {

  
  const panes = [
    {
      menuItem: "Listado de Email en Newsletter",
      render: () => (
        <Tab.Pane attached={false}>
          <ListEmails />
        </Tab.Pane>
      ),
    },
  ];


  return (
    <div className='newsletter-page'>
      <Tab menu={{ secondary: true }} panes={panes} />
    </div>
  )
}
