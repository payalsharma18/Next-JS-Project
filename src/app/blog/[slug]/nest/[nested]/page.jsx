import React from 'react'

const page = ({params}) => {

    const {slug} = params;
  return (
    <div>{slug}</div>
  )
}

export default page