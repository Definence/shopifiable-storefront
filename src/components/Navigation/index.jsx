import React from 'react'

import './styles.sass'

const Navigation = ({ collections }) => {
  const buildNav = collections.map((c) => (
    <div key={c.title} className='nav-item'>
      {c.title}
    </div>
  ))

  return (
    <nav>{buildNav}</nav>
  )
}

export default Navigation
