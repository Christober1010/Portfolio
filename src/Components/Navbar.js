import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()
    return (
        <div className='hey'>
            <div className='container-fluid navs p-4'>
                <div className='nav container'>
                <div className='name'>Portfolio</div>
                    <div className='nav-items d-flex'>
                        
                        
                        <div onClick={()=>navigate('/')} className='item'>Home <i className='fa fa-home'></i></div>
                        <div onClick={()=>navigate('/about')} className='item'>About <i className='fa fa-user'></i></div>
                        <div onClick={()=>navigate('/projects')} className='item'>Project <i className='fa fa-suitcase'></i></div>
                        <div onClick={()=>navigate('/resume')} className='item'>Resume <i className='fa fa-gears'></i></div>
                        <div onClick={()=>navigate('/contact')} className='item'>Contact <i className='fa fa-phone'></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar