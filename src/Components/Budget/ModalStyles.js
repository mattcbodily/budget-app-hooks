import styled from 'styled-components';

export const Modal = styled.div`
    height: 300px;
    width: 250px;
    position: fixed;
    top: 150px;
    left: 50%;
    margin-left: -125px;
    background-color: gray;
    border-radius: 10px;
`

export const H4 = styled.h4`
    font-size: 25px;
    font-weight: 300;
    margin: 10px 0px;
`

export const H5 = styled.h4`
    font-size: 18px;
    font-weight: 300;
    margin: 5px 0px; 
`

export const Select = styled.select`
    font-size: 16px;
    font-weight: 300;
`

export const Input = styled.input`
    height: 18px;
    width: 150px;
    font-size: 16px;
    font-weight: 300;
    background-color: gray;
    border: none;
    border-bottom: 1px solid black;
`

export const Button = styled.button`
    height: 30px;
    width: 160px;
    background-image:linear-gradient(to right, #8AC1FF, #0078FF);
    color: white;
    font-size: 16px;    
    border: none;
    margin-top: 7px;
    border-radius: 30px;
`