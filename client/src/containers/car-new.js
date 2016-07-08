import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createCar, signOut } from '../actions/index';
import { validateUrlImage } from '../util/validate';
import auth from '../auth/auth';


class CarNew extends Component {

    constructor(props) {
        super(props);

        this.state = { author: '', photoUrl: '' };
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        const author = auth.getName();

        if (author) {
            this.setState({ ...this.state, author })
        } else {
            this.context.router.push('/');
        }
    }

    addDangerClassToInput({ touched, invalid }) {
        return touched && invalid ? 'has-danger' : '';
    }

    onSignOut() {
        this.props.signOut()
            .then(() => this.context.router.push('/authenticate'))
            .catch(e => this.context.router.push('/'));
    }

    onInputImageUrlChange(e) {
        this.setState({
            ...this.state,
            photoUrl: e.target.value
        });
    }

    onSubmit(props) {
        this.props.createCar(props)
            .then(() => this.context.router.push('/'))
            .catch(e => this.context.router.push('/'));
    }

    render() {

        const {
            fields: { name, author, description, photoUrl }, handleSubmit
        } = this.props;

        return (
            <div>
                <button
                    onClick={this.onSignOut.bind(this)}
                    className='btn btn-danger pull-xs-right pad-5'>
                    Log Out
                </button>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='pad-top-60'>
                    <div className='media'>
                        <span className='media-left'>
                            <img
                                className='img-responsive media-object img-smaller'
                                alt={this.state.name} src={this.state.photoUrl} />
                        </span>
                        <div className='media-body pad-top-60'>
                            <h3 className='media-heading'>Add a new Car</h3>
                            <div className={`form-group ${this.addDangerClassToInput(name)}`}>
                                <label>Name</label>
                                <input type='text' className='form-control' {...name} />
                                <div className='text-help'>
                                    {name.touched && name.error ? name.error : ''}
                                </div>
                            </div>
                            <div className={`form-group ${this.addDangerClassToInput(description)}`}>
                                <label>Description</label>
                                <input type='text' className='form-control' {...description} />
                                <div className='text-help'>
                                    {
                                        description.touched && description.error
                                        ? description.error : ''
                                    }
                                </div>
                            </div>
                            <div className={`form-group ${this.addDangerClassToInput(photoUrl)}`}>
                                <label>Image URL</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    {...photoUrl}
                                    value={this.state.photoUrl}
                                    onChange={this.onInputImageUrlChange.bind(this)} />
                                <div className='text-help'>
                                    {photoUrl.touched && photoUrl.error ? photoUrl.error : ''}
                                </div>
                            </div>
                            <div className={`form-group ${this.addDangerClassToInput(author)}`}>
                                <label>Author</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    {...author}
                                    value={this.state.author} />
                                <div className='text-help'>
                                    {author.touched && author.error ? author.error : ''}
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary pad-5'>
                                Submit
                            </button>
                            <Link to='/' className='btn btn-danger pad-5'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function validate({ name, description, photoUrl, author }) {
    let errors = {};

    if (!name) {
        errors.name = 'Enter name';
    }

    if (!description) {
        errors.description = 'Enter description';
    }

    if (!photoUrl) {
        errors.photoUrl = 'Enter some photo url';
    }

    if (photoUrl && !validateUrlImage(photoUrl)) {
        errors.photoUrl = 'Please provide a valid image url'
    }

    if (!author) {
        errors.author = 'Enter some author';
    }

    return errors;
}

export default reduxForm({
    form: 'CarNewForm',
    fields: ['name', 'author', 'description', 'photoUrl'],
    validate
}, null, { createCar, signOut })(CarNew);
