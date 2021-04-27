const Step = {
  DECLARE_ROLE: "declareRole",
  PERFORM_ROLE: "performRole",

  properties: {
    declareRole: {
      name: "Declare Role Step",
      key: "declareRole",
    },
    performRole: {
      name: "Perform Role Step",
      key: "performRole",
    },
  },
};

Step.keys = () => Object.keys(Step.properties);

Step.values = () => Object.values(Step.properties);

Step.value = (key) => Step.properties[key];

Object.freeze(Step);

export default Step;
