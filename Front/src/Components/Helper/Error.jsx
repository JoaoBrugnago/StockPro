import React from 'react'

const Error = ({error}) => {
  return (
    <p style={{fontSize: '.8rem', color: 'red', margin: '5px 0px'}}>
      {error}
    </p>
  )
}

export default Error
