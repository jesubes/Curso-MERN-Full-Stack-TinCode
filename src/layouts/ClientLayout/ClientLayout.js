import React from 'react'

export const ClientLayout = ( props ) => {
  const { children } = props;

  return (
    <div>
      <h1>Estamos en ClientLayout</h1>

      { children }
    </div>
  )
}
