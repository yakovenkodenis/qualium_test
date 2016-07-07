import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCars, signOut } from '../actions/index';


class CarsIndex extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchCars()
            .catch(e => this.context.router.push('/'));
    }

    onSignOut() {
        this.props.signOut()
            .then(() => this.context.router.push('/authenticate'))
            .catch(e => this.context.router.push('/'));
    }

    renderCars() {
        return this.props.cars.map(car => {
            return (
                <li className='list-group-item' key={car._id}>
                    <Link to={`cars/${car._id}`}>
                        {car.name} {car.description}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className='text-xs-right'>
                    <Link to='/cars/new' className='btn btn-primary'>
                        Add a Car
                    </Link>
                    <button
                        onClick={this.onSignOut.bind(this)}
                        className='btn btn-danger pull-xs-right'>
                        Log Out
                    </button>
                </div>
                <h3>Cars</h3>
                <ul className='list-group'>
                    {this.renderCars()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cars: state.cars.all
    }
}

export default connect(
    mapStateToProps,
    { fetchCars, signOut }
)(CarsIndex);
