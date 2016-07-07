import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCar, deleteCar, signOut } from '../actions/index';


class CarShow extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchCar(this.props.params.id)
            // .then(() => {
            //     if (this.props.car.error) {
            //         console.log('ERRORRRRR')
            //         this.context.router.push('/');
            //     }
            // })
            .catch(e => this.context.router.push('/'));
    }

    onSignOut() {
        this.props.signOut()
            .then(() => this.context.router.push('/authenticate'))
            .catch(e => this.context.router.push('/'));
    }

    onDeleteClick() {
        this.props.deleteCar(this.props.params.id)
            .then(() => this.context.router.push('/'))
            .catch(e => this.context.router.push('/'));
    }

    onUpdateClick() {
        this.context.router.push(`/cars/edit/${this.props.params.id}`);
    }

    render() {

        const { car } = this.props;

        if (!car) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to='/'>Back Home</Link>
                <button
                    onClick={this.onSignOut.bind(this)}
                    className='btn btn-danger pull-xs-right'>
                    Log Out
                </button>
                <button
                    onClick={this.onDeleteClick.bind(this)}
                    className='btn btn-danger pull-xs-right'>
                    Delete Car
                </button>
                <button
                    onClick={this.onUpdateClick.bind(this)}
                    className='btn btn-info pull-xs-right'>
                    Edit
                </button>
                <h3>{car.name}</h3>
                <p>{car.description}</p>
                <p>{car.photoUrl}</p>
                <span>this post was created by {car.author}.</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        car: state.cars.car
    }
}

export default connect(
    mapStateToProps,
    { fetchCar, deleteCar, signOut }
)(CarShow);
