import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCars } from '../actions/index';


class CarsIndex extends Component {

    componentWillMount() {
        this.props.fetchCars();
    }

    renderCars() {
        console.log(this.props.cars);
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
    { fetchCars }
)(CarsIndex);
