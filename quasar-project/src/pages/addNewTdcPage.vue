<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated flat
      :key="updateStepper"
    >
      <q-step
        :name="1"
        title="Type de document"
        icon="label"
        :done="step > 1"
      >
        <q-stepper-navigation>
          <div class="column">
            <div class="col-4 row justify-center items-center">
              <h5 caption>Choisisez le type de document</h5>
            </div> 
            <div class="row items-center justify-around" style="height: 70%">  
              <div class="col-3 q-gutter-y-md column">
                <q-btn color="black" class="full-width" label="Ticket de caisse" icon="receipt_long"
                  @click="() => { docType='tdc'; step = 2; $refs.stepper.next(); updateStepper++ }" 
                />
              </div>
              <div class="col-3 q-gutter-y-md column">
                <q-btn color="black" class="full-width" label="Recepiece de carte banquaire" icon="local_atm"
                  @click="() => { docType='recepiece'; step = 2; $refs.stepper.next(); updateStepper++ }" 
                /> 
              </div>
              <div class="col-3 q-gutter-y-md column">
                <q-btn color="black" class="full-width" label="Facture" icon="request_quote"
                  @click="() => { docType='facture'; step = 2; $refs.stepper.next(); updateStepper++ }" 
                /> 
              </div>
            </div>
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Assistance au remplissage"
        icon="settings"
        :done="step > 2"
      >
        <q-stepper-navigation>
          <div class="column">
            <div class="col-4 row justify-around">
              <h5>Choisisez votre mode de renseignement</h5>
            </div> 
            <div class="col-6 row items-center justify-around">  
              <div class="col-4 q-gutter-y-md column">
                <q-btn color="black" class="full-width" label="Renseignement manuel du ticket" icon="draw"
                  @click="() => { $refs.stepper.next(); step = 3; createEmptyTdc(); updateStepper++ }"
                />
              </div>
              <div class="col-4 q-gutter-y-md column">
                <q-btn color="black" class="full-width" label="Renseignement assisté par IA" icon="smart_toy"
                  @click="() => { aiAssistance = true; step = 3; $refs.stepper.next(); updateStepper++ }" 
                /> 
              </div>
            </div>
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Choix du fichier"
        icon="upload_file"
        :done="step > 3"
      >
        <q-stepper-navigation>
          <div class="column">
            <div class="col-4 row justify-around">
              <h5>Importer la pièce jointe</h5>
            </div> 
            <div class="col-4 items-center justify-around">  
              <div class="col-2 q-gutter-y-md column">
                <q-file filled v-model="file" label="Choise file" stack-label />
              </div>
              <div class="col-2 q-gutter-y-md column">
                <q-btn color="black" class="full-width" label="Terminer" :disabled="aiAssistance && !file " 
                  @click="() => { uploadFile(), step = 4; $refs.stepper.next(); updateStepper++ }" 
                /> 
              </div>
            </div>
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Insertion des informations"
        icon="edit_note"
        :done="step > 4"
      >
        <q-stepper-navigation class="column justify-center items-center">
          <q-inner-loading
            :showing="isFileUploading"
            label="Please wait..."
            label-class="text-teal"
            label-style="font-size: 1.1em"
          />

          <ticket-de-caisse-crud v-if="editTdc" :tdc="tdc" :canEdit="true" :canDelete="true" />
        </q-stepper-navigation>
      </q-step>

    </q-stepper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TicketDeCaisseCrud from '../components/ticketdecaissecrud/ticketdecaisseCrud.vue';

import { Article, TDCAttachement, TDCCategory, TDCShop } from '../models/models';
import { TicketDeCaisse } from '../models/models';
import MLService from '../service/MLService'

export default defineComponent({
  name: 'AddTicketDeCaisse',
  components: { TicketDeCaisseCrud },
  data () {
    return {
      articlesListKey: 0,
      updateStepper: 0,
      docType: '' as string,
      aiAssistance: false,
      file: null,
      isFileUploading: false,
      tdc: { category: {} as TDCCategory } as TicketDeCaisse,
      editTdc: false
    }
  },
  setup () {
    return {
      step: 1
    }
  },
  methods: {
    uploadFile() {
      if (this.file) {
        let formData = new FormData();
        formData.append('image', this.file);
        formData.append('category', 'ticket');
        formData.append('type', this.docType);
        formData.append('name', '');
        this.isFileUploading = true;
        MLService.uploadAttachment(formData)
        .then((r) => {
          this.isFileUploading = false;
          this.step = 4;
          this.tdc = Object.assign(this.tdc, r.data);
          this.editTdc = true;
        })
        .catch((r) => {
          this.isFileUploading = false;
          alert(r);
          console.log(r);
        })
      }
    },
    createEmptyTdc() {
      this.isFileUploading = false;
      this.step = 4;
      this.tdc = {
        type: this.docType,
        shop: {} as TDCShop, category: {} as TDCCategory, attachement: {} as TDCAttachement,
        articles: [] as Article[],
        total: 0.0, remise: 0.0
      } as TicketDeCaisse;
      this.editTdc = true;
    }
  }
})
</script>
