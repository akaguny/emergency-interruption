/**
 * @file       common.js
 * @package
 * @fileoverview Неклассифицированные Javascript-методы
 * @module utils/common
 */

var path = require('path'),
    util = require('util');

module.exports = {

  /**
   * Получение аргумента --'название аргумента' из командной строки
   * @param {string} argument ( --suite | --testrail )
   * @returns {string} Значение аргумента
   */
  getArgumentFromCommandLine : function (argument) {
    var index = process.argv.indexOf(argument);

    if (index !== -1) {
      return (process.argv[index + 1]);
    }
  },

  /**
   * Содержит ли командная строка аргумент
   * @param {string} argument Аргумент
   * @returns {boolean} Признак: содержится ли аргумент в строке
   * @example
   * common.isArgumentPresentInCommandLine('--e')
   */
  isArgumentPresentInCommandLine : function (argument) {
    return process.argv.indexOf(argument) !== -1;
  }
};