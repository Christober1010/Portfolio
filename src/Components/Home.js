import React from 'react'
import bg from '../Assets/bg1.jpg'
import workingman from '../Assets/animated working man.png'
import './home.css'
import { Typewriter } from 'react-simple-typewriter'
import man from '../Assets/3dman-removebg-preview.png'


function Home() {
    return (
        <>
            <div className='home'>

                <img src={bg} className='bg' />
                <div className='overlay'></div>
            </div>
            <div className='container-fluid details'>
                <div className='row'>
                    <div className='col-6 '>
                        <div className='home-name p-5'>Hi I'm <span className='highlight'>Christober</span>

                            <div className='position'>
                                <Typewriter
                                    words={['Full Stack Developer', 'Java Developer', 'React Developer']}
                                    loop={5}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={150}
                                    deleteSpeed={50}
                                    delaySpeed={1000} />
                            </div>

                        </div>
                    </div>
                    <div className='col-6 text-center'>
                        <img src={workingman} height={350} />
                    </div>
                </div>
                <div className='container details2  '>
                    <div className='row '>
                        <div className='col-6 text-center'>
                            <img src={man} height={'300px'} />
                        </div>
                        <div className='col-6 mt-5'>
                            <div className='text-light intro'>LET ME <span className='highlight'>INTRODUCE</span> MYSELF</div>
                            <div className='intro-text'>
                               
                                <p> <sup><i className='fa fa-quote-left text-info'></i></sup> I've developed a passion for <span className='text-warning'>programming</span>, and I've managed to grasp some concepts along the way.</p>

                                <p>I'm proficient in core technologies like <span className='text-warning'>Java, React.js, and JavaScript</span>. </p>
                                <p>My primary focus lies in innovating new <span className='text-warning'> Web technologies</span>  and crafting innovative products. <sup><i className='fa fa-quote-right text-info'></i></sup></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home