const Material = {
  BRICK: "brick",
  CONCRETE: "concrete",
  MARBLE: "marble",
  RUBBLE: "rubble",
  STONE: "stone",
  WOOD: "wood",
};

Material.properties = {
  brick: {
    name: "Brick",
    color: "Red",
    key: "brick",
  },
  concrete: {
    name: "Concrete",
    color: "Gray",
    key: "concrete",
  },
  marble: {
    name: "Marble",
    color: "Purple",
    key: "marble",
  },
  rubble: {
    name: "Rubble",
    color: "Orange",
    key: "rubble",
  },
  stone: {
    name: "Stone",
    color: "Cyan",
    key: "stone",
  },
  wood: {
    name: "Wood",
    color: "Green",
    key: "wood",
  },
};

Material.keys = () => Object.keys(Material.properties);

Material.values = () => Object.values(Material.properties);

Material.value = (key) => Material.properties[key];

Object.freeze(Material);

export default Material;
