/* eslint no-console: ["error", { allow: ["log"] }] */

import PromiseUtilities from "./PromiseUtilities.js";

QUnit.module("PromiseUtilities");

QUnit.test("resolve()", (assert) => {
  // Setup.
  const tasks = [
    new Promise((resolve) => {
      console.log("task1 done");
      resolve("task1 done");
    }),
    new Promise((resolve) => {
      console.log("task2 done");
      resolve("task2 done");
    }),
    new Promise((resolve) => {
      console.log("task3 done");
      resolve("task3 done");
    }),
  ];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    done();
  };

  PromiseUtilities.allSequential(tasks).then(callback);
});

const PromiseUtilitiesTest = {};
export default PromiseUtilitiesTest;
