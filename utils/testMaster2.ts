// utils/testMaster2.ts
// .mjs is used to declare this file as module and force VS Code to use modern ES module syntax (e.g. import) instead of the older CommonJS syntax (e.g. require).
console.log("Debugger started");


// add a short delay as both ESM loader for typescript and VS Code's Node dbuger's loader bootloader.js race.  The debugger might only attach after the scrip is already doen.

setTimeout(() => {
  console.log("Debugger end");
}, 2000);

console.log("Debugger started2");