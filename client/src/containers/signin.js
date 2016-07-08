import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signIn } from '../actions/index';
import { validateEmail } from '../util/validate';
import auth from '../auth/auth';


class SignIn extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    onSubmit({ name, email, password }) {
        this.props.signIn(name, email, password)
            .then(() => this.context.router.push('/'))
            .catch(e => this.context.router.push('/'));
    }

    addDangerClassToInput({ touched, invalid }) {
        return touched && invalid ? 'has-danger' : '';
    }

    render() {

        const {
            fields: { name, email, password }, handleSubmit
        } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='signin-form'>
                <h3>Please, authenticate to use the app</h3>
                <div className={`form-group ${this.addDangerClassToInput(name)}`}>
                    <label>Name</label>
                    <input type='text' className='form-control' {...name} />
                    <div className='text-help'>
                        {name.touched && name.error ? name.error : ''}
                    </div>
                </div>
                <div className={`form-group ${this.addDangerClassToInput(email)}`}>
                    <label>Email</label>
                    <input type='email' className='form-control' {...email} />
                    <div className='text-help'>
                        {email.touched && email.error ? email.error : ''}
                    </div>
                </div>
                <div className={`form-group ${this.addDangerClassToInput(password)}`}>
                    <label>Password</label>
                    <input type='password' className='form-control' {...password} />
                    <div className='text-help'>
                        {password.touched && password.error ? password.error : ''}
                    </div>
                </div>
                <button type='submit' className='btn btn-primary pad-5'>
                    Sign In
                </button>
            </form>
        );
    }
}

function validate({ name, email, password }) {
    let errors = {};

    if (!name) {
        errors.name = 'Enter name';
    }

    if (!email) {
        errors.email = 'Enter email';
    }

    if (email && !validateEmail(email)) {
        errors.email = 'Please provide a valid email address';
    }

    if (!password) {
        errors.password = 'Enter some password';
    }

    return errors;
}

export default reduxForm({
    form: 'SignInForm',
    fields: ['name', 'email', 'password'],
    validate
}, null, { signIn })(SignIn);
