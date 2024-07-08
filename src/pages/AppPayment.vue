<template>
  <div class="bootstrap-basic">
    <form class="needs-validation" novalidate="">

      <div class="row">
        <div class="col-sm-6 mb-3">
          <label for="cc-name">Cardholder Name</label>
          <div class="form-control" id="cc-name"></div>
          <small class="text-muted">Full name as displayed on card</small>
          <div class="invalid-feedback">
            Name on card is required
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" placeholder="you@example.com" @change="validateEmail">
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 mb-3">
          <label for="cc-number">Credit card number</label>
          <div class="form-control" id="cc-number"></div>
          <div class="invalid-feedback">
            Credit card number is required
          </div>
        </div>
        <div class="col-sm-3 mb-3">
          <label for="cc-expiration">Expiration</label>
          <div class="form-control" id="cc-expiration"></div>
          <div class="invalid-feedback">
            Expiration date required
          </div>
        </div>
        <div class="col-sm-3 mb-3">
          <label for="cc-expiration">CVV</label>
          <div class="form-control" id="cc-cvv"></div>
          <div class="invalid-feedback">
            Security code required
          </div>
        </div>
      </div>

      <hr class="mb-4">
      <div class="text-center">
        <button class="btn btn-primary btn-lg" type="submit">Pay with <span id="card-brand">Card</span></button>
      </div>
    </form>
  </div>
  <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
      <div class="toast-header">
        <strong class="mr-auto">Success!</strong>
        <small>Just now</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        Next, submit the payment method nonce to your server.
      </div>
    </div>
  </div>
</template>

<script>
import dropin from 'braintree-web-drop-in';
import client from 'braintree-web/client';
import hostedFields from 'braintree-web/hosted-fields';

export default {
  data() {
    return {
      email: '',
      hostedFieldInstance: null,
      clientInstance: null
    }
  },
  methods: {
    setupBraintree() {
      client.create({
        authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b' // Mio token per test
      }, (err, clientInstance) => {
        if (err) {
          console.error(err);
          return;
        }
        this.clientInstance = clientInstance;

        hostedFields.create({
          client: clientInstance,
          styles: {
            input: {
              'font-size': '1rem',
              color: '#495057'
            }
          },
          fields: {
            cardholderName: {
              selector: '#cc-name',
              placeholder: 'Name as it appears on your card'
            },
            number: {
              selector: '#cc-number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cc-cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#cc-expiration',
              placeholder: 'MM / YY'
            }
          }
        }, (err, hostedFieldsInstance) => {
          if (err) {
            console.error(err);
            return;
          }
          this.hostedFieldsInstance = hostedFieldsInstance;
        });
      });
    },
    validateEmail() {
      const email = this.email;
      const emailField = document.getElementById('email');
      if (!email || email.indexOf('@') === -1) {
        emailField.classList.add('is-invalid');
        emailField.classList.remove('is-valid');
        return false;
      } else {
        emailField.classList.add('is-valid');
        emailField.classList.remove('is-invalid');
        return true;
      }
    },
  },
  mounted() {
    this.setupBraintree
  }
}
</script>

<style lang="scss" scoped>
body {
  background-color: #fff;
  padding: 15px;
}

.toast {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 9999;
}

.bootstrap-basic {
  background: white;
}

.braintree-hosted-fields-focused {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.braintree-hosted-fields-focused.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>