import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const TheLayout = (props) => {
    return (
        <Fragment>
            <Header />
             {props.children }
             {/* <Outlet /> */}
        </Fragment>
    );
};

export default TheLayout;