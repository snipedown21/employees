// Only executed on the server
import _ from 'lodash';
import { meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data already exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if(!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name, email, phone,
        avatar: image.avatar()
      });
    });
  }

  Meteor.publish('employees', function(PER_PAGE) {
    return Employees.find({}, { limit: PER_PAGE });
  });
});
