// utils.js

// Random number generator
export function randomNumber(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Greeting function
export function greetUser(name) {
  if (!name) return "Hello, stranger!";
  return `Hello, ${name}! Welcome 🎉`;
}

// Even or Odd checker
export function evenOrOdd(num) {
  return num % 2 === 0 ? "Even" : "Odd";
}

// Age calculator from birthday string YYYY-MM-DD
export function calculateAge(birthday) {
  if (!birthday) return "";
  const birthDate = new Date(birthday);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
