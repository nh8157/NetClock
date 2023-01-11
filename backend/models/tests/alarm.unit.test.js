const { validateAND, validateOR } = require('../alarm');

test("Passing in all valid values case 1 (AND)", () => {
    const alarm = {
        year: 2022,
        month: 12,
        day: 10,
        hour: 1,
        minute: 20
    }
    expect(validateAND(alarm).error).toBe(undefined);
});

test("Passing in all valid values case 2 (AND)", () => {
    const alarm = {
        year: 2023,
        month: 1,
        day: 5,
        hour: 20,
        minute: 50
    };
    expect(validateAND(alarm).error).toBe(undefined);
});

test("Missing one field (AND)", () => {
    const alarm = {
        year: 2023,
        month: 2,
        day: 10,
        hour: 10
    };
    expect(validateAND(alarm).error).not.toBe(undefined);
});

test("Missing two fields (AND)", () => {
    const alarm = {
        year: 2023,
        month: 2,
        day: 1
    };
    expect(validateAND(alarm).error).not.toBe(undefined);
});

test("Passing in unexpected key (AND)", () => {
    const alarm = {
        year: 2023,
        month: 2,
        day: 20,
        hour: 21,
        minute: 10,
        second: 10
    };
    expect(validateAND(alarm).error).not.toBe(undefined);
});

test("Passing in all valid values case 1 (OR)", () => {
    const alarm = {
        year: 2022,
        month: 12,
        day: 10,
        hour: 1,
        minute: 20
    }
    expect(validateOR(alarm).error).toBeUndefined();
});

test("Passing in all valid values case 2 (OR)", () => {
    const alarm = {
        year: 2023,
        month: 1,
        day: 1,
        hour: 1,
        minute: 50
    }
    expect(validateOR(alarm).error).toBeUndefined();
});

test("Missing one field (OR)", () => {
    const alarm = {
        year: 2023,
        month: 2,
        day: 10,
        hour: 10
    };
    expect(validateOR(alarm).error).toBeUndefined();
});

test("Missing two fields (OR)", () => {
    const alarm = {
        year: 2023,
        month: 2,
        day: 1
    };
    expect(validateOR(alarm).error).toBeUndefined();
});

test("Passing in unexpected key (OR)", () => {
    const alarm = {
        year: 2023,
        month: 2,
        day: 20,
        hour: 21,
        minute: 10,
        second: 10
    };
    expect(validateOR(alarm).error).not.toBeUndefined();
});