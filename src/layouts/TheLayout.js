import React, { Fragment } from 'react';
import Header from './Header';

const TheLayout = (props) => {
    return (
        <Fragment>
            <Header />
             {props.children }
        </Fragment>
    );
};

export default TheLayout;