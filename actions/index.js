const cameras = require("./cameras").default;
const cells = require("./cells").default;
const connections = require("./connections").default;
const hexagons = require("./hexagons").default;
const journeys = require("./journeys").default;
const robots = require("./robots").default;
const stations = require("./stations").default;
const terrains = require("./terrains").default;
const tracks = require("./tracks").default;
const trains = require("./trains").default;
const viewport = require("./viewport").default;

const actions = Object.assign({},
  cameras,
  cells,
  connections,
  hexagons,
  journeys,
  robots,
  stations,
  terrains,
  tracks,
  trains,
  viewport
);

export default actions;



