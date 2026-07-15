<template>
  <div class="main-content">
    <breadcumb :page="$t('AddPurchase')" :folder="$t('ListPurchases')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="create_purchase" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Purchase">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row>

                <b-modal hide-footer id="open_scan" size="md" title="Barcode Scanner">
                  <qrcode-scanner
                    :qrbox="250" 
                    :fps="10" 
                    style="width: 100%; height: calc(100vh - 56px);"
                    @result="onScan"
                  />
                </b-modal>

                <!-- date  -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                    name="date"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <b-form-group :label="$t('date') + ' ' + '*'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="date-feedback"
                        type="date"
                        v-model="purchase.date"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="OrderTax-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Supplier -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider name="Supplier" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('Supplier') + ' ' + '*'">
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        v-model="purchase.supplier_id"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Supplier')"
                         :options="supplierOptions"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
 
                <!-- warehouse -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider name="warehouse" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('warehouse') + ' ' + '*'">
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        @input="Selected_Warehouse"
                        v-model="purchase.warehouse_id"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Warehouse')"
                        :options="warehouseOptions"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Product -->
                <b-col md="12" class="mb-5">
                  <h6>{{$t('ProductName')}}</h6>
                  <div class="d-flex align-items-center">
                    <v-select
                      v-model="selectedProductId"
                      @input="Quick_Product_Select"
                      :reduce="label => label.value"
                      placeholder="Quickly Choose Product..."
                      :options="getFilteredQuickProducts(quickProductSearch)"
                      :filterable="false"
                      @search="query => quickProductSearch = query"
                      @open="quickProductSearch = ''"
                      class="flex-grow-1 mr-2"
                    />
                    <b-button variant="primary" @click="showModal" style="height: 43px; display: flex; align-items: center; justify-content: center;">
                      <img src="/assets_setup/scan.png" alt="Scan" style="height: 24px; filter: invert(1);">
                    </b-button>
                  </div>
                </b-col>

                <!-- Order products  -->
                <b-col md="12">
                  <h5>{{$t('order_products')}} *</h5>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead class="bg-gray-300">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">{{$t('ProductName')}}</th>
                          <th scope="col" style="width: 250px;">{{$t('Qty')}}</th>
                          <th scope="col" style="width: 250px;">{{$t('Amount')}}</th>
                          <th scope="col" class="text-center">
                            <i class="i-Close-Window text-25"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="detail in details" :key="detail.detail_id">
                          <td>{{detail.detail_id}}</td>
                          <td>
                            <v-select
                              v-model="detail.product_id"
                              :reduce="label => label.value"
                              :placeholder="$t('Choose_Product')"
                              :options="getFilteredProducts(detail.search)"
                              :filterable="false"
                              @search="query => $set(detail, 'search', query)"
                              @open="$set(detail, 'search', '')"
                              @input="onGridProductChange(detail)"
                              class="grid-v-select"
                              append-to-body
                            />
                          </td>
                          <td>
                            <b-form-input
                              v-model.number="detail.quantity"
                              @keyup="Verified_Qty(detail,detail.detail_id)"
                              type="text"
                              inputmode="decimal"
                              class="form-control text-center"
                              style="height: 60px; font-size: 1.8rem; font-weight: bold;"
                            ></b-form-input>
                          </td>
                          <td>
                            <b-form-input
                              v-model.number="detail.subtotal"
                              @keyup="Manual_Amount_Update(detail)"
                              type="text"
                              inputmode="decimal"
                              class="form-control text-right"
                              style="height: 60px; font-size: 1.8rem; font-weight: bold;"
                            ></b-form-input>
                          </td>
                          <td class="text-center">
                            <i @click="delete_Product_Detail(detail.detail_id)" class="i-Close-Window text-25 text-danger cursor-pointer"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>

                <div class="offset-md-9 col-md-3 mt-4">
                  <table class="table table-striped table-sm">
                    <tbody>
                      <tr>
                        <td>
                          <span class="font-weight-bold">{{$t('Total')}}</span>
                        </td>
                        <td>
                          <span class="font-weight-bold">{{currentUser.currency}} {{GrandTotal.toFixed(2)}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Status  -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider name="Status" :rules="{ required: true}">
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('Status') + ' ' + '*'">
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        v-model="purchase.statut"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Status')"
                        :options="
                          [
                            {label: 'received', value: 'received'},
                            {label: 'pending', value: 'pending'},
                            {label: 'ordered', value: 'ordered'}
                          ]"
                      ></v-select>
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col md="12">
                  <b-form-group :label="$t('Note')">
                    <textarea
                      v-model="purchase.notes"
                      rows="4"
                      class="form-control"
                      :placeholder="$t('Afewwords')"
                    ></textarea>
                  </b-form-group>
                </b-col>
                <b-col md="12" class="mt-4 border-top pt-3 d-flex justify-content-end">
                  <div>
                    <b-button variant="primary" class="m-1" @click="Submit_Purchase" :disabled="SubmitProcessing">
                      <i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <!-- Modal Update Detail Product -->
    <validation-observer ref="Update_Detail_purchase">
      <b-modal hide-footer size="lg" id="form_Update_Detail" :title="detail.name">
        <b-form @submit.prevent="submit_Update_Detail">
          <b-row>
            <!-- Tax Method -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider name="Tax Method" :rules="{ required: true}">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('TaxMethod') + ' ' + '*'">
                  <v-select
                    :class="{'is-invalid': !!errors.length}"
                    :state="errors[0] ? false : (valid ? true : null)"
                    v-model="detail.tax_method"
                    :reduce="label => label.value"
                    :placeholder="$t('Choose_Method')"
                    :options="
                      [
                        {label: 'Exclusive', value: '1'},
                        {label: 'Inclusive', value: '2'}
                      ]"
                  ></v-select>
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Tax Rate -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider
                name="Order Tax"
                :rules="{ required: true , regex: /^\d*\.?\d*$/}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('OrderTax') + ' ' + '*'">
                  <b-input-group append="%">
                    <b-form-input
                      label="Order Tax"
                      v-model.number="detail.tax_percent"
                      :state="getValidationState(validationContext)"
                      aria-describedby="OrderTax-feedback"
                    ></b-form-input>
                  </b-input-group>
                  <b-form-invalid-feedback id="OrderTax-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Discount Method -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider name="Discount Method" :rules="{ required: true}">
                <b-form-group slot-scope="{ valid, errors }" :label="$t('Discount_Method') + ' ' + '*'">
                  <v-select
                    v-model="detail.discount_Method"
                    :reduce="label => label.value"
                    :placeholder="$t('Choose_Method')"
                    :class="{'is-invalid': !!errors.length}"
                    :state="errors[0] ? false : (valid ? true : null)"
                    :options="
                      [
                        {label: 'Percent %', value: '1'},
                        {label: 'Fixed', value: '2'}
                      ]"
                  ></v-select>
                  <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Discount Rate -->
            <b-col lg="6" md="6" sm="12">
              <validation-provider
                name="Discount Rate"
                :rules="{ required: true , regex: /^\d*\.?\d*$/}"
                v-slot="validationContext"
              >
                <b-form-group :label="$t('Discount') + ' ' + '*'">
                  <b-form-input
                    label="Discount"
                    v-model.number="detail.discount"
                    :state="getValidationState(validationContext)"
                    aria-describedby="Discount-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Discount-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Imei or serial numbers -->
            <b-col lg="12" md="12" sm="12" v-show="detail.is_imei">
              <b-form-group :label="$t('Add_product_IMEI_Serial_number')">
                <b-form-input
                  label="Add_product_IMEI_Serial_number"
                  v-model="detail.imei_number"
                  :placeholder="$t('Add_product_IMEI_Serial_number')"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group>
                <b-button
                  variant="primary"
                  type="submit"
                  :disabled="Submit_Processing_detail"
                ><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
                <div v-once class="typo__p" v-if="Submit_Processing_detail">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Create Purchase"
  },
  data() {
    return {
      focused: false,
      timer: null,
      search_input: '',
      product_filter: [],
      isLoading: true,
      SubmitProcessing: false,
      Submit_Processing_detail: false,
      selectedProductId: null,
      quickProductSearch: "",
      warehouses: [],
      suppliers: [],
      products: [],
      details: [],
      detail: {},
      purchases: [],
      purchase: {
        id: "",
        statut: "received",
        date: new Date().toISOString().slice(0, 10),
        notes: "",
        supplier_id: "",
        warehouse_id: "",
        tax_rate: 0,
        TaxNet: 0,
        shipping: 0,
        discount: 0
      },
      total: 0,
      GrandTotal: 0,
      product: {
        id: "",
        code: "",
        stock: "",
        quantity: 1,
        discount: "",
        DiscountNet: "",
        discount_Method: "",
        name: "",
        no_unit: "",
        unitPurchase: "",
        purchase_unit_id: "",
        Net_cost: "",
        Total_cost: "",
        Unit_cost: "",
        subtotal: "",
        product_id: "",
        detail_id: "",
        taxe: "",
        tax_percent: "",
        tax_method: "",
        product_variant_id: "",
        del: "",
        is_imei: "",
        imei_number: ""
      }
    };
  },
  computed: {
    ...mapGetters(["currentUserPermissions", "currentUser"]),
    supplierOptions() {
      return this.suppliers.map(s => ({ label: s.name, value: s.id }));
    },
    warehouseOptions() {
      return this.warehouses.map(w => ({ label: w.name, value: w.id }));
    },
    productOptions() {
      return this.products.map(p => ({ label: p.name + ' (' + p.code + ')', value: p.id }));
    },
    quickProductOptions() {
      return this.products.map(p => ({ label: p.name + ' (' + p.code + ')', value: p }));
    }
  },

  methods: {
    showModal() {
      this.$bvModal.show('open_scan');
    },

    onScan(decodedText, decodedResult) {
      const code = decodedText;
      this.search_input = code;
      this.search();
      this.$bvModal.hide('open_scan');
    },

    handleFocus() {
      this.focused = true;
    },

    handleBlur() {
      this.focused = false;
    },

    Submit_Purchase() {
      this.$refs.create_purchase.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          this.Create_Purchase();
        }
      });
    },

    submit_Update_Detail() {
      this.$refs.Update_Detail_purchase.validate().then(success => {
        if (!success) {
          return;
        } else {
          this.Update_Detail();
        }
      });
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    Modal_Updat_Detail(detail) {
      NProgress.start();
      NProgress.set(0.1);
      this.detail = {};
      this.detail.name = detail.name;
      this.detail.detail_id = detail.detail_id;
      this.detail.Unit_cost = detail.Unit_cost;
      this.detail.tax_method = detail.tax_method;
      this.detail.discount_Method = detail.discount_Method;
      this.detail.discount = detail.discount;
      this.detail.quantity = detail.quantity;
      this.detail.tax_percent = detail.tax_percent;
      this.detail.is_imei = detail.is_imei;
      this.detail.imei_number = detail.imei_number;

      setTimeout(() => {
        NProgress.done();
        this.$bvModal.show("form_Update_Detail");
      }, 1000);
    },

    Update_Detail() {
      NProgress.start();
      NProgress.set(0.1);
      this.Submit_Processing_detail = true;
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === this.detail.detail_id) {
          this.details[i].tax_percent = this.detail.tax_percent;
          this.details[i].Unit_cost = this.detail.Unit_cost;
          this.details[i].quantity = this.detail.quantity;
          this.details[i].tax_method = this.detail.tax_method;
          this.details[i].discount_Method = this.detail.discount_Method;
          this.details[i].discount = this.detail.discount;
          this.details[i].imei_number = this.detail.imei_number;

          if (this.details[i].discount_Method == "2") {
            this.details[i].DiscountNet = this.detail.discount;
          } else {
            this.details[i].DiscountNet = parseFloat(
              (this.detail.Unit_cost * this.details[i].discount) / 100
            );
          }

          if (this.details[i].tax_method == "1") {
            this.details[i].Net_cost = parseFloat(
              this.detail.Unit_cost - this.details[i].DiscountNet
            );
            this.details[i].taxe = parseFloat(
              (this.detail.tax_percent *
                (this.detail.Unit_cost - this.details[i].DiscountNet)) /
                100
            );
          } else {
            this.details[i].taxe = parseFloat(
              (this.detail.Unit_cost - this.details[i].DiscountNet) *
                (this.detail.tax_percent / 100)
            );
            this.details[i].Net_cost = parseFloat(
              this.detail.Unit_cost -
                this.details[i].taxe -
                this.details[i].DiscountNet
            );
          }
          this.$forceUpdate();
        }
      }
      this.Calcul_Total();

      setTimeout(() => {
        NProgress.done();
        this.Submit_Processing_detail = false;
        this.$bvModal.hide("form_Update_Detail");
      }, 1000);
    },

    Verified_Qty(detail, id) {
      if (isNaN(detail.quantity) || detail.quantity === "") {
        detail.quantity = 0;
      }
      detail.quantity = parseFloat(detail.quantity);
      if (detail.subtotal > 0 && detail.quantity > 0) {
        detail.Unit_cost = parseFloat((detail.subtotal / detail.quantity).toFixed(2));
      } else {
        detail.subtotal = parseFloat((detail.quantity * detail.Unit_cost).toFixed(2));
      }
      this.Calcul_Total();
    },

    Manual_Amount_Update(detail) {
      detail.subtotal = parseFloat(detail.subtotal || 0);
      if (detail.quantity > 0) {
        detail.Unit_cost = parseFloat((detail.subtotal / detail.quantity).toFixed(2));
      }
      this.Calcul_Total();
    },

    Quick_Product_Select(product) {
      if (product) {
        this.SearchProduct(product);
        this.selectedProductId = null;
      }
    },

    onGridProductChange(detail) {
      const product = this.products.find(p => p.id === detail.product_id);
      if (product) {
        detail.name = product.name;
        detail.code = product.code;
        detail.Unit_cost = product.Net_cost;
        detail.tax_method = product.tax_method;
        detail.tax_percent = product.tax_percent;
        detail.is_imei = product.is_imei;
        
        axios.get("/show_product_data/" + product.id + "/" + (product.product_variant_id || "null")).then(response => {
          detail.Unit_cost = response.data.Unit_cost;
          detail.tax_percent = response.data.tax_percent;
          detail.tax_method = response.data.tax_method;
          detail.purchase_unit_id = response.data.purchase_unit_id;
          this.Verified_Qty(detail, detail.detail_id);
        });
      }
    },

    search() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.search_input.length < 2) {
        return (this.product_filter = []);
      }
      if (this.purchase.warehouse_id != "" && this.purchase.warehouse_id != null) {
        this.timer = setTimeout(() => {
          const product_filter = this.products.filter(
            product => product.code === this.search_input || product.barcode.includes(this.search_input)
          );
          if (product_filter.length === 1) {
            this.SearchProduct(product_filter[0]);
          } else {
            this.product_filter = this.products.filter(product => {
              return (
                product.name.toLowerCase().includes(this.search_input.toLowerCase()) ||
                product.code.toLowerCase().includes(this.search_input.toLowerCase()) ||
                product.barcode.toLowerCase().includes(this.search_input.toLowerCase())
              );
            });
            if (this.product_filter.length <= 0) {
              this.makeToast("warning", "Product Not Found", "Warning");
            }
          }
        }, 800);
      } else {
        this.makeToast(
          "warning",
          this.$t("SelectWarehouse"),
          this.$t("Warning")
        );
      }
    },

    getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },

    SearchProduct(result) {
      this.product = {};
      if (
        this.details.length > 0 &&
        this.details.some(detail => detail.code === result.code)
      ) {
        this.makeToast("warning", this.$t("AlreadyAdd"), this.$t("Warning"));
      } else {
        this.product.code = result.code;
        this.product.quantity = 1;
        this.product.no_unit = 1;
        this.product.stock = result.qte_purchase;
        this.product.product_variant_id = result.product_variant_id;
        this.Get_Product_Details(result.id, result.product_variant_id);
      }

      this.search_input = '';
      if (this.$refs.product_autocomplete) {
        this.$refs.product_autocomplete.value = "";
      }
      this.product_filter = [];
    },

    Selected_Warehouse(value) {
      this.search_input = '';
      this.product_filter = [];
      this.Get_Products_By_Warehouse(value);
    },

    Get_Products_By_Warehouse(id) {
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get("get_Products_by_warehouse/" + id + "?stock=" + 0 + "&product_service=" + 0)
        .then(response => {
          this.products = response.data;
          NProgress.done();
        })
        .catch(error => {
          NProgress.done();
        });
    },

    add_product() {
      if (this.details.length > 0) {
        this.Last_Detail_id();
      } else if (this.details.length === 0) {
        this.product.detail_id = 1;
      }
      this.details.push(this.product);

      if (this.product.is_imei) {
        this.Modal_Updat_Detail(this.product);
      }
    },

    formatNumber(number, dec) {
      const value = (typeof number === "string" ? number : number.toString()).split(".");
      if (dec <= 0) return value[0];
      let formated = value[1] || "";
      if (formated.length > dec) return `${value[0]}.${formated.substr(0, dec)}`;
      while (formated.length < dec) formated += "0";
      return `${value[0]}.${formated}`;
    },

    Calcul_Total() {
      this.total = 0;
      for (var i = 0; i < this.details.length; i++) {
        const detail = this.details[i];
        detail.subtotal = parseFloat(parseFloat(detail.subtotal || 0).toFixed(2));
        this.total = parseFloat((this.total + detail.subtotal).toFixed(2));
      }
      this.GrandTotal = parseFloat(this.total.toFixed(2));
    },

    delete_Product_Detail(id) {
      for (var i = 0; i < this.details.length; i++) {
        if (id === this.details[i].detail_id) {
          this.details.splice(i, 1);
          this.Calcul_Total();
        }
      }
    },

    verifiedForm() {
      if (this.details.length <= 0) {
        this.makeToast(
          "warning",
          this.$t("AddProductToList"),
          this.$t("Warning")
        );
        return false;
      } else {
        var count = 0;
        for (var i = 0; i < this.details.length; i++) {
          if (this.details[i].quantity == "" || this.details[i].quantity === 0) {
            count += 1;
          }
        }
        if (count > 0) {
          this.makeToast("warning", this.$t("AddQuantity"), this.$t("Warning"));
          return false;
        } else {
          return true;
        }
      }
    },

    Create_Purchase() {
      if (this.verifiedForm()) {
        this.SubmitProcessing = true;
        NProgress.start();
        NProgress.set(0.1);
        axios
          .post("purchases", {
            date: this.purchase.date,
            supplier_id: this.purchase.supplier_id,
            warehouse_id: this.purchase.warehouse_id,
            statut: this.purchase.statut,
            notes: this.purchase.notes,
            tax_rate: this.purchase.tax_rate ? this.purchase.tax_rate : 0,
            TaxNet: this.purchase.TaxNet ? this.purchase.TaxNet : 0,
            discount: this.purchase.discount ? this.purchase.discount : 0,
            shipping: this.purchase.shipping ? this.purchase.shipping : 0,
            GrandTotal: this.GrandTotal,
            details: this.details
          })
          .then(response => {
            NProgress.done();
            this.makeToast(
              "success",
              this.$t("Successfully_Created"),
              this.$t("Success")
            );
            this.SubmitProcessing = false;
            this.$router.push({ name: "index_purchases" });
          })
          .catch(error => {
            NProgress.done();
            this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
            this.SubmitProcessing = false;
          });
      }
    },

    Last_Detail_id() {
      this.product.detail_id = 0;
      var len = this.details.length;
      this.product.detail_id = this.details[len - 1].detail_id + 1;
    },

    Get_Product_Details(product_id, variant_id) {
      axios.get("/show_product_data/" + product_id + "/" + variant_id).then(response => {
        this.product.del = 0;
        this.product.id = 0;
        this.product.discount = response.data.discount;
        this.product.DiscountNet = response.data.DiscountNet;
        this.product.discount_Method = response.data.discount_method;
        this.product.product_id = response.data.id;
        this.product.name = response.data.name;
        this.product.Net_cost = response.data.Net_cost;
        this.product.Unit_cost = response.data.Unit_cost;
        this.product.taxe = response.data.tax_cost;
        this.product.tax_method = response.data.tax_method;
        this.product.tax_percent = response.data.tax_percent;
        this.product.unitPurchase = response.data.unitPurchase;
        this.product.purchase_unit_id = response.data.purchase_unit_id;
        this.product.is_imei = response.data.is_imei;
        this.product.imei_number = '';
        this.add_product();
        this.Calcul_Total();
      });
    },

    GetElements() {
      axios
        .get("purchases/create")
        .then(response => {
          this.suppliers = response.data.suppliers;
          this.warehouses = response.data.warehouses;
          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    getFilteredProducts(search) {
      const q = (search || '').toLowerCase();
      const filtered = this.productOptions.filter(p => p.label.toLowerCase().includes(q));
      return filtered.slice(0, 50);
    },

    getFilteredQuickProducts(search) {
      const q = (search || '').toLowerCase();
      const filtered = this.quickProductOptions.filter(p => p.label.toLowerCase().includes(q));
      return filtered.slice(0, 50);
    }
  },

  created() {
    this.GetElements();
  }
};
</script>

<style scoped>
  .main-content, .main-content label, .main-content input, .main-content .v-select, .main-content .table, .main-content .badge {
    font-size: 1.3rem !important;
  }
  .main-content .form-control {
    height: calc(1.5em + 1.1rem + 2px) !important;
    font-size: 1.3rem !important;
  }
  .grid-v-select >>> .vs__dropdown-toggle {
    border: none !important;
    background: transparent !important;
    border-radius: 0;
    min-height: 60px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
  }
  .grid-v-select.vs--open >>> .vs__dropdown-toggle {
    background: #fff !important;
    box-shadow: inset 0 0 0 2px #716aca;
  }
</style>

<style>
  .input-with-icon {
    display: flex;
    align-items: center;
  }
  .scan-icon {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    cursor: pointer;
  }
</style>