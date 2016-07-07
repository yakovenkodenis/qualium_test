import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createCar, signOut } from '../actions/index';


class CarNew extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    addDangerClassToInput({ touched, invalid }) {
        return touched && invalid ? 'has-danger' : '';
    }

    onSignOut() {
        this.props.signOut()
            .then(() => this.context.router.push('/authenticate'));
    }

    onSubmit(props) {
        this.props.createCar(props)
            .then(() => this.context.router.push('/'));
    }

    render() {

        const {
            fields: { name, author, description, photoUrl }, handleSubmit
        } = this.props;

        return (
            <div>
                <button
                    onClick={this.onSignOut.bind(this)}
                    className='btn btn-danger pull-xs-right'>
                    Log Out
                </button>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>Add a new Car</h3>
                    <div className={`form-group ${this.addDangerClassToInput(name)}`}>
                        <label>Name</label>
                        <input type='text' className='form-control' {...name} />
                        <div className='text-help'>
                            {name.touched ? name.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${this.addDangerClassToInput(description)}`}>
                        <label>Description</label>
                        <input type='text' className='form-control' {...description} />
                        <div className='text-help'>
                            {description.touched ? description.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${this.addDangerClassToInput(photoUrl)}`}>
                        <label>Image URL</label>
                        <input type='text' className='form-control' {...photoUrl} />
                        <div className='text-help'>
                            {photoUrl.touched ? photoUrl.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${this.addDangerClassToInput(author)}`}>
                        <label>Author</label>
                        <input type='text' className='form-control' {...author} />
                        <div className='text-help'>
                            {author.touched ? author.error : ''}
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        Submit
                    </button>
                    <Link to='/' className='btn btn-danger'>Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    let errors = {};

    if (!values.name) {
        errors.name = 'Enter name';
    }

    if (!values.description) {
        errors.description = 'Enter description';
    }

    if (!values.photoUrl) {
        errors.photoUrl = 'Enter some photoUrl';
    }

    if (!values.author) {
        errors.author = 'Enter some author';
    }

    return errors;
}

export default reduxForm({
    form: 'CarNewForm',
    fields: ['name', 'author', 'description', 'photoUrl'],
    validate
}, null, { createCar, signOut })(CarNew);
