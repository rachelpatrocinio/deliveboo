<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center align-items-center py-5 flex-column">
      <div class="text-center p-3 col-12 col-sm-auto" :class="success === true ? 'd-none' : 'd-block'">
        <h1>Contattaci</h1>
        <h5 class="mt-3">
          Benvenuto nella sezione contatti.
        </h5>
        <h5 class="mb-3">
          Come possiamo aiutarti?
        </h5>
        <p class="m-0">
          Per ogni esigenza, noi di Deliveboo saremo a tua disposizione.
        </p>
        <p class="m-0">
          Se hai riscontrato qualche problema e non sai come procedere,
        </p>
        <p>
          puoi compilare il seguente form, inserendo tutti i campi richiesti (<span
            class="text-danger fw-bold">*</span>).
        </p>
      </div>
      <!-- con il @submit.prevent, preveniamo l'invio del form -->
      <div class="col-12 col-md-6">
        <form v-if="success === false" @submit.prevent="sendMessage" action="">
          <div class="mb-5">
            <label for="name" class="form-label">
              <h6 class="m-0">Nome <span class="text-danger fw-bold">*</span></h6>
            </label>
            <input type="text" class="form-control" id="name" v-model="name" placeholder="nome cognome" />
            <div v-if="errors.name">
              <p class="text-danger">{{ errors.name.join(" ") }}</p>
            </div>
          </div>
          <div class="mb-5">
            <label for="email" class="form-label">
              <h6 class="m-0">Email <span class="text-danger fw-bold">*</span></h6>
            </label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="email@example.com" />
            <div v-if="errors.email">
              <p class="text-danger">{{ errors.email.join(" ") }}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">
              <h6 class="m-0">Messaggio <span class="text-danger fw-bold">*</span></h6>
            </label>
            <div class="form-floating">
              <textarea v-model="message" id="message" rows="5" class="w-100 h-25 form-control"></textarea>
            </div>
            <div v-if="errors.message">
              <p class="text-danger">{{ errors.message.join(" ") }}</p>
            </div>
          </div>
          <div class="text-center">
            <button class="btn btn-orange mt-4">INVIO</button>
          </div>
        </form>

        <div v-else class="text-center py-3">
          <h2 class="text-success ">L'invio è andato a buon fine.</h2>
          <h4 class="pt-3 m-0">Grazie per averci contatto.</h4>
          <h5 class="m-1">Le risponderemo al più presto!</h5>
          <RouterLink to="/">
            <button class="btn btn-orange mt-5">Torna alla Homepage</button>
          </RouterLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
      errors: {},
      name: "",
      email: "",
      message: "",
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
        .then((res) => {
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
@use "../style/general";
</style>
