import React from 'react'
import "../styles/content.css"
import ContentHeader from './ContentHeader'
import Card from './Card'

function Content() {
  return (
    <div className='content'>
        <ContentHeader />
        <Card />
    </div>
  )
}

export default Content