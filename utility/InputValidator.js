/* eslint no-console: ["error", { allow: ["error"] }] */

const InputValidator = {
  EMPTY: " is null or empty.",
  NULL: " is null.",
  UNDEFINED: " is undefined.",

  validateInRange(objectName, object, low, high) {
    this.validateIsNumber(objectName, object);

    if (object < low || high < object) {
      console.error(new Error().stack);
      throw new Error(
        `${objectName} is out of range [${low}, ${high}]: ${object}`
      );
    }
  },

  validateIsArray(objectName, object) {
    if (!Array.isArray(object)) {
      console.error(new Error().stack);
      throw new Error(`${objectName} is not an array: ${object}`);
    }
  },

  validateIsBoolean(objectName, object) {
    if (typeof object !== "boolean") {
      console.error(new Error().stack);
      throw new Error(`${objectName} is not a boolean: ${object}`);
    }
  },

  validateIsFunction(objectName, object) {
    if (typeof object !== "function") {
      console.error(new Error().stack);
      throw new Error(`${objectName} is not a function: ${object}`);
    }
  },

  validateIsNumber(objectName, object) {
    if (typeof object !== "number") {
      console.error(new Error().stack);
      throw new Error(`${objectName} is not a number: ${object}`);
    }
  },

  validateIsString(objectName, object) {
    if (typeof object !== "string") {
      console.error(new Error().stack);
      throw new Error(`${objectName} is not a string: ${object}`);
    }
  },

  validateNotEmpty(objectName, object) {
    if (Array.isArray(object)) {
      if (object.length === 0) {
        // Empty array.
        console.error(new Error().stack);
        throw new Error(objectName + InputValidator.EMPTY);
      }
    } else if (!Number.isNaN(parseFloat(object)) && Number.isFinite(object)) {
      // Valid.
    } else if (object === true || object === false) {
      // Valid.
    } else if (!object) {
      console.error(new Error().stack);
      throw new Error(objectName + InputValidator.EMPTY);
    }
  },

  validateNotIncludesNil(objectName, object) {
    this.validateNotNil(objectName, object);
    this.validateIsArray(objectName, object);
    object.forEach((element) => {
      this.validateNotNil(`${objectName} element`, element);
    });
  },

  validateNotNil(objectName, object) {
    if (object === undefined) {
      console.error(new Error().stack);
      throw new Error(objectName + InputValidator.UNDEFINED);
    }

    if (object === null) {
      console.error(new Error().stack);
      throw new Error(objectName + InputValidator.NULL);
    }
  },
};

export default InputValidator;
