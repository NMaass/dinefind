import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SignInLink2 } from "../SignIn";

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div className="signInForm centered-container row">
        <div className="col-4 col-s-8">
            <PasswordForgetForm />
            <SignInLink2/>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <div>
                <h1>Reset Password</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        className="signInField"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <button className="signInField signInButton" disabled={isInvalid} type="submit">
                        Reset My Password
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

const PasswordForgetLink = () => (
    <p className="forgotPasswordLink center">
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
