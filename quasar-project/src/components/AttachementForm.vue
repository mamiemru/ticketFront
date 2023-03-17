<template>
  <div class="col-5">
    <div class="column" v-if="!isFileUploading">
      <div class="self-center">
        <p caption>Importer une Image (optionel)</p>
      </div> 
      <div class="self-center">  
        <div class="column">
          <q-file filled v-model="file" label="Choisir fichier" stack-label />
        </div>
        <div class="self-center">
          <q-btn color="black" class="full-width" label="Envoyer"
          @click="uploadLateAttachementFile" 
          /> 
        </div>
      </div>
    </div>
    <q-inner-loading v-else
        :showing="isFileUploading"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
    />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

import ImageService from '../service/ImageService';

export default defineComponent({
  name: 'AttachementForm',
  props: {
      category: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: false,
        default: ''
      }
  },
  data () {
    return {
      file: null,
      isFileUploading: false,
    }
  },
  methods: {
    uploadLateAttachementFile() {
      if (this.file) {
        let formData = new FormData();
        formData.append('image', this.file);
        formData.append('category', this.category);
        formData.append('type', this.type);
        formData.append('name', this.name);
        this.isFileUploading = true;
        ImageService.uploadAttachment(formData)
        .then((r) => {
          this.isFileUploading = false;
          this.$emit('submited', r.data);
        })
        .catch(() => {
          this.isFileUploading = false;
          this.$emit('error');
        })
      }
    }
  }
})
</script>
