<template>
  <div class="container py-5">
    <RouterLink to="/carrello">
        <button class="btn btn-orange">
            RITORNA AL CARRELLO
        </button>
      </RouterLink>
    <h1 class="mt-5">€ {{ store.total_price.toFixed(2) }}</h1>
    <div class="bootstrap-basic">
      <form @submit.prevent="handleSubmit" class="needs-validation">
        <div class="row">
          <div class="col-sm-6 mb-3">
            <label for="cc-name">Nome Titolare Carta</label>
            <div class="form-control" id="cc-name"></div>
            <small class="text-muted">Nome completo</small>
            <div class="invalid-feedback">
              Nome completo è richiesto
            </div>
          </div>
          <div class="col-sm-6 mb-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="email@email.com"
              @change="validateEmail">
            <div class="invalid-feedback">
              Scrivere un email valida per la spedizione.
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-4 mb-3">
            <label for="name">Nome</label>
            <input type="text" class="form-control" id="name" v-model="name" placeholder="Nome">
            <div class="invalid-feedback">
              Il Nome è richiesto
            </div>
          </div>
          <div class="col-sm-4 mb-3">
            <label for="number">Numero di Telefono</label>
            <input type="text" class="form-control" id="number" v-model="number" placeholder="Numero di Cellulare">
            <div class="invalid-feedback">
              Il Numero di telefono è richiesto
            </div>
          </div>
          <div class="col-sm-4 mb-3">
            <label for="address">Indirizzo</label>
            <input type="text" class="form-control" id="address" v-model="address" placeholder="Indirizzo">
            <div class="invalid-feedback">
              L'indirizzo è richiesto
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6 mb-3">
            <label for="cc-number">Numero carta</label>
            <div class="form-control" id="cc-number"></div>
            <div class="invalid-feedback">
              Numero della Carta di Credito è richiesta
            </div>
          </div>
          <div class="col-sm-3 mb-3">
            <label for="cc-expiration">Scadenza</label>
            <div class="form-control" id="cc-expiration"></div>
            <div class="invalid-feedback">
              Data di scadenza richiesta
            </div>
          </div>
          <div class="col-sm-3 mb-3">
            <label for="cc-cvv">CVV</label>
            <div class="form-control" id="cc-cvv"></div>
            <div class="invalid-feedback">
              CVV richiesta
            </div>
          </div>
        </div>

        <hr class="mb-4">
        <div class="text-center">
          <button class="btn btn-primary btn-lg" type="submit">Paga con <span id="card-brand">Carta</span></button>
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
      restaurant_id: localStorage.restaurant_id,
      total_price: localStorage.total_price,
      hostedFieldsInstance: null,
      clientInstance: null,
    };
  },
  mounted() {
    this.setupBraintree();
    this.store.total_price = localStorage.total_price ? JSON.parse(localStorage.total_price) : 0;
    this.store.restaurant_id = localStorage.restaurant_id ? JSON.parse(localStorage.restaurant_id) : 0;
    console.log(store.total_price);
    console.log(store.restaurant_id)

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
              placeholder: 'Nome scritto nella Carta'
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
              placeholder: 'MM / AA'
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
          restaurant_id: this.restaurant_id,
          total_price: this.total_price
        })
          .then(response => {
            console.log('Payment successful:', response.data);

            // Mostra un messaggio di successo

            // Redirect alla home
            this.$router.push({ name: 'success' });
            this.deleteData()
          })
          .catch(error => {
            console.error('Payment error:', error);
            // Mostra un messaggio di errore
          });
      });
    },
    deleteData() {

      localStorage.removeItem('total_price');
      localStorage.removeItem('restaurant_id');
      localStorage.removeItem('chart');
      localStorage.removeItem('total_qty');
    }
  },
};
</script>

<style lang="scss" scoped>
@use '../style/general';
</style>