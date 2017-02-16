/**
 * @file       emergency-interruption.js
 * @copyright  Copyright (c) CJSC PETER-SERVICE, 2016.
 * @fileoverview Плагин экстренных прерываний автотестов, использующих protractor и jasmine
 * @module plugin/emergency-interruption
 */
var common = require('utils/common'),
    EmergencyInterruption = {
      onPrepare : function () {
        if (common.isArgumentPresentInCommandLine('--e')) {
          this.env = jasmine.getEnv();
          this.env.addReporter(this);
          this.runFailed = false;
          this.failedStep = '';
          this.autoTestTag = this.config.autoTestTag || '#AUTOTEST';
        }
      }
    };

/**
 * Функция вызывается после выполнения каждого it
 * @param {Object} result данные о результате прохождения it
 * @returns {void}
 */
EmergencyInterruption.specDone = function (result) {
  if (result.status !== 'passed' && result.failedExpectations[0].message.indexOf(this.autoTestTag) === -1) {
    this.runFailed = true;
    this.failedStep = result.description.match(/[\.\w]+/)[0];
  }
};

/**
 * Функция вызывается перед выполнением каждого it
 * Если предыдущий шаг упал из-за ошибок автотеста, то пропускаем текущий
 * @returns {void}
 */
EmergencyInterruption.specStarted = function () {
  var message;

  if (this.runFailed) {
    message = ' Пропущен т.к. шаг ' + this.failedStep + ' неудачен';
    // Если есть репортер allure, то завершаем шаг в нём с присвоением статуса - пропущено.
    if (allure) {
      allure._allure.endCase('pending', message);
    }
    this.env.pending(message);
  }
};

/**
 * Функция вызывается после выполнения всех it в сьюте
 * На этом шаге обнуляются значения плагина до дефолтных
 * @returns {void}
 */
EmergencyInterruption.suiteDone = function () {
  this.runFailed = false;
  this.failedStep = '';
};

module.exports = EmergencyInterruption;
