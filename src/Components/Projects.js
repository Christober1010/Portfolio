import React from "react";
import bg from "../Assets/bg1.jpg";
import "./projects.css";
import curency from "../Assets/Screenshot_2024-03-30_181906-removebg-preview.png";
import qr from "../Assets/Screenshot_2024-03-30_184952-removebg-preview.png";
import password from '../Assets/Screenshot_2024-03-30_185817-removebg-preview.png'

function Projects() {
  return (
    <div>
      <div className="home">
        <img src={bg} className="bg" />
        <div className="overlay"></div>
      </div>
      <div className="container-fluid project-div">
        <div className="text-light">
          <div className="project-heading  text-center">
            My Recent <span className="highlights">Works</span>
          </div>
          <div className="container">
            <div className="row">
              <div className="col project-box">
                <div className="box-head mt-3 mb-2 text-center">
                  Currency Converter
                  <img src={curency} height={"300px"} />
                </div>

                <div className="description p-3">
                  The currency converter application, developed using React and
                  an external API, facilitates users in swiftly converting
                  between various currencies. Users can input the desired amount
                  for conversion and select the target currencies. In the
                  background, the application retrieves exchange rate data from
                  the API, enabling real-time currency conversion.
                </div>
                <div className="text-center mb-4">
                  <button className="btn btn-outline-warning">
                    <a
                      href="https://github.com/Christober1010/Currency-Converter"
                      target="_blank"
                    >
                      Source Code
                    </a>
                  </button>
                  <button className="btn btn-outline-warning fw-bol mx-2">
                    <a
                      href="https://currency-converter-two-lac.vercel.app/"
                      target="_blank"
                    >
                      Show Demo
                    </a>
                  </button>
                </div>
              </div>
              <div className="col project-box">
                <div className="box-head mt-3 mb-2 text-center">
                  Password Generator
                  <img src={password} height={"300px"} />
                </div>

                <div className="description p-3">
                  The password generator application offers users the ability to
                  customize their passwords by selecting the inclusion of
                  capital letters, small letters, numbers, and symbols. Through
                  a user-friendly interface, individuals can specify their
                  preferences, tailoring the generated passwords to their
                  specific security needs.
                </div>
                <div className="text-center mb-4">
                  <button className="btn btn-outline-warning">
                    <a
                      href="https://github.com/Christober1010/Password-Generator"
                      target="_blank"
                    >
                      Source Code
                    </a>
                  </button>
                  <button className="btn btn-outline-warning fw-bol mx-2">
                    <a
                      href="https://password-generator-theta-olive.vercel.app/"
                      target="_blank"
                    >
                      Show Demo
                    </a>
                  </button>
                </div>
              </div>
              <div className="col project-box">
                <div className="box-head mt-3 mb-2 text-center">
                  QR Code Generator
                  <img src={qr} height={"300px"} />
                </div>

                <div className="description p-3">
                  The QR code generator application built with React empowers
                  users to input either text or links, resulting in the
                  generation of a corresponding QR code image. Through an
                  intuitive user interface, individuals can seamlessly provide
                  their desired content, whether it be textual information or
                  URLs. Upon submission, the application promptly produces the
                  QR code image, which users can then download for their use.
                
                </div>
                <div className="text-center mb-4">
                  <button className="btn btn-outline-warning">
                    <a
                      href="https://github.com/Christober1010/QR-Code-Generator"
                      target="_blank"
                    >
                      Source Code
                    </a>
                  </button>
                  <button className="btn btn-outline-warning fw-bol mx-2">
                    <a
                      href="https://qr-code-generator-umber-tau.vercel.app/"
                      target="_blank"
                    >
                      Show Demo
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
