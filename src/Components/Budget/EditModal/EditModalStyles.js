import styled from 'styled-components';

export const Background = styled.div`
    height: 100vh;
    width: 100%;
    background-color: rgb(0,0,0,.7);
    position: fixed;
    top: 0%;
`

export const Modal = styled.div`
    height: 400px;
    width: 300px;
    position: fixed;
    top: 100px;
    left: 50%;
    margin-left: -150px;
    background-color: white;
    border-radius: 10px;
`

export const H4 = styled.h4`
    font-size: 25px;
    font-weight: 300;
    margin: 10px 0px;
`
export const H5 = styled.h4`
    font-size: 20px;
    font-weight: 300;
    margin: 5px 0px; 
`

export const Input = styled.input`
    height: 18px;
    width: 175px;
    font-size: 16px;
    font-weight: 300;
    border: none;
    border-bottom: 1px solid black;
    margin: 5px 0px;
`

export const Button = styled.button`
    height: 30px;
    width: 180px;
    background-image:linear-gradient(to right, #8AC1FF, #0078FF);
    color: white;
    font-size: 16px;    
    border: none;
    margin-top: 7px;
    border-radius: 30px;
`