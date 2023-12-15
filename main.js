let input = document.getElementById("input");
let convert = document.getElementById("convert");
let outputDiv = document.getElementById("output");
convert.addEventListener("click", function (e) {
  infixToPostfix(input.value);
});

let infixToPostfix = (input) => {
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    // Add more operators as needed
  };
  let output = "";
  let stack = [];
  let inputArray = input.split("");
  console.log(inputArray);
  inputArray.map((token) => {
    // if the token acter if number add to display
    if (!isNaN(token)) {
      output += token;
    }
    // if the token acter is left parenthesis add to the stack
    else if (token == "(") {
      stack.push(token);
    }
    // if the token acter is right parenthesis display and pop all the operator until you find the left parenthesis.
    else if (token == ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output += stack.pop();
      }
      stack.pop(); // Discard the '('
    } else if (
      token === "+" ||
      token === "-" ||
      token === "*" ||
      token === "/"
    ) {
      while (
        stack.length > 0 &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  });

  // dump out all the elements for the stack
  for (i = stack.length - 1; i >= 0; i--) {
    output += stack[i];
    stack.pop();
  }
  console.log(output);
  outputDiv.textContent = "Output: " + output;
};

function comparePrecedence(operator1, operator2) {
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    // Add more operators as needed
  };

  return precedence[operator1] - precedence[operator2];
}
