const { v4: uuidv4 } = require('uuid');

module.exports = {
    beforeCreate(event) {
        if (!event.params.data.eventUid) {
            event.params.data.eventUid = uuidv4();
        }
    },
};
