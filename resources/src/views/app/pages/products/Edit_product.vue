<template>
  <div class="main-content">
    <breadcumb :page="'Update Product'" :folder="$t('Products')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="Edit_Product" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Product" enctype="multipart/form-data">
        <b-row>
          <b-col md="8" class="mb-2">
            <b-card class="mt-3">
              <b-row>

                <b-modal hide-footer id="open_scan" size="md" title="Barcode Scanner">
                  <qrcode-scanner
                    :qrbox="250" 
                    :fps="10" 
                    style="width: 100%; height: calc(100vh - 56px);"
                    @result="onScan"
                  />
                </b-modal>

                <!-- Name -->
                <b-col md="6" class="mb-2">
                  <validation-provider
                    name="Name"
                    :rules="{required:true , min:3 , max:55}"
                    v-slot="validationContext"
                  >
                    <b-form-group :label="$t('Name_product') + ' ' + '*'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="Name-feedback"
                        label="Name"
                        :placeholder="$t('Enter_Name_Product')"
                        v-model="product.name"
                      ></b-form-input>
                      <b-form-invalid-feedback id="Name-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Code Product -->
                <b-col md="6" class="mb-2">
                  <validation-provider name="Code Product" :rules="{ required: true}">
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      :label="$t('CodeProduct') + ' ' + '*'"
                    >
                      <div class="input-group">
                        <!-- Input group prepend -->
                        <div class="input-group-prepend">
                          <img src="/assets_setup/scan.png" alt="Scan" class="scan-icon" @click="showModal">
                        </div>
                        <b-form-input
                          :class="{'is-invalid': !!errors.length}"
                          :state="errors[0] ? false : (valid ? true : null)"
                          aria-describedby="CodeProduct-feedback"
                          type="text"
                          v-model="product.code"
                        ></b-form-input>
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <a @click="generateNumber()">
                              <i class="i-Bar-Code cursor-pointer"></i>
                            </a>
                          </span>
                        </div>
                        <b-form-invalid-feedback id="CodeProduct-feedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </div>
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="code_exist !=''"
                      >{{code_exist}}</b-alert>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Category -->
                <b-col md="6" class="mb-2">
                  <validation-provider name="category" :rules="{ required: true}">
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      :label="$t('Categorie') + ' ' + '*'"
                    >
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Category')"
                        v-model="product.category_id"
                        :options="categories.map(categories => ({label: categories.name, value: categories.id}))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Unit Product -->
                <b-col md="6" class="mb-2">
                  <validation-provider name="Unit Product" :rules="{ required: true}">
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      :label="$t('UnitProduct') + ' ' + '*'"
                    >
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        v-model="product.unit_id"
                        class="required"
                        required
                        @input="Selected_Unit"
                        :placeholder="$t('Choose_Unit_Product')"
                        :reduce="label => label.value"
                        :options="units.map(unit => ({label: unit.name, value: unit.id}))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Description / Notes -->
                <b-col md="12" class="mb-2">
                  <b-form-group :label="$t('Description')">
                    <textarea
                      rows="3"
                      class="form-control"
                      :placeholder="$t('Afewwords')"
                      v-model="product.note"
                    ></textarea>
                  </b-form-group>
                </b-col>

                <!-- Product Image -->
                <b-col md="12" class="mb-2">
                  <validation-provider name="Image" ref="Image" rules="mimes:image/*">
                    <b-form-group slot-scope="{validate, valid, errors }" label="Product Image">
                      <input
                        :state="errors[0] ? false : (valid ? true : null)"
                        :class="{'is-invalid': !!errors.length}"
                        @change="onFileSelected"
                        label="Choose Image"
                        type="file"
                      >
                      <b-form-invalid-feedback id="Image-feedback">{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

              </b-row>
            </b-card>
          </b-col>

          <b-col md="12" class="mt-3">
            <b-button variant="primary" type="submit" :disabled="SubmitProcessing"><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
            <div v-once class="typo__p" v-if="SubmitProcessing">
              <div class="spinner sm spinner-primary mt-3"></div>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import NProgress from "nprogress";
import { mapActions, mapGetters } from "vuex";

export default {
  metaInfo: {
    title: "Edit Product"
  },
  data() {
    return {
      focused: false,
      timer:null,
      search_input:'',
      product_filter:[],
      materiels: [],
      products_ing: [],
      tag: "",
      len: 8,
      change: false,
      isLoading: true,
      SubmitProcessing:false,
      data: new FormData(),
      categories: [],
      Subcategories: [],
      units: [],
      units_sub: [],
      brands: [],
      roles: {},
      variants: [],
      product: {
        type: "",
        name: "",
        points: "",
        code: "",
        Type_barcode: "",
        cost: "",
        price: "",
        brand_id: "",
        category_id: "",
        TaxNet: "",
        tax_method: "1",
        unit_id: "",
        unit_sale_id: "",
        unit_purchase_id: "",
        stock_alert: "",
        image: "",
        note: "",
        is_variant: false,
        is_imei: false,
        not_selling: false,
      },
      code_exist: ""
    };
  },

  components: {
    VueTagsInput
  },

  computed: {
    ...mapGetters(["currentUserPermissions","currentUser"]),
    totalCost() {
      return this.materiels.reduce((total, materiel) => {
        return total + (materiel.cost * materiel.quantity);
      }, 0);
    }
  },

  watch: {
    "product.name"(val) {
      this.product.code = val;
    }
  },

  methods: {

      //------------------------------Formetted Numbers -------------------------\\
      formatNumber(number, dec) {
      const value = (typeof number === "string"
        ? number
        : number.toString()
      ).split(".");
      if (dec <= 0) return value[0];
      let formated = value[1] || "";
      if (formated.length > dec)
        return `${value[0]}.${formated.substr(0, dec)}`;
      while (formated.length < dec) formated += "0";
      return `${value[0]}.${formated}`;
    },

     //------------------------------ Event Upload Image -------------------------------\\
     async onFileSelected(e) {
      const { valid } = await this.$refs.Image.validate(e);

      if (valid) {
        this.product.image = e.target.files[0];
      } else {
        this.product.image = "";
      }
    },



    //---------------------- get_products_materiels------------------------------\\
    get_products_materiels(value) {
      axios
      .get("get_products_materiels")
      .then(({ data }) => (this.products_ing = data));
    },


    handleFocus() {
      this.focused = true
    },


    handleBlur() {
      this.focused = false
    },


    // Search Products
    search(){
      if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
      }
      if (this.search_input.length < 1) {
      return this.product_filter= [];
      }
      this.timer = setTimeout(() => {
      const product_filter = this.products_ing.filter(ingredient => ingredient.code === this.search_input);
          if(product_filter.length === 1){
              this.SearchProduct(product_filter[0])
          }else{
              this.product_filter=  this.products_ing.filter(ingredient => {
              return (
                  ingredient.name.toLowerCase().includes(this.search_input.toLowerCase()) ||
                  ingredient.code.toLowerCase().includes(this.search_input.toLowerCase())
                  );
              });
          }
      }, 800);

    },

    // get Result Value Search Products
    getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },


      // Submit Search Products
      SearchProduct(result) {
        this.ingredient = {};
        if (
            this.materiels.length > 0 &&
            this.materiels.some(detail => detail.code === result.code)
        ) {
            toastr.error('Product_Already_added');
            
        } else {

            var materiel_tag = {
                product_id:result.product_id,
                name:result.name,
                code:result.code,
                unit_name:result.unit_name,
                cost:result.cost,
                quantity:1,
            }
            this.materiels.push(materiel_tag);
            
        }
        this.search_input= '';
        this.$refs.product_autocomplete.value = "";
        this.product_filter = [];
      },


    //-----------------------------------Delete variant------------------------------\\
    delete_materiel(product_id) {

      for (var i = 0; i < this.materiels.length; i++) {
          if (product_id === this.materiels[i].product_id) {
          this.materiels.splice(i, 1);
          }
      }
    },


    showModal() {
      this.$bvModal.show('open_scan');
      
    },

    onScan (decodedText, decodedResult) {
      const code = decodedText;
      this.product.code = code;
      this.$bvModal.hide('open_scan');
    },


     //------ Generate code
     generateNumber() {
      this.code_exist = "";
      this.product.code = Math.floor(
        Math.pow(10, 7) +
          Math.random() *
            (Math.pow(10, 8) - Math.pow(10, 7) - 1)
      );
    },
    
    //------------- Submit Validation Update Product
    Submit_Product() {
      this.$refs.Edit_Product.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {

            if (this.product.type == 'is_variant' && this.variants.length <= 0) {
              this.makeToast("danger", "The variants array is required.", this.$t("Failed"));
            }else{
              this.Update_Product();
            }
        }
      });
    },

    //------ Validation state fields
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    add_variant(tag) {
      if (
        this.variants.length > 0 &&
        this.variants.some(variant => variant.text === tag)
      ) {
         this.makeToast(
            "warning",
            this.$t("VariantDuplicate"),
            this.$t("Warning")
          );
      } else {
          if(this.tag != ''){
            var variant_tag = {
              var_id: this.variants.length + 1, // generate unique ID
              text: tag
            };
            this.variants.push(variant_tag);
            this.tag = "";
          }else{

            this.makeToast(
              "warning",
              "Please Enter the Variant",
              this.$t("Warning")
            );
            
          }
      }
    },
    //-----------------------------------Delete variant------------------------------\\
    delete_variant(var_id) {
      for (var i = 0; i < this.variants.length; i++) {
        if (var_id === this.variants[i].var_id) {
          this.variants.splice(i, 1);
        }
      }
    },



    //---------------------------------------Get Product Elements ------------------------------\\
    GetElements() {
      let id = this.$route.params.id;
      axios
        .get(`products/${id}/edit`)
        .then(response => {
          this.product = response.data.product;
          this.variants = response.data.product.ProductVariant;
          this.categories = response.data.categories;
          this.brands = response.data.brands;
          this.units = response.data.units;
          this.units_sub = response.data.units_sub;
          if(this.product.type == 'is_combo'){
              this.get_products_materiels();
              this.materiels = response.data.materiels;
          }

          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //---------------------- Get Sub Units with Unit id ------------------------------\\
    Get_Units_SubBase(value) {
      axios
        .get("get_sub_units_by_base?id=" + value)
        .then(({ data }) => (this.units_sub = data));
    },

    //---------------------- Event Select Unit Product ------------------------------\\
    Selected_Unit(value) {
      this.product.unit_id = value;
      this.product.unit_sale_id = value;
      this.product.unit_purchase_id = value;
      if (value) {
        this.Get_Units_SubBase(value);
      }
    },

    //------------------------------ Update Product ------------------------------\\
    Update_Product() {
      
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      self.data = new FormData();
      self.SubmitProcessing = true;

      if (self.product.type == 'is_variant' && self.variants.length > 0) {
        self.product.is_variant = true;
      }else{
        self.product.is_variant = false;
      }

      // append objet product
      Object.entries(self.product).forEach(([key, value]) => {
          self.data.append(key, value);
      });

      
       // append array variants
       if (self.materiels.length && self.product.type == 'is_combo') {
        self.data.append("materiels", JSON.stringify(self.materiels));
      }
                
      //append array variants
      if (self.variants.length) {
          for (var i = 0; i < self.variants.length; i++) {
          Object.entries(self.variants[i]).forEach(([key, value]) => {
              self.data.append("variants[" + i + "][" + key + "]", value);
          });
          }
      }


      self.data.append("_method", "put");

      //send Data with axios
      axios
        .post("products/" + this.product.id, self.data)
        .then(response => {
          NProgress.done();
          self.SubmitProcessing = false;
          this.$router.push({ name: "index_products" });
          this.makeToast(
            "success",
            this.$t("Successfully_Updated"),
            this.$t("Success")
          );
        })
        .catch(error => {
            NProgress.done();
            self.SubmitProcessing = false;
            if (error.errors.code && error.errors.code.length > 0) {
              self.code_exist = error.errors.code[0];
              this.makeToast("danger", error.errors.code[0], this.$t("Failed"));
            }else if(error.errors.variants && error.errors.variants.length > 0){
              this.makeToast("danger", error.errors.variants[0], this.$t("Failed"));
            }else{
              this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
            }
        });
    }
  }, //end Methods

  //-----------------------------Created function-------------------

  created: function() {
    this.GetElements();
  }
};
</script>

<style>
  .scan-icon {
    width: 43px;
    height: 34px;
    margin-right: 8px; /* Adjust spacing as needed */
    cursor: pointer;
  }
</style>
