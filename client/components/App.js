import React from 'react'
import {Heading} from '@instructure/ui-elements'
import {CloseButton} from '@instructure/ui-buttons'

export default function(props) {
  return (
    <div style={{backgroundColor: 'black', width: '1000px', height: '1000px'}}>
      <div
        style={{
          backgroundColor: 'white',
          margin: 5,
          position: 'relative',
          top: 5,
        }}
      >
        <Heading as="h1">Basic LTI App</Heading>
        <CloseButton />
      </div>
    </div>
  )
}
