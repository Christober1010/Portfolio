import React from 'react'
import './footer.css'
function Footer() {

    return (
        <div className='footer  text-light p-4'>
            <div className='row text-center'>
                <div className='col'>
                    <div><p>Designed and Developer by Christober</p></div>
                </div>
                <div className='col'>
                    <div>Copyright <i className='fa fa-copyright'></i> 2024</div>
                </div>
                <div className='col'>
                    <a target='_blank' href='https://github.com/Christober1010'><i className='fa fa-github mx-2 fa-2x' ></i></a>
                    <a target='_blank' href='https://www.linkedin.com/in/christoberceciledward'><i className='fa fa-linkedin mx-2 fa-2x'></i></a>
                </div>
            </div>

        </div>
    )
}

export default Footer