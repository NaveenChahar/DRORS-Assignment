import React, { useEffect } from 'react';
import Header from './Header/header'
import Employee from './Employees/employee'

const Commandcentre = () => {

    useEffect(function(){
        console.log("first time running")
    },[])

    return (
        <div>
            <Header></Header>
            <Employee></Employee>
        </div>
    );
};

export default Commandcentre;