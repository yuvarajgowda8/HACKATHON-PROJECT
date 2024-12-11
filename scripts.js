const paymentForm = document.getElementById('payment-form');
const paymentSuccess = document.getElementById('payment-success');
const paymentButton = document.getElementById('pay-button');
const paymentMethodInputs = document.querySelectorAll('input[name="payment_method"]');
const paymentSections = {
    'UPI': document.getElementById('upi-section'),
    'CARD': document.getElementById('card-section'),
    'WALLET': document.getElementById('wallet-section')
};

paymentMethodInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        togglePaymentSections(e.target.value);
    });
});

paymentButton.addEventListener('click', (e) => {
    e.preventDefault();
    paymentButton.textContent = 'Processing...';
    setTimeout(() => {
        processPayment();
    }, 2000);
});

function togglePaymentSections(selectedMethod) {
    Object.values(paymentSections).forEach(section => section.classList.add('hidden'));
    paymentSections[selectedMethod].classList.remove('hidden');
}

function processPayment() {
    const paymentId = 'PAY' + Math.floor(Math.random() * 100000);
    const amountPaid = Math.floor(Math.random() * 900 + 100);

    document.getElementById('payment-id').textContent = paymentId;
    document.getElementById('amount-paid').textContent = amountPaid;

    paymentForm.classList.add('hidden');
    paymentSuccess.classList.remove('hidden');
}

function restartPayment() {
    paymentForm.reset();
    paymentForm.classList.remove('hidden');
    paymentSuccess.classList.add('hidden');
    paymentButton.textContent = 'Pay Now';
}