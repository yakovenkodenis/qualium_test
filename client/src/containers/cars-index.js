import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCars } from '../actions/index';


class CarsIndex extends Component {

    componentWillMount() {
        this.props.fetchCars();
    }

    renderCars() {
        return this.props.cars.map(car => {
            return (
                <Link to={`cars/${car._id}`}>
                    <li className='list-group-item' key={car._id}>
                        {car.name} {car.description}
                    </li>
                </Link>
            );
        });
    }

    render() {
        return (
            <div>
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
