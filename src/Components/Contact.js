import React from "react";
import bg from "../Assets/bg1.jpg";
import "./contact.css";

function Contact() {
    const handleSubmit = () => {

    }
    return (
        <div className="home">
            <img src={bg} className="bg" />
            <div className="overlay"></div>
            <div className="container">
                <div className="contact text-light">
                <div className="text-center text-light mes">Stay in touch <i className="fa fa-handshake-o"></i></div>
                    <form  action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="b6cd6041-cceb-448f-a122-0ec875a54ac2"/>
                        <div className="mb-3">
                            <label>First name</label>
                            <input
                                name="name"
                                placeholder="Your name"
                                type="text"
                                required
                                className="form-control mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                            name="email"
                                placeholder="Your Email ID"
                                type="email"
                                required
                                className="form-control mt-2"
                            />
                        </div>
                        <label className="mb-2">Message</label>
                        <div className="mb-3">
                            <textarea className="form-control" name="message" required></textarea></div>


                        <div className="mb-3 text-center">
                            <button className="btn btn-warning submit-btn" type="submit">Submit</button>
                        </div>
                    </form>



                </div>
            </div>
        </div>
    );
}

export default Contact;
