import InputValidator from "./InputValidator.js";

QUnit.module("InputValidator");

const SHOULD_THROW = "Should have thrown an exception.";

const validateInRangeFail = (assert, objectName, object, low, high) => {
  try {
    InputValidator.validateInRange(objectName, object, low, high);
    throw SHOULD_THROW;
  } catch (e) {
    assert.equal(e.message, `${objectName} is out of range [1, 10]: ${object}`);
  }
};

const validateIsArrayFail = (assert, objectName, object) => {
  try {
    InputValidator.validateIsArray(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    assert.equal(e.message, `${objectName} is not an array: ${object}`);
  }
};

const validateIsBooleanFail = (assert, objectName, object) => {
  try {
    InputValidator.validateIsBoolean(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    assert.equal(e.message, `${objectName} is not a boolean: ${object}`);
  }
};

const validateIsFunctionFail = (assert, objectName, object) => {
  try {
    InputValidator.validateIsFunction(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    assert.equal(e.message, `${objectName} is not a function: ${object}`);
  }
};

const validateIsNumberFail = (assert, objectName, object) => {
  try {
    InputValidator.validateIsNumber(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    assert.equal(e.message, `${objectName} is not a number: ${object}`);
  }
};

const validateIsStringFail = (assert, objectName, object) => {
  try {
    InputValidator.validateIsString(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    assert.equal(e.message, `${objectName} is not a string: ${object}`);
  }
};

const validateNotEmptyFail = (assert, objectName, object) => {
  try {
    InputValidator.validateNotEmpty(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    assert.equal(e.message, `${objectName} is null or empty.`);
  }
};

const validateNotIncludesNilFail = (assert, objectName, object) => {
  try {
    InputValidator.validateNotIncludesNil(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    if (object === undefined) {
      assert.equal(e.message, `${objectName} is undefined.`);
    } else if (object === null) {
      assert.equal(e.message, `${objectName} is null.`);
    } else {
      assert.equal(e.message, `${objectName} is not an array: ${object}`);
    }
  }
};

const validateNotNilFail = (assert, objectName, object) => {
  try {
    InputValidator.validateNotNil(objectName, object);
    throw SHOULD_THROW;
  } catch (e) {
    if (object === undefined) {
      assert.equal(e.message, `${objectName} is undefined.`);
    } else {
      assert.equal(e.message, `${objectName} is null.`);
    }
  }
};

// /////////////////////////////////////////////////////////////////////////////
QUnit.test("validateInRange()", (assert) => {
  validateInRangeFail(assert, "0", 0, 1, 10);
  InputValidator.validateInRange("1", 1, 0, 10);
});

QUnit.test("validateIsArray()", (assert) => {
  validateIsArrayFail(assert);
  validateIsArrayFail(assert, "value");
  validateIsArrayFail(assert, "undefined", undefined);
  validateIsArrayFail(assert, "null", null);
  validateIsArrayFail(assert, "false", false);
  validateIsArrayFail(assert, "", "");
  validateIsArrayFail(assert, "12", 12);
  InputValidator.validateIsArray("[]", []);
  const array = [1, 2, 3, 4];
  InputValidator.validateIsArray("array", array);
  validateIsArrayFail(assert, "function", () => {});
});

QUnit.test("validateIsBoolean()", (assert) => {
  validateIsBooleanFail(assert);
  validateIsBooleanFail(assert, "value");
  validateIsBooleanFail(assert, "undefined", undefined);
  validateIsBooleanFail(assert, "null", null);
  InputValidator.validateIsBoolean("false", false);
  validateIsBooleanFail(assert, "", "");
  validateIsBooleanFail(assert, "12", 12);
  validateIsBooleanFail(assert, "[]", []);
  const array = [1, 2, 3, 4];
  validateIsBooleanFail(assert, "array", array);
  validateIsBooleanFail(assert, "function", () => {});
});

QUnit.test("validateIsFunction()", (assert) => {
  validateIsFunctionFail(assert);
  validateIsFunctionFail(assert, "value");
  validateIsFunctionFail(assert, "undefined", undefined);
  validateIsFunctionFail(assert, "null", null);
  validateIsFunctionFail(assert, "false", false);
  validateIsFunctionFail(assert, "", "");
  validateIsFunctionFail(assert, "12", 12);
  validateIsFunctionFail(assert, "[]", []);
  const array = [1, 2, 3, 4];
  validateIsFunctionFail(assert, "array", array);
  InputValidator.validateIsFunction("function", () => {});
});

QUnit.test("validateIsNumber()", (assert) => {
  validateIsNumberFail(assert);
  validateIsNumberFail(assert, "value");
  validateIsNumberFail(assert, "undefined", undefined);
  validateIsNumberFail(assert, "null", null);
  validateIsNumberFail(assert, "false", false);
  validateIsNumberFail(assert, "", "");
  InputValidator.validateIsNumber("12", 12);
  validateIsNumberFail(assert, "[]", []);
  const array = [1, 2, 3, 4];
  validateIsNumberFail(assert, "array", array);
  validateIsNumberFail(assert, "function", () => {});
});

QUnit.test("validateIsString()", (assert) => {
  validateIsStringFail(assert);
  validateIsStringFail(assert, "value", undefined);
  validateIsStringFail(assert, "undefined", undefined);
  validateIsStringFail(assert, "null", null);
  validateIsStringFail(assert, "false", false);
  InputValidator.validateIsString("", "");
  validateIsStringFail(assert, "12", 12);
  validateIsStringFail(assert, "[]", []);
  const array = [1, 2, 3, 4];
  validateIsStringFail(assert, "array", array);
  validateIsStringFail(assert, "function", () => {});
});

QUnit.test("validateNotEmpty()", (assert) => {
  validateNotEmptyFail(assert);
  validateNotEmptyFail(assert, "value");
  validateNotEmptyFail(assert, "undefined", undefined);
  validateNotEmptyFail(assert, "null", null);
  InputValidator.validateNotEmpty("false", false);
  InputValidator.validateNotEmpty("true", true);
  validateNotEmptyFail(assert, "", "");
  InputValidator.validateNotEmpty("string", "string");
  validateNotEmptyFail(assert, "NaN", NaN);
  InputValidator.validateNotEmpty("0", 0);
  InputValidator.validateNotEmpty("12", 12);
  validateNotEmptyFail(assert, "[]", []);
  const array = [1, 2, 3, 4];
  InputValidator.validateNotEmpty("array", array);
  const object = {};
  InputValidator.validateNotEmpty("object", object);
  InputValidator.validateNotEmpty("function", () => {});
});

QUnit.test("validateNotIncludesNil()", (assert) => {
  validateNotIncludesNilFail(assert);
  validateNotIncludesNilFail(assert, "value");
  validateNotIncludesNilFail(assert, "undefined", undefined);
  validateNotIncludesNilFail(assert, "null", null);
  validateNotIncludesNilFail(assert, "12", 12);
  InputValidator.validateNotIncludesNil("[]", []);
  const array = [1, 2, 3, 4];
  InputValidator.validateNotIncludesNil("array", array);
  const object = {};
  validateNotIncludesNilFail(assert, "object", object);
  validateNotIncludesNilFail(assert, "function", () => {});
});

QUnit.test("validateNotNil()", (assert) => {
  validateNotNilFail(assert);
  validateNotNilFail(assert, "value");
  validateNotNilFail(assert, "undefined", undefined);
  validateNotNilFail(assert, "null", null);
  InputValidator.validateNotNil("12", 12);
  InputValidator.validateNotNil(assert, "[]", []);
  const array = [1, 2, 3, 4];
  InputValidator.validateNotNil("array", array);
  const object = {};
  InputValidator.validateNotNil("object", object);
  InputValidator.validateNotNil("function", () => {});
});

const InputValidatorTest = {};
export default InputValidatorTest;
