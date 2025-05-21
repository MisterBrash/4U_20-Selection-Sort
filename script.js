/**
 *  ICS4UC - Mr. Brash 🐿️
 *  20 - Selection Sort
 *
 *  Author:  Mr. Squirrel
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
  if (debug) console.log(`Selection sort of ${unsortedArray.length} items`);
  const start = performance.now();

  /*** Start of student code ***/

  for (let i = data.length-1; i > 0; i--) {
    let current_largest = 0;
    for (let j = 0; j <= i; j++) {
      if (data[j] > data[current_largest])
        current_largest = j;
    }
    let temp = data[i];
    data[i] = data[current_largest];
    data[current_largest] = temp;
  }

  /*** End of student code ***/

  if (debug) console.log(`Sorting took: ${round(performance.now() - start, 2)} ms`);
  return data;
}

/**
 * Return a subset array of the largest 'x' items.
 * @param {Number} x How many items to find.
 * @param {Array} data The array to search.
 */
function topX(x, data) {
  let top_array = data.slice(0, x)
  let min = Math.min(...top_array);
  for (let i = x; i < data.length; i++) {
    if (data[i] > min) {
      top_array[top_array.indexOf(min)] = data[i];
      min = Math.min(...top_array);
    }
  }

  return selection_sort(top_array);
}

/**
 * Return a subset array of the lowest 'x' items.
 * @param {Number} x How many items to find.
 * @param {Array} data The array to search.
 */
function bottomX(x, data) {
  let bottom_array = data.slice(0, x)
  let max = Math.max(...bottom_array);
  
  for (let i = x; i < data.length; i++) {
    if (data[i] < max) {
      bottom_array[bottom_array.indexOf(max)] = data[i];
      max = Math.max(...bottom_array);
    }
  }

  return selection_sort(bottom_array);

}

// console.log(`Finding the top 10 items...`)
// console.log(topX(10, arrayOfInts(111111111, -1, 999999999)).toString())
// console.log(`Finding the bottom 10 items...`)
// console.log(bottomX(10, arrayOfInts(111111111, -1, 999999999)).toString())
// console.log(selection_sort([4,7,1,2,9,6,3,0,8,2,6,5,9,2,7]).toString());
// console.log(bottomX(6, [4,7,1,2,9,6,3,0,8,2,6,5,9,2,7]).toString());
// console.log(selection_sort([9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 2, 2, 1]).toString());
// selection_sort(arrayOfInts(1000000, 0, 100000), true)