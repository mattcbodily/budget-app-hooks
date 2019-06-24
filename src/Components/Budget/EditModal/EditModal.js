import React, {useState} from 'react';
import {Background, Modal} from './EditModalStyles'

const EditModal = (props) => {
    const [budget, setBudget] = useState('')
    const [groceries, setGroceries] = useState('')
    const [gas, setGas] = useState('')
    const [entertainment, setEntertainment] = useState('')
    const [other, setOther] = useState('')

    return (
        <Background>
            <Modal>Hello There</Modal>
        </Background>
    )
}

export default EditModal;