const btn = document.getElementById('btn');
const bmiInput = document.getElementById('bmi-res');
const weightCondition = document.getElementById('weight-condition');

function calculateBMI(){
	const height = document.getElementById('height').value / 100;
	const weight = document.getElementById('weight').value;

	const bmi = weight / (height * height);
	bmiInput.value = bmi;

	if(bmi <18.5){
		weightCondition.innerText = "Underweight";
	} else if(bmi <= 24.9) {
		weightCondition.innerText = "Normal weight";
	} else if(bmi <=29.9) {
		weightCondition.innerText = "Overweight";
	} else {
		weightCondition.innerText = "Obese";
	}
}

btn.addEventListener("click", calculateBMI)