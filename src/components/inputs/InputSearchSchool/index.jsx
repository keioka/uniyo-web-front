import React, { Component, PropTypes } from 'react'

export default ({ schools, schoolsSearch, onSelectSchool }) => {

  const { data } = schools

  return (
    <div>
      <input type="text" onChange={event => schoolsSearch(event.target.value)} />
      <ul>
        {data && data.map(d => <li key={d.id} onClick={() => onSelectSchool(d)}>{d.name}</li>)}
      </ul>
    </div>
  )
}
