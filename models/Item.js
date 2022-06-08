const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  order: { type: String },
  family: { type: String },
  genus: { type: String },
  species: { type: String },
  location: { type: String },
  country: { type: String },
  date: { type: Date }, //type preeliminar, tal vez será un custom type
  reference: { type: String },
});

const Item = mongoose.model("Item", itemSchema);

//opcional: no hace falta (¿porqué no?)
export default Item;
