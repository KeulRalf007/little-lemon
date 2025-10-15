// utils/testMaster.ts
// .mjs is used to declare this file as module and force VS Code to use modern ES module syntax (e.g. import) instead of the older CommonJS syntax (e.g. require).
// utils/testMaster.ts
console.log("testMaster.ts Start");

import { log } from '../utils/logger'; // ES Syntax
import { validateEmail, validateNonEmptyString } from './validateEmail'; // ES Syntax


function testMaster() {

log('testMaster() Start');


log('testMaster() TEST validateEmail() ---------------------------------------------------------------');
const aEmails = ['ralf.keul@diekeuls.de', "peter@[102.100.200.300]", "stork@kaspers.com", "2323@3434", "notAnEmail", "also@notAnEmail"]

for (let sEmail of aEmails) {
  let bValid = !!validateEmail(sEmail)
  log('testMaster() valid:' + bValid + ' for Email: ' + sEmail);
}


log('testMaster() TEST validateNonEmptyString() ---------------------------------------------------------------');
const aText = ["John", "Mary Jane", "", "John123", "Anna!", " "]

for (let sText of aText) {
  let bValid = !!validateNonEmptyString(sText)
  log('testMaster() valid:' + bValid + ' for NonEmptyString: ' + sText);
}


log('testMaster() TEST End -------------------------------------------------------------------------');

log('testMaster() End');

}

testMaster();


console.log("testMaster.ts End");