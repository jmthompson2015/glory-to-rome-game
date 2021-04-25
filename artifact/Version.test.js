import Version from "./Version.js";

QUnit.module("Version");

QUnit.test("Version properties Imperium", (assert) => {
  const versionKey = Version.IMPERIUM;
  const properties = Version.properties[versionKey];
  assert.equal(properties.name, "Imperium");
  assert.equal(properties.key, versionKey);
});

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Version.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Version);

  // Verify.
  R.forEach((key) => {
    const key2 = Version[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Version.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Version[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = Version.keys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(R.head(result), Version.IMPERIUM);
  assert.equal(R.last(result), Version.REPUBLIC);
});

const VersionTest = {};
export default VersionTest;
