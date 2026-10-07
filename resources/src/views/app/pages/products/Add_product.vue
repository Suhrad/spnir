<template>
  <div class="main-content">
    <breadcumb :page="$t('AddProduct')" :folder="$t('Products')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="Create_Product" v-if="!isLoading">
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

            <!-- Opening Stock per warehouse (optional) -->
            <b-card class="mt-3" :header="$t('OpeningStock')" v-if="warehouses.length > 0">
              <b-row>
                <b-col
                  md="6"
                  class="mb-2"
                  v-for="wh in warehouses"
                  :key="wh.id"
                >
                  <h6 class="mb-1">{{ wh.name }}</h6>
                  <b-form-group>
                    <b-form-input
                      type="number"
                      min="0"
                      placeholder="0"
                      v-model.number="product.warehouses[wh.id].qte"
                    />
                  </b-form-group>
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
    title: "Create Product"
  },
  data() {
    return {
      focused: false,
      timer:null,
      search_input:'',
      product_filter:[],
      warehouses: [],   
      tag: "",
      len: 8,
      change: false,
      isLoading: true,
      SubmitProcessing: false,
      data: new FormData(),
      categories: [],
      units: [],
      units_sub: [],
      brands: [],
      roles: {},
      variants: [],
      materiels: [],
      products_ing: [],
      product: {
        warehouses: {},
        type: "is_single",
        name: "",
        code: "",
        points: "0",
        Type_barcode: "CODE128",
        cost: "0",
        price: "0",
        brand_id: "",
        category_id: "",
        TaxNet: "0",
        tax_method: "1",
        discount_method: "1",
        discount: "0",
        unit_id: "",
        unit_sale_id: "",
        unit_purchase_id: "",
        stock_alert: "0",
        image: "",
        note: "",
        is_variant: false,
        is_imei: false,
        not_selling: false,
        is_featured: false,
        warranty_period: null,
        warranty_unit: 'months',
        warranty_terms: '',
        has_guarantee: false,
        guarantee_period: null,
        guarantee_unit: 'months',
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

    
      //---------------------- Event Selected_product_type------------------------------\\
      Selected_Type_Product(value) {

        this.products_ing = [];
        if(value == 'is_combo'){
            this.get_products_materiels();
        }
      },


  //---------------------- get_products_materiels------------------------------\\
  get_products_materiels(value) {
  axios
    .get("get_products_materiels")
    .then(({ data }) => (this.products_ing = data));
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

    handleFocus() {
    this.focused = true
  },


  handleBlur() {
    this.focused = false
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



  // Submit Search Products
  SearchProduct(result) {
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


    //------------- Submit Validation Create Product
    Submit_Product() {
      this.$refs.Create_Product.validate().then(success => {
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
              this.Create_Product();
            }

        }
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

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //------ Validation State
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },


    //-------------- Product Get Elements
    GetElements() {
      axios
        .get("products/create")
        .then(response => {
          this.categories = response.data.categories;
          this.brands = response.data.brands;
          this.units = response.data.units;
          this.warehouses = response.data.warehouses;

            // 2) initialize product.warehouses so each key exists reactively
            response.data.warehouses.forEach(wh => {
              // each wh has { id, name, qte, manage_stock }
              this.$set(this.product.warehouses, wh.id, {
                qte:          wh.qte,
              })
            })

          // Auto-select 'kg' unit or first available unit
          if (!this.product.unit_id && this.units && this.units.length > 0) {
            const kgUnit = this.units.find(u => u.name && u.name.toLowerCase() === 'kg');
            const defaultUnitId = kgUnit ? kgUnit.id : this.units[0].id;
            this.product.unit_id = defaultUnitId;
            this.Selected_Unit(defaultUnitId);
          }

          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
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

    //------------------------------ Create new Product ------------------------------\\
    Create_Product() {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      self.SubmitProcessing = true;

      if (self.product.type == 'is_variant' && self.variants.length > 0) {
          self.product.is_variant = true;
      }else{
        self.product.is_variant = false;
      }

       // append array variants
       if (self.materiels.length && self.product.type == 'is_combo') {
        self.data.append("materiels", JSON.stringify(self.materiels));
      }

           
      // append objet product
      Object.entries(self.product).forEach(([key, value]) => {
          self.data.append(key, value);
      });


      // append array variants
      if (self.variants.length) {
        self.data.append("variants", JSON.stringify(self.variants));
      }

      if (Object.keys(self.product.warehouses).length && self.product.type == 'is_single') {
        self.data.append(
          "warehouses",
          JSON.stringify(self.product.warehouses)
        );
      }
   
      // Send Data with axios
      axios
        .post("products", self.data)
        .then(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          self.SubmitProcessing = false;
          this.$router.push({ name: "index_products" });
          this.makeToast(
            "success",
            this.$t("Successfully_Created"),
            this.$t("Success")
          );
        })
        .catch(error => {
          // Complete the animation of theprogress bar.
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
