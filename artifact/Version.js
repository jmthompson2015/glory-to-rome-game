const Version = {
  IMPERIUM: "imperium",
  REPUBLIC: "republic",
};

Version.properties = {
  imperium: {
    name: "Imperium",
    key: "imperium",
  },
  republic: {
    name: "Republic",
    key: "republic",
  },
};

Version.keys = () => Object.keys(Version.properties);

Version.values = () => Object.values(Version.properties);

Version.value = (key) => Version.properties[key];

Object.freeze(Version);

export default Version;
