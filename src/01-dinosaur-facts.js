/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  // Initialize variables to keep track of the longest dinosaur and its height.
  let longestDino = {}; // Will store the information about the longest dinosaur.
  let hieght = 0; // Will store the height of the longest dinosaur.

  // If the list of dinosaurs is empty, return an empty object.
  if (dinosaurs.length === 0) {
    return {};
  }
  // Iterate through each dinosaur in the data section of the dinosaurs.js list.
  for (const dino of dinosaurs) {
    // Check if the current dinosaur is taller than the previously recorded tallest dinosaur.
    if (hieght < dino.lengthInMeters) {
      // If yes, update the information about the tallest dinosaur.
      hieght = dino.lengthInMeters; // Update the height.
      longestDino.tallest = {
        // Store the name and height in the 'tallest' property.
        [dino.name]: dino.lengthInMeters * 3.281, // Convert height to feet.
      };
    }
  }

  // Return the information about the tallest dinosaur.
  return longestDino.tallest;
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  // Iterate through each dinosaur in the data section of the dinosaurs.js list.
  for (const dino of dinosaurs) {
    // Check if the current dinosaur's ID matches the target ID.
    if (dino.dinosaurId === id) {
      // Extract 'mya' value based on array length.
      const mya = dino.mya.length === 1 ? dino.mya : dino.mya[1];
      // Return the formatted description.
      return `${dino.name} (${dino.pronunciation})\n${
        dino.info
      } It lived in the ${dino.period} period, over ${
        dino.mya.length === 1 ? dino.mya : dino.mya[1]
      } million years ago.`;
    }
  }
  // Return an error message if the dinosaur with the provided ID is not found.
  return `A dinosaur with an ID of '${id}' cannot be found.`;
}
/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // Initialize a new array to store the requested information.
  const newArr = [];

  // Iterate through each dinosaur in the data section of the dinosaurs.js list.
  for (const dino of dinosaurs) {
    // Check if the dinosaur's 'mya' array has 2 elements (start and end of period).
    if (dino.mya.length === 2) {
      // Check if the specified period 'mya' falls within the dinosaur's existence period.
      if (dino.mya[0] >= mya && dino.mya[1] <= mya) {
        // Check if the specified 'key' exists in the dinosaur object
        if (dino[key]) {
          // If 'key' exists, push the corresponding information to the new array.
          newArr.push(dino[key]);
        } else {
          newArr.push(dino.dinosaurId);
        }
      }
    } else if (dino.mya.length === 1) {
      // If the 'mya' array has only one element, check if it matches the specified 'mya' or one less.
      if (dino.mya[0] === mya || dino.mya[0] - 1 === mya) {
        // Check if the specified 'key' exists in the dinosaur object.
        if (dino[key]) {
          // Check if the specified 'key' exists in the dinosaur object.
          newArr.push(dino[key]);
        } else {
          // If 'key' doesn't exist, push the dinosaur's ID to the new array.
          newArr.push(dino.dinosaurId);
        }
      }
    }
  }
  // Return the array containing the requested information about dinosaurs.
  return newArr;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
