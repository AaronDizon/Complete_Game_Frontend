import React from 'react'
import { GoMarkGithub } from "react-icons/go";
import { BsLinkedin } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div className='footerContainer'>
        <div className='social'>
            <a href={'https://github.com/AaronDizon'}className='socialIcon'><GoMarkGithub size='4vmin' color='#F5F5F5' margin-top='5px'/></a>
            <a href={'https://www.linkedin.com/in/aaron-dizon-2ab738227/'}className='socialIcon'><BsLinkedin size='4vmin' color='#F5F5F5' margin-top='5px'/></a>
            <a href={'https://idyllic-semolina-feb97e.netlify.app/'}className='socialIcon'><BsPersonFill size='4vmin' color='#F5F5F5' margin-top='5px'/></a>
        </div>
        <p className='emailText'>Email: Iamartindizon@gmail.com</p>
        <p className='trademarkText'>TM: AaronDizon</p>
    </div>
  )
}

export default Footer