const display = document.getElementById("display");
let first = "";
let operator = "";
let waiting = false;
let errorState = false;

function appendToDisplay(input){
	if(errorState) {
		display.value = input;
		errorState = false;
	} else if(waiting) {
		display.value = input;
		waiting = false;
	} else {
		display.value += input
	}
}

function handleOperator(nextOperator){

	if (errorState) {
        clearDisp();
        return;
    }

	if (operator && waiting) {
        display.value = "Error";
        first = "";
        operator = "";
        waiting = false;
        errorState = true;
        return;
    }

	if(first === ""){
		first = display.value;
	} else if(operator) {
		const result = calculate(first, display.value, operator);
		display.value = result;
		first = result;
	}

	operator = nextOperator;
	waiting = true;
}

function calculate(first, second, operator){
	const firstNumber = parseFloat(first);
	const secondNumber = parseFloat(second);

	switch (operator) {
	case `+`:
		return firstNumber + secondNumber;
	case `-`:
		return firstNumber - secondNumber;
	case `*`:
		return firstNumber * secondNumber;
	case `/`:
		return firstNumber / secondNumber;
	default:
		return second;
	}
}

function calculateResult(){
	if(operator && first !== "") {
		display.value = calculate(first, display.value, operator);
		first = display.value;
		operator = "";
		waiting = false;
	}
}

function clearDisp(){
	display.value = "";
	first = "";
	operator = "";
	waiting = false;
}