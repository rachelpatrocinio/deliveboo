<template>
  <div class="container py-5">
    <div class="my-5">
        <RouterLink to="/carrello" class="d-flex justify-content-center justify-content-md-start py-3 ">
        <button class="btn btn-orange">
          RITORNA AL CARRELLO
        </button>
      </RouterLink>

      <div>
        <h1 class="text-center fs-1 f">INSERISCI I TUOI DATI</h1>
        <h1 class="fs-3 p-3 text-center">Totale: € {{ store.total_price.toFixed(2)
          }}</h1>
      </div>

      <!-- <div class="bootstrap-basic w-50 align-self-center"> -->
      <form @submit.prevent="handleSubmit" class="needs-validation p-3">
        <!-- verifica server -->
        <div class="alert alert-danger my-5" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <div class="row justify-content-around align-items-start gap-5 flex-column flex-lg-row">
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="email">Email</label>
              <input type="email" class="form-control py-2" id="email" v-model="email" placeholder="email@example.com"
                @change="validateEmail" required />
              <div class="invalid-feedback">
                Inserire un email valida per il pagamento.
              </div>
            </div>
            <div class=" mb-3">
              <label for="name">Nome</label>
              <input type="text" class="form-control py-2" id="name" v-model="name" placeholder="Nome">
              <div class="invalid-feedback">
                Il Nome è richiesto
              </div>
            </div>
            <div class="mb-3">
              <label for="number">Numero di Telefono</label>
              <input type="text" class="form-control py-2" id="number" v-model="number"
                placeholder="Numero di Cellulare">
              <div class="invalid-feedback">
                Il Numero di telefono è richiesto
              </div>
            </div>
            <div class="mb-3">
              <label for="address">Indirizzo</label>
              <input type="text" class="form-control py-2" id="address" v-model="address" placeholder="Indirizzo">
              <div class="invalid-feedback">
                L'indirizzo è richiesto
              </div>
            </div>
          </div>
          <!-- BRAINTREE -->
          <div class="col">
            <div class="row row-cols-1 row-cols-lg-2">
              <div class="mb-3">
                <label for="cc-name">Nome Titolare Carta</label>
                <div class="form-control" id="cc-name"></div>
                <small class="text-muted">Nome completo</small>
                <div class="invalid-feedback">
                  Il Nome completo è richiesto
                </div>
              </div>
              <div class="mb-3">
                <label for="cc-number">Numero carta</label>
                <div class="form-control" id="cc-number"></div>
                <div class="invalid-feedback">
                  Numero della Carta di Credito è richiesta
                </div>
              </div>
              <div class="mb-3">
                <label for="cc-expiration">Scadenza</label>
                <div class="form-control" id="cc-expiration"></div>
                <div class="invalid-feedback">
                  Data di scadenza richiesta
                </div>
              </div>
              <div class="mb-3">
                <label for="cc-cvv">CVV</label>
                <div class="form-control" id="cc-cvv"></div>
                <div class="invalid-feedback">
                  CVV richiesta
                </div>
              </div>
            </div>
            <hr class="mb-4">
            <div class="text-center">
              <button class="btn btn-orange btn-lg" type="submit" @click="store.windowScroll">
                <img src="../../../public/icons/credit-card.png" alt="">
                Paga con <span id="card-brand">Carta</span>
              </button>
            </div>
          </div>

        </div>
      </form>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import client from 'braintree-web/client';
