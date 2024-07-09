<template>
    <h1>€ {{ store.total_price }}</h1>
  <div class="bootstrap-basic">
    <form @submit.prevent="handleSubmit" class="needs-validation">
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
          <input type="email" class="form-control" id="email" v-model="email" placeholder="you@example.com" @change="validateEmail">
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4 mb-3">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" placeholder="Name">
          <div class="invalid-feedback">
            Name is required
          </div>
        </div>
        <div class="col-sm-4 mb-3">
          <label for="number">Phone Number</label>
          <input type="text" class="form-control" id="number" v-model="number" placeholder="Phone Number">
          <div class="invalid-feedback">
            Phone number is required
          </div>
        </div>
        <div class="col-sm-4 mb-3">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" v-model="address" placeholder="Address">
          <div class="invalid-feedback">
            Address is required
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
          <label for="cc-cvv">CVV</label>
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
    <!-- <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
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
    </div> -->
  </div>
</template>
<script>
import client from 'braintree-web/client';
import hostedFields from 'braintree-web/hosted-fields';
import axios from 'axios';
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
      name: '',
      email: '',
      number: '',
      address: '',
      total_price: store.total_price, // Passare dallo store
      hostedFieldsInstance: null,
      clientInstance: null,
    };
  },
  mounted() {
    this.setupBraintree();
    console.log(store.total_price);
  },
  methods: {
    setupBraintree() {
      client.create({
        authorization: 'sandbox_d5nd6vpw_zvnjrm5f86qmnnj8' // Token sandbox per test
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
    handleSubmit() {
      if (!this.validateEmail()) {
        return;
      }

      this.hostedFieldsInstance.tokenize((err, payload) => {
        if (err) {
          console.error('Tokenization Error:', err);
          return;
        }

        console.log('Payment Method Nonce:', payload.nonce);

        // Invia il nonce al backend
        axios.post(`http://127.0.0.1:${store.port}/api/checkout`, {
          paymentMethodNonce: payload.nonce,
          name: this.name,
          email: this.email,
          number: this.number,
          address: this.address,
          total_price: this.total_price
        })
        .then(response => {
          console.log('Payment successful:', response.data);
          // Mostra un messaggio di successo
        })
        .catch(error => {
          console.error('Payment error:', error);
          // Mostra un messaggio di errore
        });
      });
    }
  }
};
</script>