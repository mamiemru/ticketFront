<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 5vh">
        Veuillez vous authentifier.
      </div>

      <div class="text-h2" style="opacity:.8">
        <q-input v-model="apiKey" color="white" label="Your APIKey" flat >
            <template v-slot:prepend><q-icon name="key" color="white" /></template>
        </q-input>
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        label="Connexion"
        no-caps
        :disabled="apiKey && apiKey.length < 20"
        @click="login"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiKeyApi from '../api/apikeyApi';

export default defineComponent({
  name: 'ErrorForbiden',
  data() {
    return {
      apiKey: '' as string
    }
  },
  setup() { 
    return {
      APIKEY: 'Api-Key'
    }
  },
  onBeforeMount() {
    let apiKey = window.sessionStorage.getItem(this.APIKEY);
    if (apiKey) {
      this.apiKey = apiKey;
      this.login();
    }
  },
  methods: {
    login() {
      window.sessionStorage.setItem(this.APIKEY, this.apiKey);
      ApiKeyApi.check()
      .then(() => { this.$router.push({ path: '/' }); })
      .catch(() => { alert('wrong'); })
    }
  }
});
</script>
