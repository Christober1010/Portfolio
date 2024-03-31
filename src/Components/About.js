import React from 'react'
import bg from '../Assets/bg1.jpg'
import './about.css'
import man from '../Assets/animated2.png'
import java from '../Assets/java (2).png'
import js from '../Assets/javascript (2).png'
import react from '../Assets/react (1).png'
import bootstrap from '../Assets/bootstrap.png'
import mysql from '../Assets/mysql (2).png'
import spring from '../Assets/spring-boot.png'
import node from '../Assets/nodejs.png'
import git from '../Assets/git.png'
import github from '../Assets/github.png'


function About() {
  return (
    <div className='about'>
      <img src={bg} className='bg' />
      <div className='overlay'></div>
      <div className='container w-75 m-auto  about-details'>
        <div className='row mt-5'>
          <div className='col-7 text-light'>
            <div className='heading'>Know who <span className='spl'>I'M</span></div>
            <div className='heading2'>
              <p>Hi Everyone, I am <span className='spl'>Christober</span> from <span className='spl'>Karaikal</span>, India. </p>
              <p>I have completed my Graduation from <span className='spl'>Pondicherry University</span> in 2023</p>
              <p>Apart from Coding I'm intrested in Cinematic Photography and Videography</p>
            </div>
            <div className='text-center fs-5 quote'> <span ><sup><i className='fa fa-quote-left'></i></sup> Strive to build things that make a difference ! <sup><i className='fa fa-quote-right'></i></sup></span></div>
          </div>

          <div className='col-4'>
            <img src={man} height={'300px'} />
          </div>
        </div>
        <div className='container-fluid skillset'>
          <div className='row text-center'>
            <h1 className='prof'>Professional Skillset</h1>
            <div className='row text-center'>

              <div className='col skill'>
                <i class="fa fa-html5 fa-4x" aria-hidden="true"></i>
              </div>

              <div className='col skill'>
                <i class="fa fa-css3 fa-4x" aria-hidden="true"></i>
              </div>

              <div className='col skill'>
                <img src={js} height={'80'}/>
              </div>
              
              <div className='col skill'>
                <img src={node} height={'80'}/>
              </div>

              <div className='col skill'>
                <img src={react} height={'80'}/>
              </div>

              <div className='col skill'>
                <img src={bootstrap} height={'80'}/>
              </div>
              
            </div>
            <div className='row'>
              <div className='col skill'>
                <img src={java}/>
              </div>
              <div className='col skill'>
                <img src={spring}/>
              </div>
              <div className='col skill'>
                <img src={mysql}/>
              </div>
              
              <div className='col skill'>
               <i className='fa fa-database fa-3x'></i>
              </div>

              <div className='col skill'>
                <img src={git}/>
              </div>
              
              <div className='col skill'>
                <img src={github}/>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About