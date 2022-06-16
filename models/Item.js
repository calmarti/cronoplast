const mongoose = require("mongoose");

//TODO: estudiar tema validaciones automáticas del Modelo, validaciones con mongoose y validaciones con express-validator
//Setters allow you to transform the data before it gets to the raw mongodb document or query.
//TODO: setter: antes de ser persistidos los campos 'Date' deben ser pasar de string de tipo "DD/MM/YYYY" a un objeto Date así: new Date(YYYY, MM)

function changeDateFormat(value) {
  if (value instanceof Date) {
    return;
  } else {
    const splittedValue = value.split("/", 3);
    if (splittedValue.length !== 1) {
      return new Date(splittedValue[2], splittedValue[1]);
    } else {
      return new Date(splittedValue[0]);
    }
  }
}

const itemSchema = mongoose.Schema({
  taxonomic_group: {
    type: String,
    required: true,
    index: true,
  },
  family: { type: String, required: true, index: true },
  genus: { type: String, required: true, index: true },
  species: { type: String, required: true, index: true },
  area: { type: String, required: true },
  country: { type: String, required: true, index: true },
  date1: { type: Date, set: changeDateFormat },
  date2: { type: Date, set: changeDateFormat },
  date3: { type: Date, set: changeDateFormat },
  summary: { type: String },
  reference: { type: String },
  href: { type: String }, //type preeliminar, tal vez será un custom type
  image: { type: String },
});

itemSchema.statics.customFind = async function (filters, sort, skip, limit) {
  const query = Item.find(filters)
  query.sort(sort);
  query.skip(skip);
  query.limit(limit);
  const result = {};
  //atributos necesarios para query por rangos de fechas
    
  result.items = await query.exec();

  console.log('total', result.count)
  return result;
};

const Item = mongoose.model("Item", itemSchema);

//opcional: no hace falta (¿porqué no?)
module.exports = Item;
