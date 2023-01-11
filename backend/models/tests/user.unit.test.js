const { validate } = require('../user');

test("Passing in all fields", () => {
    const user = {
        firstName: "Sheldon",
        lastName: "Chen",
        username: "sheldon_chen",
        email: "sheldonchen@gmail.com",
        password: "asdfasdf",
    };
    expect(validate(user).error).toBeUndefined();
});

test("Missing one field", () => {
    const user = {
        firstName: "Sheldon",
        lastName: "Chen",
        username: "sheldon_chen",
        email: "sheldonchen@gmail.com",
    };
    expect(validate(user).error).not.toBeUndefined();
});

test("Missing two fields", () => {
    const user = {
        firstName: "Sheldon",
        lastName: "Chen",
        email: "sheldonchen@gmail.com",
    };
    expect(validate(user).error).not.toBeUndefined();
});

test("Not passing in email", () => {
    const user = {
        firstName: "Sheldon",
        lastName: "Chen",
        username: "sheldon_chen",
        email: "sheldonchen",
        password: "asdfasdf",
    };
    expect(validate(user).error).not.toBeUndefined();
});

test("Passing in extra field", () => {
    const user = {
        firstName: "Sheldon",
        lastName: "Chen",
        username: "sheldon_chen",
        email: "sheldonchen@gmail.com",
        password: "asdfasdf",
        birthday: "January 8, 2000"
    };
    expect(validate(user).error).not.toBeUndefined();
});