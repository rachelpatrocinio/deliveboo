<script>
import client from 'braintree-web/client';
import hostedFields from 'braintree-web/hosted-fields';
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      number: '',
      address: '',
      total_price: 0, // Prezzo totale
      hostedFieldsInstance: null,
      clientInstance: null,
    };
  },
  mounted() {
    this.setupBraintree();
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
        axios.post('/api/process-payment', {
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