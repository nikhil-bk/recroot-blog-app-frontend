import React from 'react'

const Footer = () => {
    const currentYear=new Date().getFullYear()
  return (
   <footer>
    Copyright Ⓒ {currentYear}
    
   </footer>
  )
}

export default Footer