/**
 * Mr. Brash 🐿️
 * 
 * A helper library with various documented functions.
 * 
 * This library is a work in progress.
 * If you notice issues or wish to suggest changes, please contact Mr. Brash.
 * 
 * NOTE: Naming convention used is camelCase
 **/

"use strict";

/**
 * Return a random integer where min and max are numbers, 
 * 'inclusive' is a boolean to determine if min and max are 
 * included or excluded (defaults to true).
 * @param {Number}  min  The lowest possible value.
 * @param {Number}  max  The highest possible value.
 * @param {Boolean} inclusive Whether to include max and min in the random generation.
 * @returns {Number} A random whole integer from max to min. 
 **/
export function randInt(min, max, inclusive = true) {
  if (inclusive)
    return Math.floor(Math.random() * (max - min + 1) ) + min;  // included
  else
    return Math.floor(Math.random() * (max - min - 1) ) + min + 1;  // not included
}

/**
 * Return a random number where 'precision' controls the number of 
 * digits in the number (> 0). Note:  The number 487 is not 0487 or 000487.
 * Precision is exact.
 * @param {Number} precision 
 */
export function randNumOfLength(precision) {
  if (typeof precision != 'number' || precision < 0) return -1;

  if (precision == 1)
    return randInt(0, 9);
  else
    return randInt(Math.pow(10, precision - 1), Math.pow(10, precision) - 1);
}

/**
 * Round a value to a specific number of decimals.
 * @param {Number} value The value being rounded
 * @param {Number} precision The number of decimals to keep (0 for whole, 1 for tenths, etc)
 * @returns {Number} A rounded version of 'value' to the given 'precision' of decimals (>= 0).
 */
export function round(value, precision) {
  if (typeof value != 'number' || typeof precision != 'number' || precision < 0) return -1;

  let multiplier = Math.pow(10, precision);

  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

/**
 * Return a random Latin letter character from the alphabet.
 * @param {any}  letterCase  Random casing if 0 or 'mixed'. Uppercase if 1 or 'upper'. Lowercase if 2 or 'lower'). Defaults to 0 (random).
 * @returns {String} a one-character string of a random character.
 */
export function randChar(letterCase = 0) {
  if (letterCase == "mixed") letterCase = 0;
  if (letterCase == "upper") letterCase = 1;
  if (letterCase == "lower") letterCase = 2;
  if (letterCase != 0 && letterCase != 1 && letterCase != 2) return -1;
  
  if (letterCase == 0) letterCase = randInt(1, 2);
  let char = String.fromCharCode(randInt(65, 90));
  return (letterCase == 1) ? char.toUpperCase() : char.toLowerCase();
}

/**
 * Return a random string of maximum length 'maxLength' (> 0). 'letterCase' can be 1 or 
 * 'upper' for all uppercase, 2 or 'lower' for all lowercase, and 0 or 'mixed' for a mix
 * of letters.
 * @param {Number} maxLength The maximum number of characters in the string
 * @param {*} letterCase
 * @returns {String} a randoming creating String.
 **/
export function randString(maxLength, letterCase = 0) {
  // Quick sanity Check
  if (maxLength < 1) return "";
  if (typeof letterCase == 'number' && (letterCase > 2 || letterCase < 0)) return -1;
  if (typeof letterCase == 'string' && !(letterCase == 'upper' || letterCase == 'lower' || letterCase == 'mixed')) return -1;

  let output = "";
  let mixed = (letterCase == 0 || letterCase == 'mixed');

  // Each letter
  for (let x = 0; x < maxLength; x++) {
    // Get a random letter and add it to output
    if (mixed) letterCase = randInt(1, 2);

    output += randChar(letterCase);
  }

  return output;
}

/**
 * Return an array of size 'length' where each element is a random
 * integer from min to max. 'inclusive' is a boolean to determine if
 * min and max are included or excluded (defaults to true). 'allowDuplicates'
 * defaults to true and determines if duplicates are permitted. Note - if
 * duplicates is false, the range from min to max must be >= length.
 * @param {Number} length The length of the array to return (number of Integers)
 * @param {Number} min The lowest possible value for each random integer
 * @param {Number} max The highest possible value for each random integer
 * @param {boolean} [inclusive=true] Include the min and max in the random generation
 * @param {boolean} [allowDuplicates=true] Allow duplicates in the resulting array 
 * @returns {Array} A random array of integer values (Numbers)
 */
export function arrayOfInts(length, min, max, inclusive = true, allowDuplicates = true) {
  //if (length > 50000) console.log(`Generating an array of ${length} integers...`);
  let array = [];
  let rnd;

  // Check that the parameters are valid
  if (!allowDuplicates && ((max-min) + 1 < length)) return array;
  if (!allowDuplicates && !inclusive && ((max-min) - 1 < length)) return array;

  for (let x = 0; x < length; x++) {
  
    rnd = randInt(min, max, inclusive);
  
    if (!allowDuplicates) {
      // Duplicates aren't allowed, so keep generating
      while(array.includes(rnd)) {
        rnd = randInt(min, max, inclusive);
      }
    }
    // We have a valid number, push it to the array
    array.push(rnd);
  }

  //if (length > 50000) console.log("Array complete.");
  return array;
}

/**
 * Return an array (of length 'length') containing random strings, each of maximum
 * length 'maxStrLength'.
 * @param {Number} length The number of Strings to include in the resulting array
 * @param {Number} maxStrLength The maximum length of each generated string
 * @param {any} letterCase 1 or 'upper' for all uppercase, 2 or 'lower'
 * for all lowercase, and 0 or 'mixed' for a mix of letters.
 * @returns {Array} An array of randomly generated strings.
 */
export function arrayOfStrings(length, maxStrLength, letterCase) {
  let output = [];

  for (let x = 0; x < length; x++) {
    output.push(randString(randInt(1, maxStrLength), letterCase));
  }
  return output;
}

/**
 * Return a random array of minimum 5 strings with "target" hidden in the array.
 * 
 * @param {Number} length - a number greater than 5.
 * @param {String} target - the string to hide must not be an empty string.
 * @returns {Array} A sorted array of strings with the target included only once
 */
export function hide_string(length, target) {
  if (length < 5) return -1;
  if (!target) return -1;

  // Create an array of random strings
  let retArray = arrayOfStrings(length, target.length, 0);  
  // Insert the target
  retArray[randInt(0, length-1)] = target;
  
  // Sort and return (should we?)
  return retArray.sort();
}

/**
 * Return a random array of minimum 5 numbers with a target value hidden in the array.
 * 
 * @param {Number} length - the number of values to have in the resulting array (must be > 4).
 * @param {Number} min - lowest value for random numbers.
 * @param {Number} max - highest value for random numbers.
 * @param {Number} target - the value to hide.
 * @returns {Array} A sorted array of integers with the target included only once
 */
export function hideInt(length, min, max, target) {
  if (length < 5) return -1;
  if (isNaN(target)) return -1;
  
  // Array of ints with no duplicates
  let retArray = arrayOfInts(length, min, max, true, false);
  
  // Check if the target already exists and insert, if not
  if (!retArray.includes(target))
    retArray[randInt(0, length-1)] = target;
  
  // Sort and return (should we sort?)
  return retArray.sort((a, b) => (a - b));
}
