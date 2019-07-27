import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';

const PER_PAGE = 20;

class EmployeeList extends React.Component {
  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick() {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    // props.employees => array of employees
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} employee={employee} />
          )}
        </div>
        <button onClick={this.handleButtonClick.bind(this)}
        className="btn btn-primary">Load More...</button>
      </div>
    );
  }
}

export default createContainer(() => {
  // setup subscription
  Meteor.subscribe('employees', PER_PAGE);

  // return an object, whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
