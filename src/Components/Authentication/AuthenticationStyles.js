import styled from 'styled-components';
import {logo} from './placeholder_logo.png';

export const Image = styled.img.attrs({
    src: {logo},
    alt: 'Company Logo'
})`
    height: 300px;
    width: 300px;
`

export const Input = styled.input`
    height: 45px;
    width: 300px;
    border: none;
    border-bottom: 1px solid lightgray;
    font-size: 15px;
    outline: none;
`

export const Button = styled.button`
    height: 45px;
    width: 305px;
    background-image:linear-gradient(to right, #8AC1FF, #0078FF);
    color: white;
    font-size: 17px;
    border: none;
    margin-top: 20px;
    margin-bottom: 10px;
    border-radius: 30px;
`