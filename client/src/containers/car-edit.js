import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { fetchCar, updateCar } from '../actions/index';


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
                const { car } = this.props;

                this.setState({
                    name: car.name,
                    description: car.description,
                    author: car.author,
                    photoUrl: car.photoUrl
                });
            });
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

    onSubmit(props) {
        this.props.updateCar(this.props.params.id, props)
            .then(() => this.context.router.push(`/cars/${this.props.params.id}`));
    }

    render() {

        const {
            fields: { name, author, description, photoUrl }, handleSubmit, car
        } = this.props;

        if (!car) {
            return <div>Loading...</div>
        }

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Add a new Car</h3>
                <div className={`form-group ${this.addDangerClassToInput(name)}`}>
                    <label>Name</label>
                    <input
                        type='text'
                        className='form-control'
                        {...name}
                        value={this.state.name}
                        onChange={e => this.onInputChange(e, name.name)} />
                    <div className='text-help'>
                        {name.touched ? name.error : ''}
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
                        {description.touched ? description.error : ''}
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
                        {photoUrl.touched ? photoUrl.error : ''}
                    </div>
                </div>
                <div className={`form-group ${this.addDangerClassToInput(author)}`}>
                    <label>Author</label>
                    <input
                        type='text'
                        className='form-control'
                        {...author}
                        value={this.state.author}
                        onChange={e => this.onInputChange(e, author.name)} />
                    <div className='text-help'>
                        {author.touched ? author.error : ''}
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>
                    Save
                </button>
                <Link to={`/cars/${this.props.params.id}`} className='btn btn-danger'>
                    Cancel
                </Link>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        car: state.cars.car
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
    form: 'CarEditForm',
    fields: ['name', 'author', 'description', 'photoUrl'],
    validate
}, mapStateToProps, { fetchCar, updateCar })(CarEdit);
