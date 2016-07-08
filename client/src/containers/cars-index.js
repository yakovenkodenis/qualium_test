import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCars, signOut } from '../actions/index';
import { truncate } from '../util/text-util';


class CarsIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            filteredData: []
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchCars()
            .then(() => this.setState({
                ...this.state,
                filteredData: this.props.cars
            }))
            .catch(e => this.context.router.push('/'));
    }

    doSearch(query) {
        let filteredData = this.props.cars;

        if (query.trim() !== '') {
            let searchTerm = query.toLowerCase();

            filteredData = this.props.cars.filter(car => {
                return car.name.toLowerCase().indexOf(searchTerm) >= 0;
            });
        }

        this.setState({
            ...this.state,
            filteredData
        });
    }

    onSignOut() {
        this.props.signOut()
            .then(() => this.context.router.push('/authenticate'))
            .catch(e => this.context.router.push('/'));
    }

    renderCars() {
        return this.state.filteredData.map(car => {
            return (
                <li className='media pad-5 car-li' key={car._id}>
                    <Link to={`cars/${car._id}`} className='media-list-link'>
                        <div className='media-left img-thumbnail pad-right-10'>
                            <img
                                className='media-object img-small'
                                src={car.photoUrl}
                                alt={car.name} />
                        </div>
                        <div className='media-body'>
                            <h4 className='media-heading blue-hover'>{car.name}</h4>
                            <p>{truncate(car.description, 300)}</p>
                        </div>
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='text-xs-right'>
                    <Link to='/cars/new' className='btn btn-primary pad-5'>
                        Add a Car
                    </Link>
                    <button
                        onClick={this.onSignOut.bind(this)}
                        className='btn btn-danger pull-xs-right pad-5'>
                        Log Out
                    </button>
                </div>
                <h3>Cars</h3>
                <input
                    onChange={(e) => this.doSearch(e.target.value)}
                    type='text' className='form-control'
                    placeholder='Search...' />
                <br />
                <ul className='media-list pad-top-10'>
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
