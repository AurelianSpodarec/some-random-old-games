/**
 * Model file for working with data
 */

/**
 * Main Model Object
 *
 */

export var model = {};


model.init = function() {

  model.getEquipments();

}

 /**
  * Gets equipments from JSON
  *
  * @return JSON {object} Object of equipments
  */

model.getEquipments = function() {

  return jsonData;

}

// console.log(model.getEquipments);