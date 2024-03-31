import React from 'react'
import bg from '../Assets/bg1.jpg'
import './resume.css'
import resume from '../Assets/Copy of Christober (1).jpg'



function Resume() {
    return (
        <div className='home'>
            <img src={bg} className='bg' />
            <div className='overlay'></div>
            <div className='resume text-center'>
                <button className='btn btn-outline-info mb-2'><a href='resume.pdf' download=''>Download <i className='fa fa-arrow-down'></i></a></button>
                <div className='text-center'>
                    <img src={resume} height={'800px'} />
                </div>

            </div>
        </div>
    )
}

export default Resume