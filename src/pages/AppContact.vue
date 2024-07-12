<template>
  <div class="container py-5">
    <!-- con il @submit.prevent, preveniamo l'invio del form -->
    <form v-if="success === false" @submit.prevent="sendMessage" action="" >
            <div class="mb-5">
                <label for="name" class="form-label"><h3>NOME</h3></label>
                <input type="text" class="form-control" id="name" v-model="name" placeholder="nome">
                <div v-if="errors.name">
                    <p class="text-danger">{{ errors.name.join(' ') }}</p>
                </div>
            </div>
            <div class="mb-5">
                <label for="email" class="form-label"><h3>EMAIL</h3></label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="email@example.com">
                <div v-if="errors.email">
                    <p class="text-danger">{{ errors.email.join(' ') }}</p>
                </div>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label"><h3>MESSAGGIO</h3></label>
                <div class="form-floating">
                    <textarea v-model="message" id="message" cols="30" rows="10" class="w-100 h-25 form-control"></textarea>
                </div>
                <div v-if="errors.message">
                    <p class="text-danger">{{ errors.message.join(' ') }}</p>
                </div>
            </div>
            <button class="bg-brown">INVIO</button>
        </form>

        <div v-else class="text-success py-5">
            <h1>L'invio è andato a buon fine</h1>
            <RouterLink to="/">
              <button class="btn btn-orange mt-2">
                Torna alla Homepage
              </button>
            </RouterLink>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from "../store.js";


export default {
  data() {
    return {
    store,
      errors: {},
      name: '',
      email: '',
      message: '',
      success: false,
    };
  },

  methods: {
    sendMessage() {
      this.errors = {};
      const data = {
        name: this.name,
        email: this.email,
        message: this.message,
      };
      axios
        .post(`http://127.0.0.1:${store.port}/api/contacts`, data)
        .then(res => {
            // console.log(res.data)
          if (res.data.success === true) {
            this.success = true;

          } else {
            this.errors = res.data.errors;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../style/general';
</style>
