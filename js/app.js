document.getElementById('loan-form').addEventListener('submit', function(e){
  hideResults();
  showLoader();
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function showResults() {
  document.getElementById('results').style.display = 'block';
}

function hideResults() {
  document.getElementById('results').style.display = 'none';
}

function showLoader() {
  document.getElementById('loading').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loading').style.display = 'none';
}

function calculateResults(){

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if ( isFinite(monthly) ) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    showResults();
    hideLoader();
  } else {
    showError('Please check your numbers');
  }
}

function showError(error){

  hideResults();
  hideLoader();

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}