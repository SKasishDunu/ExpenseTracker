import React from 'react';

// rrd imports
import { Form, NavLink } from 'react-router-dom';

// assets
import logomark from "../assets/logomark.svg";

// library imports
import { TrashIcon } from '@heroicons/react/24/solid'


const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to= "/" aria-label="Go to home">
        <img src={ logomark } alt="" height={25} />
        <span>HomeBudget</span>

      </NavLink>

      {
        userName && (
            <Form 
            method="post" 
            action="/logout" 
            onSubmit={(event) => {
                if(!confirm("Delete this User and all its data ?"))
                {
                    event.preventDefault()
                }
            }}
            >
                <button type="submit" className="btn btn--dark">
                    <span>Delete user</span>
                    <TrashIcon width={20} />
                </button>

            </Form>
        )
      }
    </nav>
  )
}

export default Nav;
