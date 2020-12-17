import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './login.css'


class Login extends Component {

    initialState = {
        email: '',
        emailError: '',
        password: '',
        passwordError: ''

    }

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    //handle the submit disable
    validate() {
        if (this.state.email.includes('@') && this.state.password.length >= 6) {
            return true;
        }
        else {
            return false;
        }
    }

    handleEmail = input => event => {
        this.setState({ email: event.target.value });
        if (!event.target.value.includes('@')) {
            this.setState({ emailError: 'Email should be proper' })
        }
        else {
            this.setState({ emailError: '' })
        }
    }

    handlePassword = input => event => {
        this.setState({ password: event.target.value });
        if (event.target.value.length < 6) {
            this.setState({ passwordError: 'Password atleast 6 characters' })
        }
        else {
            this.setState({ passwordError: '' })
        }
    }

    submit() {
        //send state to backend
        //this.props.history.push("/commandcentre")
        if (this.validate()) {
            //console.log(this.state);
            axios.post('http://localhost:1234/admin/login', this.state)
                .then(response => {
                    console.log(response);
                    this.props.history.push("/commandcentre")
                   
                    //alert(response.data.msg)
                    //if (response.data.logged) {
                    //    localStorage.setItem('adminToken', response.data.token)
                    //    this.props.history.push("/commandcentre")
                        //this.props.history.push("/teacher/newblogs")

                    //}
                })
                .catch(err => {
                    console.log(err)
                    // if(err.response!=null){
                    //     this.props.enqueueSnackbar(err.response.data.message,{ 
                    //       variant: 'error'
                    //   });
                    //    }else{
                    //     this.props.enqueueSnackbar(err.message,{ 
                    //       variant: 'error'
                    //   })
                    //    }
                })
        }
        else {
           //show the snack bar
            //     this.props.enqueueSnackbar('Please Fill Complete Form',{ 
            //       variant: 'error'
            //   })
             
        }
    }
    render() {
        return (
            <div>
                <div className={'logincontainer'}>
                <div className={'bannerhead'}>
                    LOGIN
                </div>
                <br/>
                <div className={'eachel'}>
                <TextField style={{width:'100%'}}
                    placeholder="enter username"
                    //label="Email"
                    error={this.state.emailError.length>1}
                    className="inputField"
                    helperText={this.state.emailError}
                    onChange={this.handleEmail('email')}
                />
                </div>
                <br />
                <div className={'eachel'}>
                <TextField style={{width:'100%'}}
                    placeholder="enter password"
                    //label="password"
                    type="password"
                    error={this.state.passwordError.length>1}
                    className="inputField"
                    helperText={this.state.passwordError}
                    onChange={this.handlePassword('password')}
                />
                </div>
                <br />
                
                <Button color="primary" variant="contained" onClick={this.submit.bind(this)}
                    style={{ margin: '20px' }}>
                    Submit
                </Button>
                </div>
            
            </div>
        );
    }
}

export default Login;