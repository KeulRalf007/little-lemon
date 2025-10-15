"use strict";
// utils/testMaster.ts
// .mjs is used to declare this file as module and force VS Code to use modern ES module syntax (e.g. import) instead of the older CommonJS syntax (e.g. require).
Object.defineProperty(exports, "__esModule", { value: true });
console.log("testMaster.ts Start");
const logger_1 = require("../utils/logger"); // ES Syntax
const validateEmail_1 = require("./validateEmail"); // ES Syntax
function testMaster() {
    (0, logger_1.log)('testMaster() Start');
    const aEmails = ['ralf.keul@diekeuls.de', "peter@[102.100.200.300]", "stork@kaspers.com", "2323@3434", "notAnEmail", "also@notAnEmail"];
    for (let s, Email of aEmails) {
        let bValid = !!(0, validateEmail_1.validateEmail)(sEmail);
        (0, logger_1.log)('testMaster() valid:' + bValid + ' for Email: ' + sEmail);
    }
    (0, logger_1.log)('testMaster() End');
}
testMaster();
console.log("testMaster.ts End");
