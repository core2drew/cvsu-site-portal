import React from 'react'
import Icon from '../icon'
import Uuid from 'uuid/v4'
import { Link } from 'react-router-dom'
import './style.scss'

const Sidebar = props => (
  <div id={props.id} className={`sidebar ${props.variant}`}>
    <h3 className="section header">{props.title}</h3>
    <div className="links">
      {
        props.links.map(link => {
          let {to, slug} = link
          return <Link key={Uuid()} className="link" to={to}><Icon icon={"caret-right"}/>{slug}</Link>
        })
      }
    </div>
  </div>
)

Sidebar.defaultProps = {
  id: '',
  variant: '',
  title: '',
  links: []
}

export default Sidebar