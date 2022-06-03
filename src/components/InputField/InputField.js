import React from 'react';
import styles from "./InputField.module.scss";

const InputField = (props) => {

    return (
        <div className={styles["custom-form-group"]}> 
           {props.label && <label className={ styles["custom-label"]}>{props.label}</label>}
            <input className={"form-control " + styles["custom-form-control"]} type={props.type} {...props} 
            autoComplete="off" />
            {props.errors && <small className="text-danger">{props.errors}</small>}
            
        </div>
    );
};

export default InputField;