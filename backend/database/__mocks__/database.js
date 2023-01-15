// Manual mock functions
module.exports = {
    addAlarm: jest.fn((alarm) => { return Promise.resolve({ _id: 0 }) }),
    rmvAlarm: jest.fn((objectId) => { return Promise.resolve({ deletedCount: 1 }) }),
    getAlarm: jest.fn((query) => { return Promise.resolve([]) }),
    updateAlarm: jest.fn((objectId, fields) => { return Promise.resolve({ matchedCount: 1, modifiedCount: 1 }) }),
}