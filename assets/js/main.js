(function () {
  "use strict";
  const formElement = document.querySelector("#form");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const weight = event.target.querySelector("#weight").value;
    const height = event.target.querySelector("#height").value;
    validateInput(weight, height);
  });
})();

const validateInput = (weight, height) => {
  const isAValidNumber = (number) =>
    /^(?!.*e)(?!.*\+)(?!.*-)(?!\.)(?!0\.0$)(?!^0$)(?!^0\.)(?!.*\.\.)(?!.*\.$)[^e+\-\n]*$/.test(
      number
    );

  if (!isAValidNumber(weight) || !isAValidNumber(height)) {
    const invalidInput = `O número não pode conter símbolos especiais, e precisa ser maior ou igual a 1.`;
    createElement(invalidInput);
    return;
  }
  calcIMC(weight, height);
};

const calcIMC = (userWeight, userHeight) => {
  const imc = Number((userWeight / (userHeight * userHeight)).toFixed(2));
  imcCases(imc);
};

const imcCases = (imc) => {
  const imcConditions = {
    underWeight: imc < 18.5,
    normalWeight: imc >= 18.5 && imc <= 24.9,
    overWeight: imc >= 25 && imc <= 29.9,
    obesityGrade1: imc >= 30 && imc <= 34.9,
    obesityGrade2: imc >= 35 && imc <= 39.9,
    obesityGrade3: imc >= 40
  };

  for (const imcState in imcConditions) {
    if (imcConditions[imcState]) {
      result(imcState, imc);
      break;
    }
  }
};

const result = (key, imc) => {
  const obesityMsg = `IMC: ${imc} está em obesidade grau`;
  const clinicalCases = {
    underWeight: `IMC: ${imc} está abaixo do peso.`,
    normalWeight: `IMC: ${imc} peso está normal.`,
    overWeight: `IMC: ${imc} está com sobrepeso.`,
    obesityGrade1: `${obesityMsg} 1.`,
    obesityGrade2: `${obesityMsg} 2.`,
    obesityGrade3: `${obesityMsg} 3.`
  };
  createElement(clinicalCases[key], key);
};

const createElement = (...params) => {
  const outputMessage = document.querySelector(".output-message");
  const outputHandler = {};

  if (!params.length > 1) {
    outputMessage.innerHTML = `<p>${params}</p>`;
  }

  [outputHandler.sentence, outputHandler.key] = params;
  outputMessage.innerHTML = `<p>${outputHandler.sentence}</p>`;
  outputMessage.classList.remove("disabled");

  styleStates(outputMessage, outputHandler.key);
  clearInput();
};

const styleStates = (element, key) => {
  const stateClasses = {
    stateNormal: ["normalWeight", "overWeight"],
    stateAlert: ["obesityGrade1", "obesityGrade2"],
    stateSeveral: ["underWeight", "obesityGrade3"]
  };

  for (const stateClass in stateClasses) {
    const stateClassHasKey = stateClasses[stateClass].includes(key);
    stateClassHasKey
      ? element.classList.add(stateClass)
      : element.classList.remove(stateClass);
  }
};

const clearInput = () => {
  weight.value = null;
  height.value = null;
  weight.focus();
};
