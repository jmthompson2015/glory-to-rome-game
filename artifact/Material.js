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
    color: "red",
    key: "brick",
  },
  concrete: {
    name: "Concrete",
    color: "gray",
    key: "concrete",
  },
  marble: {
    name: "Marble",
    color: "purple",
    key: "marble",
  },
  rubble: {
    name: "Rubble",
    color: "orange",
    key: "rubble",
  },
  stone: {
    name: "Stone",
    color: "cyan",
    key: "stone",
  },
  wood: {
    name: "Wood",
    color: "green",
    key: "wood",
  },
};

Material.keys = () => Object.keys(Material.properties);

Material.value = (key) => Material.properties[key];

Material.values = () => Object.values(Material.properties);

Object.freeze(Material);

export default Material;
