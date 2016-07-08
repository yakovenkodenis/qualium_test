import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { validateUrlImage } from '../util/validate';
import { fetchCar, updateCar, signOut } from '../actions/index';
import auth from '../auth/auth';


class CarEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            author: '',
            photoUrl: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchCar(this.props.params.id)
            .then(() => {

                // if (this.props.car.error) {
                //     this.context.router.push('/');
                // }

                // const { car } = this.props.car;
                const { car } = this.props;

                this.setState({
                    name: car.name,
                    description: car.description,
                    author: car.author,
                    photoUrl: car.photoUrl
                });
            })
            .catch(e => this.context.router.push('/'));
    }

    addDangerClassToInput({touched, invalid}) {
        return touched && invalid ? 'has-danger' : '';
    }

    onInputChange(e, inputName) {
        this.setState({
            ...this.state,
            [inputName]: e.target.value
        })
    }

    onSignOut() {
        this.props.signOut()
            .then(() => this.context.router.push('/authenticate'))
            .catch(e => this.context.router.push('/'));
    }

    onSubmit(props) {
        this.props.updateCar(this.props.params.id, props)
            .then(() => this.context.router.push(`/cars/${this.props.params.id}`))
            .catch(e => this.context.router.push('/'));
    }

    render() {

        const {
            fields: { name, author, description, photoUrl }, handleSubmit, car
        } = this.props;

        if (!car) {
            return <div>Loading...</div>
        }

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
                                <input
                                    type='text'
                                    className='form-control'
                                    {...name}
                                    value={this.state.name}
                                    onChange={e => this.onInputChange(e, name.name)} />
                                <div className='text-help'>
                                    {name.touched && name.error ? name.error : ''}
                                </div>
                            </div>
                            <div className={`form-group ${this.addDangerClassToInput(description)}`}>
                                <label>Description</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    {...description}
                                    value={this.state.description}
                                    onChange={e => this.onInputChange(e, description.name)} />
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
                                    onChange={e => this.onInputChange(e, photoUrl.name)} />
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
                                    value={auth.getName()} />
                                <div className='text-help'>
                                    {author.touched && author.error ? author.error : ''}
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary pad-5'>
                                Save
                            </button>
                            <Link to={`/cars/${this.props.params.id}`} className='btn btn-danger pad-5'>
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        car: state.cars.car
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
        errors.photoUrl = 'Enter photo url';
    }

    if (photoUrl && !validateUrlImage(photoUrl)) {
        errors.photoUrl = 'Please provide a valid image url'
    }

    if (!author) {
        errors.author = 'Enter author';
    }

    return errors;
}

export default reduxForm({
    form: 'CarEditForm',
    fields: ['name', 'author', 'description', 'photoUrl'],
    validate
}, mapStateToProps, { fetchCar, updateCar, signOut })(CarEdit);
