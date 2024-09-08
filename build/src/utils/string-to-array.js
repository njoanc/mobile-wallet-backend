"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToString = exports.stringToArray = void 0;
// simple function to transform a json string to an array of objects
const stringToArray = (json) => {
    return JSON.parse(json);
};
exports.stringToArray = stringToArray;
// transform an array of objects to a json string
const arrayToString = (array) => {
    return JSON.stringify(array);
};
exports.arrayToString = arrayToString;
//# sourceMappingURL=string-to-array.js.map