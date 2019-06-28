import React from 'react';
import PiggyBank from './../Authentication/assets/piggy_bank.png';
import {Div, Img, Span} from './HeaderStyles';

const Header = (props) => {
    return (
        <Div>
            <Img src={PiggyBank} alt='Piggy Bank Logo' />
            <Span>Piggy Bank</Span>
        </Div>
    )
}

export default Header;