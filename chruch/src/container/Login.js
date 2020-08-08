import React from 'react';
import PropTypes from 'prop-types';
import {fire} from '../App';
import Loading from '../components/util/Loading';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            error: false,
            username:'',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount() {
        if(localStorage.auth) {
            let val = Math.floor(Date.now() /1000);
            let data = JSON.parse(localStorage.getItem('auth'));
            if(data.exp <= val) {
                localStorage.removeItem('auth');
            } else {
                this.context.router.history.push('/admin'); 
            }
        }  
    }
    handleChange = (e) => { 
        this.setState({[e.target.name]: e.target.value})
    }
    handleLogin = (e) => { 
        this.setState({loading: true,error: false});
        fire.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then (d => {
                let auth = {
                    exp: Math.floor(Date.now() /1000) + 1200,
                    init: Math.floor(Date.now() /1000),
                    user: d.user.email,
                    info: d
                } 
                this.setState({loading: false});
                localStorage.setItem('auth',JSON.stringify(auth));
                this.context.router.history.push('/admin'); 
            })
            .catch((error) => {
                var errorMessage = error.message;
                this.setState({loading: false,error: errorMessage});
            });
    }
    render() {
        console.log(this.state);
        return (
            <div className="flex-v Login">
                {this.state.error && 
                    <div className="alert alert-danger" role="alert">
                        <h6>{this.state.error}</h6>
                    </div>
                }
                {this.state.loading && <Loading />}
                <div className="Login-content">
                    <h1 className="Login-form-h1">Login Page</h1> 
                    <div className="Login-form flex-v">
                    <label className="Login-span m-1">Enter Username</label>
                    <input 
                        type="text"
                        value={this.state.username}
                        name="username"
                        className="form-control m-1"
                        placeholder="Enter the Username"
                        onChange={this.handleChange}
                    />
                    <label className="Login-span m-1">Enter Password</label>
                    <input
                        type="password"
                        value={this.state.password}
                        name="password"
                        className="form-control m-1"
                        placeholder="Enter the password"
                        onChange={this.handleChange}
                    />
                    <button
                        className="btn btn-block btn-info m-1"
                        onClick={this.handleLogin}
                    >
                        Login
                    </button>
                </div>
                </div>
            </div>
        )
    }
}
export default Login;