/**
 *  ICS4UC - Mr. Brash 🐿️
 *  20 - Selection Sort
 *
 *  Author:
 **/
 
'use strict';

import { round, arrayOfInts } from "./library.js";
import { performance } from "perf_hooks";

/**
 * Return a sorted array using the Selection Sort algorithm
 *
 * @param {Array} unsortedArray The data to be sorted
 * @param {boolean} debug Whether or not to print debug information
 * @returns {Array} A sorted copy of the given unsortedArray
 */
function selection_sort(unsortedArray, debug = false) {
  // 'data' will be a copy of the given array (so we don't destroy the original)
  let data = Array.from(unsortedArray);
  console.log(`Selection sort of ${unsortedArray.length} items`);
  const start = performance.now();


  /*** Start of student code ***/



  /*** End of student code ***/


  console.log(`Sorting took: ${round(performance.now() - start, 2)} ms`);
  return data;
}

