// utils/validateEmail.js
export const validateEmail = (email) => {
    // ^ → start of the string
    // $ → end of the string
    // Ensures the entire email string matches this pattern (not just a part of it).
    // [^<>()[\]\\.,;:\s@\"]+   → one or more characters that are not special characters like < > ( ) [ ] \ , ; : space @ ".
    // (\.[^<>()[\]\\.,;:\s@\"]+)* → optionally dots followed by more valid characters (so john.doe is valid).
    // (\".+\")  → or a quoted string (like "john.doe").
    // @ → Literal @ separating the local part from the domain.
    // ((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]) -> IP Address user@[192.168.0.1]
    // (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))  -> [a-zA-Z\-0-9]+ → one or more letters, numbers, or hyphens, (\.)+ → followed by a dot, [a-zA-Z]{2,} → ends with a top-level domain (like .com, .net, .io, .uk)

  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateNonEmptyString = (sText) => {
// This regex matches strings that contain only letters (and spaces)
  // ^           → start of string
  // [A-Za-z ]+  → one or more uppercase/lowercase letters or spaces
  // $           → end of string
  // The .test() method returns true/false, not match arrays.
  return /^[A-Za-z ]+$/.test(sText.trim());
};
