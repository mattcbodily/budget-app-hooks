import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import ExpenseModal from '../ExpenseModal/ExpenseModal'
import EditModal from '../EditModal/EditModal'
import './Menu.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faPlus, faChartBar} from '@fortawesome/free-solid-svg-icons'
import {Container} from './MenuStyles';
library.add(faEdit, faPlus, faChartBar)

const Menu = (props) => {
    const [expenseModal, setExpenseModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const expenseModalToggle = () => {
        setExpenseModal(!expenseModal)
    }

    const editModalToggle = () => {
        setEditModal(!editModal)
    }

    return (
        <Container>
            <FontAwesomeIcon icon='edit' onClick={editModalToggle} className='edit-button'/>
            <FontAwesomeIcon icon='plus' onClick={expenseModalToggle} className='add-button'/>
            <Link to='/analysis'><FontAwesomeIcon icon='chart-bar' className='analysis-button'/></Link>
            {expenseModal
                ? <ExpenseModal
                    user={props.user}
                    budget={props.budget}
                    toggle={expenseModalToggle}
                    expenses={props.expenses}/>
                : null}
            {editModal
                ? <EditModal
                    user={props.user}
                    budget={props.budget}
                    //budget={element}
                    getBudget={props.getBudget}
                    toggle={editModalToggle}/>
                : null
            }
        </Container>
    )
}

export default Menu;