import hostedFields from 'braintree-web/hosted-fields';
import axios from 'axios';
import { store } from "../store.js";
import { errorMessages } from 'vue/compiler-sfc';

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
      errorMessage: '',
      new_dishes: [],
    };
  },
  mounted() {
    this.setupBraintree();
    this.store.total_price = localStorage.total_price ? JSON.parse(localStorage.total_price) : 0;
    this.store.restaurant_id = localStorage.restaurant_id ? JSON.parse(localStorage.restaurant_id) : 0;
    const storedChart = localStorage.getItem('chart');
    this.store.chart = JSON.parse(storedChart);
    this.dishesFor();

  },
  methods: {
    setupBraintree() {
      client.create({
        authorization: 'sandbox_d5nd6vpw_zvnjrm5f86qmnnj8' // Token sandbox per test
      }, (err, clientInstance) => {
        if (err) {
          this.handleBraintreeError(err);
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
            this.handleBraintreeError(err);
            return;
          }
          this.hostedFieldsInstance = hostedFieldsInstance;
        });
      });
    },
    handleBraintreeError(error) {
      const customErrorMessages = {
        'CLIENT_AUTHORIZATION_INVALID': 'L\'autorizzazione fornita è invalida.',
        'CLIENT_AUTHORIZATION_MISSING': 'L\'autorizzazione non è stata fornita.',
        'CLIENT_AUTHORIZATION_NETWORK_ERROR': 'Errore di rete durante l\'autorizzazione.',
        'CLIENT_REQUEST_TIMEOUT': 'La richiesta al server è scaduta.',

        'HOSTED_FIELDS_FIELDS_EMPTY': 'Tutti i campi della carta di credito sono vuoti.',
        'HOSTED_FIELDS_FIELDS_INVALID': 'Uno o più campi della carta di credito sono invalidi.',
        'HOSTED_FIELDS_FAILED_TOKENIZATION': 'Tokenizzazione della carta di credito fallita.',
        'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR': 'Errore di rete durante la tokenizzazione.',
        'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED': 'Verifica del CVV fallita.',
        'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE': 'Questa carta è già stata utilizzata.',

        'THREE_D_SECURE_VERIFICATION_FAILED': 'Verifica 3D Secure fallita.',
        'THREE_D_SECURE_AUTHENTICATION_FAILED': 'Autenticazione 3D Secure fallita.',
        'VAULT_TOKENIZATION_FAILED': 'Tokenizzazione del vault fallita.',

        'UNKNOWN_ERROR': 'Errore sconosciuto durante la configurazione del pagamento.'
      };
      const errorMessage = customErrorMessages[error.code] || 'Errore sconosciuto durante la configurazione del pagamento.';
      console.error(errorMessage);
      this.errorMessage = errorMessage; // imposta il messaggio di errore
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
          this.handleBraintreeError(err);
          return;
        }
        // console.log('Payment Method Nonce:', payload.nonce);
        // Invia il nonce al backend
        axios.post(`http://127.0.0.1:${store.port}/api/checkout`, {
          paymentMethodNonce: payload.nonce,
          name: this.name,
          email: this.email,
          number: this.number,
          address: this.address,
          restaurant_id: this.restaurant_id,
          total_price: this.total_price,
          dishes: this.new_dishes,
        })
          .then(response => {
            console.log('Payment successful:', response.data);
            // console.log(response.data.success)
            if (response.data.success === true) {
              this.$router.push({ name: 'success' });
              this.deleteData();

            } else {
              this.errorMessage = 'Pagamento non riuscito';
              // Presentazione
              this.$router.push({ name: 'success' });
              this.deleteData();
            }

          })
          .catch(error => {
            console.error('Payment error:', error);
            this.errorMessage = 'Errore durante il pagamento. Riprova più tardi.';
          });
      });
    },
    dishesFor() {
      for (let i = 0; i < this.store.chart.length; i++) {
        const dish = this.store.chart[i];
        
        const dishData = {
          id: dish.id,
          qty: dish.qty
        }

        this.new_dishes.push(dishData)
        // console.log(this.new_dishes)
      }
    },
    deleteData() {
      localStorage.removeItem('total_price');
      localStorage.removeItem('restaurant_id');
      localStorage.removeItem('chart');
      localStorage.removeItem('total_qty');
    }
  }
};
</script>

<style lang="scss" scoped>
@use '../style/general';
</style>
