import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './styles.sass'
import chevron from '../../assets/svg/chevron.svg'

const navItems = [
  { label: 'Wall', href: '/collections/wall' },
  { label: 'Shirts', href: '/collections/shirts', sublinks: [
    { label: 'Unisex', href: '/collections/unisex' },
    { label: 'Women', href: '/collections/women' },
    { label: 'Kids', href: '/collections/kids' },
  ] },
]

const Navigation = ({ history }) => {
  const buildNav = navItems.map((c) => (
    <div key={c.href} className='nav-item'>
      <span className='nav-label' onClick={() => history.push(c.href)}>
        <Link to={c.href}>{c.label}</Link>
        {c.sublinks && <img className='chevron' src={chevron} alt='chevron'/>}
      </span>

      {c.sublinks && (
        <div className='subcollection-container'>
          <div className='subcollection'>
            {c.sublinks.map((subLink) => (
              <div key={subLink.href} className='sublink-item'>
                <Link to={subLink.href}>{subLink.label}</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ))

  return (
    <nav>{buildNav}</nav>
  )
}

export default withRouter(Navigation)
