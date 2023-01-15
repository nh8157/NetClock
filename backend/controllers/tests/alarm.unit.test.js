const alarmController = require('../alarm');
jest.mock("../../database/database", () => require('../../database/__mocks__/database'));

const OBJECTID_ERR = "ObjectId invalid";
const DATETIME_ERR = "Alarm datetime invalid";
const NOALARM_ERR = "Alarm not found";

const res = {
    code: 0,
    ret: {},
    status: (code) => { res.code = code },
    send: (input) => { res.ret = input }
};

describe("Testing add alarm controller", () => {
    it("Add valid alarm", async () => {
        const req = {
            body: {
                year: 2023,
                month: 1,
                day: 10,
                hour: 10,
                minute: 55
            }
        };
        await alarmController.handleAddAlarm(req, res);
        expect(res.ret).toEqual({ status: true, id: 0 });
    });
    it("Add alarm with extra parameters", async () => {
        const req = {
            body: {
                year: 2023,
                month: 1,
                day: 10,
                hour: 20,
                minute: 10,
                second: 10
            }
        };
        await alarmController.handleAddAlarm(req, res);
        expect(res.ret.status).toEqual(false);
        expect(res.ret.msg.details[0].message).toEqual('"second" is not allowed');
    });
    it("Add alarm with a missing parameter", async () => {
        const req = {
            body: {
                year: 2023,
                month: 1,
                day: 10,
                hour: 20,
            }
        };
        await alarmController.handleAddAlarm(req, res);
        expect(res.ret.status).toEqual(false);
        // console.log(res.ret.msg.details[0]);
        expect(res.ret.msg.details[0].message).toEqual('"minute" is required');
    });

    // not yet implemented
    // it("Add alarm with invalid date time", () => {
    //     const req = {
    //         body: {
    //             year: 2023,
    //             month: 1,
    //             day: 32,
    //             hour: 10,
    //             minute: 61
    //         }
    //     };
    // })
});

describe("Testing get alarm controller", () => {
    it("Get alarm with no query", async () => {
        const req = {
            body: {}
        };
        await alarmController.handleGetAlarm(req, res);
        expect(res.ret).toEqual({ status: true, data: [] });
    });
    it("Get alarm with valid query", async () => {
        const req = {
            body: { status: true }
        };
        await alarmController.handleGetAlarm(req, res);
        expect(res.ret).toEqual({ status: true, data: [] });
    });
    it("Get alarm with invalid query", async () => {
        const req = {
            body: { second: 20 }
        };
        await alarmController.handleGetAlarm(req, res);
        expect(res.ret.status).toEqual(false);
        expect(res.ret.msg.details[0].message).toEqual('"second" is not allowed');
    });
});

describe("Testing update alarm controller", () => {
    it("Update alarm with valid object id and query", async () => {
        const req = {
            body:
            {
                objectId: "63ac2126359a780a5b20bbf2",
                status: false,
                year: 2023
            }
        };
        await alarmController.handleUpdateAlarm(req, res);
        expect(res.ret).toEqual({ status: true, id: "63ac2126359a780a5b20bbf2" });
    });
    it("Update alarm with invalid object id and valid query", async () => {
        const req = {
            body:
            {
                objectId: "123",
                status: false,
            }
        };
        await alarmController.handleUpdateAlarm(req, res);
        expect(res.ret.status).toBe(false);
        expect(res.ret.msg).toEqual(OBJECTID_ERR);
    });
    it("Update alarm with valid object id and invalid query", async () => {
        const req = {
            body:
            {
                objectId: "63ac2126359a780a5b20bbf2",
                status: false,
                second: 11
            }
        };
        await alarmController.handleUpdateAlarm(req, res);
        expect(res.ret.status).toBe(false);
        expect(res.ret.msg.details[0].message).toEqual('"second" is not allowed');
    });
    it("Update alarm with invalid object id and invalid query", async () => {
        const req = {
            body:
            {
                objectId: "123",
                status: false,
                second: 11
            }
        };
        await alarmController.handleUpdateAlarm(req, res);
        expect(res.ret.status).toBe(false);
        expect(res.ret.msg).toEqual(OBJECTID_ERR);
    });
});

describe("Testing remve alarm controller", () => {
    it("Remove alarm with valid object id", async () => {
        const req = {
            body:
            {
                objectId: "63ac2126359a780a5b20bbf2",
            }
        };
        await alarmController.handleRmvAlarm(req, res);
        expect(res.ret).toEqual({ status: true, id: "63ac2126359a780a5b20bbf2" });
    });
    it("Remove alarm with invalid object id", async () => {
        const req = {
            body:
            {
                objectId: "123",
            }
        };
        await alarmController.handleRmvAlarm(req, res);
        expect(res.ret.status).toBe(false);
        expect(res.ret.msg).toEqual(OBJECTID_ERR);
    });
})