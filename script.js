const numberButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const enterButton = document.querySelector("#enter");
const clearButton = document.querySelector("#clear");
const negateButton = document.querySelector(".negate");
const decimalButton = document.querySelector(".decimal")
const backButton = document.querySelector("#backspace");
const display = document.querySelector("#display");
let expression = "";
let leftNumber = "";
let rightNumber = "";
let i = 0;
let operator = "";

const lengthLimit = 9;

let decimalPoints = 0;

const add = (n1, n2) => {
	let result = n1 + n2;
	if (decimalPoints == 0) {
		return result;
	}
	return result.toFixed(6)
};
const subtract = (n1, n2) => {
	let result = n1 - n2;
	if (decimalPoints == 0) {
		return result;
	}
	return result.toFixed(6)
};
const multiply = (n1, n2) => {
	let result = n1 * n2;
	if (decimalPoints == 0) {
		return result;
	}
	return result.toFixed(6)
};
const divide = (n1, n2) => {
	if (n2 == 0) {
		return 0;
	}

	let result = n1 / n2;
	return Math.round(result * 1000000) / 1000000
};

const operate = (n1, n2, operator) => {
	n1 = parseFloat(n1);
	n2 = parseFloat(n2);
	switch(operator) {
		case('+'):
			return add(n1, n2);
		case('-'):
			return subtract(n1, n2);
		case('*'):
			return multiply(n1, n2);
		case('/'):
			return divide(n1, n2);
	}
}

const enter = () => {
	if (leftNumber.length == 0 || rightNumber.length == 0) {
		return;
	}

	let result = operate(leftNumber, rightNumber, operator);
	display.innerText = result;
	leftNumber = result;
	rightNumber = "";
	operator = "";
	i = 0;
	decimalPoints = 0;
}

const clear = () => {
	leftNumber = "";
	rightNumber = "";
	display.innerText = "";
	operator = "";
	i = 0;
	decimalPoints = 0;
}

const addToLeft = (num) => {
	if (leftNumber.length >= lengthLimit) {
		return;
	}
	leftNumber += num;

	console.log(leftNumber);

	display.innerText = leftNumber;
}

const addToRight = (num) => {
	if (rightNumber.length >= lengthLimit) {
		return;
	}

	rightNumber += num;
	display.innerText = rightNumber;
}

numberButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		let btnId = e.target.id;

		if (operator.length == 0 && i == 1) {
			leftNumber = "";
			display.innerText = leftNumber;
			i = 0;
		}

		if (i == 0) {
			addToLeft(btnId);
		} else {
			addToRight(btnId);
		}
		
	})
})

operatorButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		i++;
		decimalPoints = 0;
		if (i == 2) {
			enter();
			i = 1;
		}
		operator = e.target.id;
	})
})

enterButton.addEventListener("click", enter)
clearButton.addEventListener("click", clear);

negateButton.addEventListener("click", () => {
	if (i == 0) {
		leftNumber *= -1;
		display.innerText = leftNumber;
	} else {
		rightNumber *= -1;
		display.innerText = rightNumber;
	}
})

decimalButton.addEventListener("click", () => {
	if (decimalPoints == 1) {
		return;
	}

	if (i == 0) {
		addToLeft(".");
	} else {
		addToRight(".");
	}

	decimalPoints++;
})

backButton.addEventListener("click", () => {
	if (i == 0) {
		if (leftNumber.charAt(leftNumber.length - 1) == '.') {
			decimalPoints = 0;
		}
		leftNumber = leftNumber.toString().substring(0, leftNumber.length - 1);
		display.innerText = leftNumber;
	} else {
		if (rightNumber.charAt(rightNumber.length - 1) == '.') {
			decimalPoints = 0;
		}
		rightNumber = rightNumber.substring(0, rightNumber.length - 1);
		display.innerText = rightNumber;
	}
})