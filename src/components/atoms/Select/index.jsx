import React from 'react'

import './styles.sass'

export default ({ options, name, onChange }) => {
  return (
    <select
      name={name}
      key={name}
      onChange={onChange}
    >
      {options.map(({ value, label }) => {
        return (
          <option value={value} key={`${name}-${label}`}>{label}</option>
        )
      })}
    </select>
  )
}
