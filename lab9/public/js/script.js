const form = document.querySelector("form");

function fibonacci(num) {
  if (num <= 0) return 0;
  if (num === 1) return 1;
  else return fibonacci(num - 1) + fibonacci(num - 2);
}

function isPrime(num) {
  if (num <= 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

form.onsubmit = function (event) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  if (!input.value) {
    document.querySelector("#error").classList.remove("hidden");
    return;
  }
  document.querySelector("#error").classList.add("hidden");
  const value = +input.value;
  const fib = fibonacci(value);
  const prime = isPrime(fib);
  const newElement = document.createElement("li");
  newElement.textContent = `The Fibonacci of ${value} is ${fib}.`;
  newElement.classList.add(prime ? "is-prime" : "not-prime");
  document.querySelector("ul").appendChild(newElement);
};
