"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["store_sale"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: "Create Sale"
  },
  data: function data() {
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
      clients: [],
      products: [],
      details: [],
      detail: {},
      sales: [],
      selectedClientPoints: 0,
      showPointsSection: false,
      discount_from_points: 0,
      used_points: 0,
      clientIsEligible: false,
      pointsConverted: false,
      point_to_amount_rate: 0,
      transporters: [],
      sale: {
        id: "",
        date: new Date().toISOString().slice(0, 10),
        statut: "completed",
        notes: "",
        transporter_name: "",
        lr_number: "",
        client_id: "",
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
        rate: "",
        discount: "",
        DiscountNet: "",
        discount_Method: "",
        sale_unit_id: "",
        no_unit: "",
        name: "",
        unitSale: "",
        Net_price: "",
        Total_price: "",
        Unit_price: "",
        subtotal: "",
        product_id: "",
        detail_id: "",
        taxe: "",
        tax_percent: "",
        tax_method: "",
        product_variant_id: "",
        del: "",
        etat: "",
        is_imei: "",
        imei_number: ""
      }
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUserPermissions", "currentUser"])), {}, {
    clientOptions: function clientOptions() {
      return this.clients.map(function (c) {
        return {
          label: c.name,
          value: c.id
        };
      });
    },
    warehouseOptions: function warehouseOptions() {
      return this.warehouses.map(function (w) {
        return {
          label: w.name,
          value: w.id
        };
      });
    },
    productOptions: function productOptions() {
      return this.products.map(function (p) {
        return {
          label: p.name + ' (' + p.code + ')',
          value: p.id
        };
      });
    },
    transporterOptions: function transporterOptions() {
      return this.transporters.map(function (t) {
        return {
          label: t.name,
          value: t.name
        };
      });
    },
    quickProductOptions: function quickProductOptions() {
      return this.products.map(function (p) {
        return {
          label: p.name + ' (' + p.code + ')',
          value: p
        };
      });
    }
  }),
  methods: {
    showModal: function showModal() {
      this.$bvModal.show('open_scan');
    },
    onScan: function onScan(decodedText, decodedResult) {
      var code = decodedText;
      this.search_input = code;
      this.search();
      this.$bvModal.hide('open_scan');
    },
    handleFocus: function handleFocus() {
      this.focused = true;
    },
    handleBlur: function handleBlur() {
      this.focused = false;
    },
    Submit_Sale: function Submit_Sale() {
      var _this = this;
      this.$refs.create_sale.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          _this.Create_Sale();
        }
      });
    },
    submit_Update_Detail: function submit_Update_Detail() {
      var _this2 = this;
      this.$refs.Update_Detail.validate().then(function (success) {
        if (!success) {
          return;
        } else {
          _this2.Update_Detail();
        }
      });
    },
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    Modal_Updat_Detail: function Modal_Updat_Detail(detail) {
      var _this3 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.detail = {};
      this.detail.name = detail.name;
      this.detail.detail_id = detail.detail_id;
      this.detail.Unit_price = detail.Unit_price;
      this.detail.tax_method = detail.tax_method;
      this.detail.discount_Method = detail.discount_Method;
      this.detail.discount = detail.discount;
      this.detail.quantity = detail.quantity;
      this.detail.tax_percent = detail.tax_percent;
      this.detail.is_imei = detail.is_imei;
      this.detail.imei_number = detail.imei_number;
      setTimeout(function () {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this3.$bvModal.show("form_Update_Detail");
      }, 1000);
    },
    Update_Detail: function Update_Detail() {
      var _this4 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.Submit_Processing_detail = true;
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === this.detail.detail_id) {
          this.details[i].tax_percent = this.detail.tax_percent;
          this.details[i].Unit_price = this.detail.Unit_price;
          this.details[i].quantity = this.detail.quantity;
          this.details[i].tax_method = this.detail.tax_method;
          this.details[i].discount_Method = this.detail.discount_Method;
          this.details[i].discount = this.detail.discount;
          this.details[i].imei_number = this.detail.imei_number;
          if (this.details[i].discount_Method == "2") {
            this.details[i].DiscountNet = this.detail.discount;
          } else {
            this.details[i].DiscountNet = parseFloat(this.detail.Unit_price * this.details[i].discount / 100);
          }
          if (this.details[i].tax_method == "1") {
            this.details[i].Net_price = parseFloat(this.detail.Unit_price - this.details[i].DiscountNet);
            this.details[i].taxe = parseFloat(this.detail.tax_percent * (this.detail.Unit_price - this.details[i].DiscountNet) / 100);
          } else {
            this.details[i].taxe = parseFloat((this.detail.Unit_price - this.details[i].DiscountNet) * (this.detail.tax_percent / 100));
            this.details[i].Net_price = parseFloat(this.detail.Unit_price - this.details[i].taxe - this.details[i].DiscountNet);
          }
          this.$forceUpdate();
        }
      }
      this.Calcul_Total();
      setTimeout(function () {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this4.Submit_Processing_detail = false;
        _this4.$bvModal.hide("form_Update_Detail");
      }, 1000);
    },
    Verified_Qty: function Verified_Qty(detail, id) {
      if (isNaN(detail.quantity) || detail.quantity === "") {
        detail.quantity = 0;
      }
      detail.quantity = parseFloat(detail.quantity);
      var rate = parseFloat(detail.rate || 0);
      detail.subtotal = parseFloat((detail.quantity * rate).toFixed(2));
      this.Calcul_Total();
    },
    Verified_Rate: function Verified_Rate(detail) {
      if (isNaN(detail.rate) || detail.rate === "") {
        detail.rate = 0;
      }
      detail.rate = parseFloat(detail.rate);
      detail.Unit_price = detail.rate;
      if (detail.quantity > 0) {
        detail.subtotal = parseFloat((detail.quantity * detail.rate).toFixed(2));
      }
      this.Calcul_Total();
    },
    Manual_Amount_Update: function Manual_Amount_Update(detail) {
      detail.subtotal = parseFloat(detail.subtotal || 0);
      if (detail.quantity > 0) {
        detail.Unit_price = parseFloat((detail.subtotal / detail.quantity).toFixed(2));
        detail.rate = detail.Unit_price;
      }
      this.Calcul_Total();
    },
    onGridProductChange: function onGridProductChange(detail) {
      var _this5 = this;
      var product = this.products.find(function (p) {
        return p.id === detail.product_id;
      });
      if (product) {
        detail.name = product.name;
        detail.code = product.code;
        detail.Unit_price = product.Net_price;
        detail.tax_method = product.tax_method;
        detail.tax_percent = product.tax_percent;
        detail.is_imei = product.is_imei;
        axios.get("/show_product_data/" + product.id + "/" + (product.product_variant_id || "null")).then(function (response) {
          detail.Unit_price = response.data.Unit_price;
          detail.rate = response.data.Unit_price;
          detail.tax_percent = response.data.tax_percent;
          detail.tax_method = response.data.tax_method;
          detail.sale_unit_id = response.data.sale_unit_id;
          _this5.Verified_Qty(detail, detail.detail_id);
        });
      }
    },
    search: function search() {
      var _this6 = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.search_input.length < 2) {
        return this.product_filter = [];
      }
      if (this.sale.warehouse_id != "" && this.sale.warehouse_id != null) {
        this.timer = setTimeout(function () {
          var barcode = _this6.search_input.trim();
          var weight = null;
          if (barcode.length === 13 && !isNaN(barcode)) {
            var product = _this6.products.find(function (prod) {
              return prod.code === barcode;
            });
            if (product) {
              _this6.SearchProduct(product, weight);
              return;
            } else {
              var productCode = barcode.substring(0, 7);
              var _weight = parseFloat(barcode.substring(7, 12)) / 1000;
              var _product = _this6.products.find(function (prod) {
                return prod.code === productCode;
              });
              if (_product) {
                _product.quantity = _weight;
                _this6.SearchProduct(_product, _weight);
                return;
              }
            }
            _this6.makeToast("danger", "Invalid product code scanned", _this6.$t("Error"));
            _this6.search_input = '';
            if (_this6.$refs.product_autocomplete) {
              _this6.$refs.product_autocomplete.value = "";
            }
            _this6.product_filter = [];
          }
          var product_filter = _this6.products.filter(function (product) {
            return product.code === _this6.search_input || product.barcode.includes(_this6.search_input);
          });
          if (product_filter.length === 1) {
            _this6.SearchProduct(product_filter[0], weight);
          } else {
            _this6.product_filter = _this6.products.filter(function (product) {
              return product.name.toLowerCase().includes(_this6.search_input.toLowerCase()) || product.code.toLowerCase().includes(_this6.search_input.toLowerCase()) || product.barcode.toLowerCase().includes(_this6.search_input.toLowerCase());
            });
          }
        }, 800);
      } else {
        this.makeToast("warning", this.$t("SelectWarehouse"), this.$t("Warning"));
      }
    },
    getResultValue: function getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },
    SearchProduct: function SearchProduct(result) {
      var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.product = {};
      if (result.product_type == 'is_service') {
        this.product.quantity = 0;
        this.product.code = result.code;
      } else {
        this.product.code = result.code;
        this.product.no_unit = 1;
        this.product.stock = result.qte_sale;
        if (weight !== null) {
          this.product.quantity = weight;
        } else {
          this.product.quantity = 0;
        }
      }
      this.product.product_variant_id = result.product_variant_id;
      this.Get_Product_Details(result.id, result.product_variant_id);
      this.search_input = '';
      if (this.$refs.product_autocomplete) {
        this.$refs.product_autocomplete.value = "";
      }
      this.product_filter = [];
    },
    Selected_Warehouse: function Selected_Warehouse(value) {
      this.search_input = '';
      this.product_filter = [];
      this.Get_Products_By_Warehouse(value);
      this.updateNote();
    },
    Get_Products_By_Warehouse: function Get_Products_By_Warehouse(id) {
      var _this7 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("get_Products_by_warehouse/" + id + "?stock=" + 1 + "&is_sale=" + 1 + "&product_service=" + 1 + "&product_combo=" + 1).then(function (response) {
        _this7.products = response.data;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      })["catch"](function (error) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      });
    },
    add_product: function add_product() {
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
    formatNumber: function formatNumber(number, dec) {
      var value = (typeof number === "string" ? number : number.toString()).split(".");
      if (dec <= 0) return value[0];
      var formated = value[1] || "";
      if (formated.length > dec) return "".concat(value[0], ".").concat(formated.substr(0, dec));
      while (formated.length < dec) formated += "0";
      return "".concat(value[0], ".").concat(formated);
    },
    Calcul_Total: function Calcul_Total() {
      this.total = 0;
      for (var i = 0; i < this.details.length; i++) {
        var detail = this.details[i];
        detail.subtotal = parseFloat(parseFloat(detail.subtotal || 0).toFixed(2));
        if (isNaN(detail.subtotal)) detail.subtotal = 0;
        this.total = parseFloat((this.total + detail.subtotal).toFixed(2));
      }
      this.GrandTotal = this.total;
      var grand_total = this.GrandTotal.toFixed(2);
      this.GrandTotal = parseFloat(grand_total);
    },
    delete_Product_Detail: function delete_Product_Detail(id) {
      for (var i = 0; i < this.details.length; i++) {
        if (id === this.details[i].detail_id) {
          this.details.splice(i, 1);
          this.Calcul_Total();
        }
      }
    },
    verifiedForm: function verifiedForm() {
      if (this.details.length <= 0) {
        this.makeToast("warning", this.$t("AddProductToList"), this.$t("Warning"));
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
    Create_Sale: function Create_Sale() {
      var _this8 = this;
      if (this.verifiedForm()) {
        this.SubmitProcessing = true;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
        axios.post("sales", {
          date: this.sale.date,
          client_id: this.sale.client_id,
          GrandTotal: this.GrandTotal,
          warehouse_id: this.sale.warehouse_id,
          statut: this.sale.statut,
          notes: this.sale.notes,
          tax_rate: 0,
          TaxNet: 0,
          discount: 0,
          shipping: 0,
          details: this.details,
          discount_from_points: this.discount_from_points,
          used_points: this.used_points,
          transporter_name: this.sale.transporter_name,
          lr_number: this.sale.lr_number
        }).then(function (response) {
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this8.makeToast("success", _this8.$t("Successfully_Created"), _this8.$t("Success"));
          _this8.SubmitProcessing = false;
          _this8.$router.push({
            name: "index_sales"
          });
        })["catch"](function (error) {
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this8.makeToast("danger", _this8.$t("InvalidData"), _this8.$t("Failed"));
          _this8.SubmitProcessing = false;
        });
      }
    },
    Last_Detail_id: function Last_Detail_id() {
      this.product.detail_id = 0;
      var len = this.details.length;
      this.product.detail_id = this.details[len - 1].detail_id + 1;
    },
    Get_Product_Details: function Get_Product_Details(product_id, variant_id) {
      var _this9 = this;
      axios.get("/show_product_data/" + product_id + "/" + variant_id).then(function (response) {
        _this9.product.del = 0;
        _this9.product.id = 0;
        _this9.product.etat = "new";
        _this9.product.discount = response.data.discount;
        _this9.product.DiscountNet = response.data.DiscountNet;
        _this9.product.discount_Method = response.data.discount_method;
        _this9.product.product_id = response.data.id;
        _this9.product.name = response.data.name;
        _this9.product.product_type = response.data.product_type;
        _this9.product.Net_price = response.data.Net_price;
        _this9.product.Unit_price = response.data.Unit_price;
        _this9.product.taxe = response.data.tax_price;
        _this9.product.tax_method = response.data.tax_method;
        _this9.product.tax_percent = response.data.tax_percent;
        _this9.product.unitSale = response.data.unitSale;
        _this9.product.sale_unit_id = response.data.sale_unit_id;
        _this9.product.is_imei = response.data.is_imei;
        _this9.product.imei_number = '';
        _this9.product.rate = '';
        _this9.add_product();
        _this9.Calcul_Total();
      });
    },
    GetElements: function GetElements() {
      var _this0 = this;
      axios.get("sales/create").then(function (response) {
        _this0.clients = response.data.clients;
        _this0.warehouses = response.data.warehouses;
        _this0.transporters = response.data.transporters;
        _this0.point_to_amount_rate = response.data.point_to_amount_rate;
        _this0.isLoading = false;
      })["catch"](function (response) {
        setTimeout(function () {
          _this0.isLoading = false;
        }, 500);
      });
    },
    Selected_Customer: function Selected_Customer(value) {
      if (value) {
        var client = this.clients.find(function (c) {
          return c.id === value;
        });
        if (client) {
          if (client.preferred_transport) {
            this.sale.transporter_name = client.preferred_transport;
          } else {
            this.sale.transporter_name = "";
          }
        }
      } else {
        this.sale.transporter_name = "";
      }
      this.updateNote();
    },
    Selected_Transport: function Selected_Transport(value) {
      if (value === null) {
        this.sale.transporter_name = "";
      } else {
        this.sale.transporter_name = value;
      }
      this.updateNote();
    },
    updateNote: function updateNote() {
      var _this1 = this;
      var note = "";
      var warehouse = this.warehouses.find(function (w) {
        return w.id === _this1.sale.warehouse_id;
      });
      var symbol = "NP";
      if (warehouse && warehouse.shortcut) {
        symbol = warehouse.shortcut;
      }
      note += "Rate: " + symbol + ":";
      this.sale.notes = note;
    },
    getFilteredProducts: function getFilteredProducts(search) {
      var q = (search || '').toLowerCase();
      var filtered = this.productOptions.filter(function (p) {
        return p.label.toLowerCase().includes(q);
      });
      return filtered.slice(0, 50);
    },
    getFilteredQuickProducts: function getFilteredQuickProducts(search) {
      var q = (search || '').toLowerCase();
      var filtered = this.quickProductOptions.filter(function (p) {
        return p.label.toLowerCase().includes(q);
      });
      return filtered.slice(0, 50);
    },
    Quick_Product_Select: function Quick_Product_Select(value) {
      if (value) {
        this.SearchProduct(value);
        this.selectedProductId = null;
      }
    }
  },
  created: function created() {
    this.GetElements();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.main-content[data-v-e1ed42cc], .main-content label[data-v-e1ed42cc], .main-content input[data-v-e1ed42cc], .main-content .v-select[data-v-e1ed42cc], .main-content .table[data-v-e1ed42cc], .main-content .badge[data-v-e1ed42cc] {\n  font-size: 1.3rem !important;\n}\n.main-content h5[data-v-e1ed42cc], .main-content h6[data-v-e1ed42cc] {\n  font-size: 1.3rem !important;\n}\n.main-content .form-control[data-v-e1ed42cc] {\n  height: calc(1.5em + 1.1rem + 2px) !important;\n  font-size: 1.1rem !important;\n}\n.auto-expand[data-v-e1ed42cc] {\n  height: auto !important;\n  min-height: 100px !important;\n  overflow-y: hidden !important;\n  resize: none !important;\n}\n.autocomplete-result[data-v-e1ed42cc] {\n  font-size: 1.1rem !important;\n}\n.badge[data-v-e1ed42cc] {\n  padding: 0.4em 0.7em !important;\n}\n.scan-icon[data-v-e1ed42cc] {\n  width: 50px !important;\n  height: 50px !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.input-with-icon {\n  display: flex;\n  align-items: center;\n}\n.scan-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 8px;\n  cursor: pointer;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue":
/*!*************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true");
/* harmony import */ var _create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_sale.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js");
/* harmony import */ var _create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css");
/* harmony import */ var _create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css */ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e1ed42cc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/sales/create_sale.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_0_id_e1ed42cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=0&id=e1ed42cc&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_style_index_1_id_e1ed42cc_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=style&index=1&id=e1ed42cc&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_sale_vue_vue_type_template_id_e1ed42cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/sales/create_sale.vue?vue&type=template&id=e1ed42cc&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('breadcumb',{attrs:{"page":_vm.$t('AddSale'),"folder":_vm.$t('ListSales')}}),_vm._v(" "),(_vm.isLoading)?_c('div',{staticClass:"loading_page spinner spinner-primary mr-3"}):_vm._e(),_vm._v(" "),(!_vm.isLoading)?_c('validation-observer',{ref:"create_sale"},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.Submit_Sale.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"md":"12"}},[_c('b-card',[_c('b-row',[_c('b-modal',{attrs:{"hide-footer":"","id":"open_scan","size":"md","title":"Barcode Scanner"}},[_c('qrcode-scanner',{staticStyle:{"width":"100%","height":"calc(100vh - 56px)"},attrs:{"qrbox":250,"fps":10},on:{"result":_vm.onScan}})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('validation-provider',{attrs:{"name":"date","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('date') + ' ' + '*'}},[_c('b-form-input',{attrs:{"state":_vm.getValidationState(validationContext),"aria-describedby":"date-feedback","type":"date"},model:{value:(_vm.sale.date),callback:function ($$v) {_vm.$set(_vm.sale, "date", $$v)},expression:"sale.date"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"OrderTax-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}],null,false,4059139714)})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Customer","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('Customer') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Customer'),"options":_vm.clientOptions},on:{"input":_vm.Selected_Customer},model:{value:(_vm.sale.client_id),callback:function ($$v) {_vm.$set(_vm.sale, "client_id", $$v)},expression:"sale.client_id"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}],null,false,3174775249)})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('validation-provider',{attrs:{"name":"warehouse","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('warehouse') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"disabled":_vm.details.length > 0,"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Warehouse'),"options":_vm.warehouseOptions},on:{"input":_vm.Selected_Warehouse},model:{value:(_vm.sale.warehouse_id),callback:function ($$v) {_vm.$set(_vm.sale, "warehouse_id", $$v)},expression:"sale.warehouse_id"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}],null,false,2674271560)})],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('b-form-group',{attrs:{"label":_vm.$t('Transport')}},[_c('v-select',{attrs:{"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Transport'),"options":_vm.transporterOptions},on:{"input":_vm.Selected_Transport},model:{value:(_vm.sale.transporter_name),callback:function ($$v) {_vm.$set(_vm.sale, "transporter_name", $$v)},expression:"sale.transporter_name"}})],1)],1),_vm._v(" "),_c('b-col',{staticClass:"mb-3",attrs:{"lg":"4","md":"4","sm":"12"}},[_c('b-form-group',{attrs:{"label":"LR:"}},[_c('b-form-input',{attrs:{"placeholder":_vm.$t('Enter_LR_Number')},on:{"keyup":_vm.updateNote},model:{value:(_vm.sale.lr_number),callback:function ($$v) {_vm.$set(_vm.sale, "lr_number", $$v)},expression:"sale.lr_number"}})],1)],1),_vm._v(" "),_c('b-col',{staticClass:"mb-5",attrs:{"md":"12"}},[_c('h6',[_vm._v(_vm._s(_vm.$t('ProductName')))]),_vm._v(" "),_c('div',{staticClass:"d-flex align-items-center"},[_c('v-select',{staticClass:"flex-grow-1 mr-2",attrs:{"reduce":function (label) { return label.value; },"placeholder":"Quickly Choose Product...","options":_vm.getFilteredQuickProducts(_vm.quickProductSearch),"filterable":false},on:{"input":_vm.Quick_Product_Select,"search":function (query) { return _vm.quickProductSearch = query; },"open":function($event){_vm.quickProductSearch = ''}},model:{value:(_vm.selectedProductId),callback:function ($$v) {_vm.selectedProductId=$$v},expression:"selectedProductId"}}),_vm._v(" "),_c('b-button',{staticStyle:{"height":"43px","display":"flex","align-items":"center","justify-content":"center"},attrs:{"variant":"primary"},on:{"click":_vm.showModal}},[_c('img',{staticStyle:{"height":"24px","filter":"invert(1)"},attrs:{"src":"/assets_setup/scan.png","alt":"Scan"}})])],1)]),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('h5',[_vm._v(_vm._s(_vm.$t('order_products'))+" *")]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-hover"},[_c('thead',{staticClass:"bg-gray-300"},[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("#")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v(_vm._s(_vm.$t('ProductName')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"200px"},attrs:{"scope":"col"}},[_vm._v(_vm._s(_vm.$t('Qty')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"200px"},attrs:{"scope":"col"}},[_vm._v(_vm._s(_vm.$t('Rate')))]),_vm._v(" "),_c('th',{staticStyle:{"width":"200px"},attrs:{"scope":"col"}},[_vm._v(_vm._s(_vm.$t('Amount')))]),_vm._v(" "),_c('th',{staticClass:"text-center",attrs:{"scope":"col"}},[_c('i',{staticClass:"i-Close-Window text-25"})])])]),_vm._v(" "),_c('tbody',_vm._l((_vm.details),function(detail){return _c('tr',{key:detail.detail_id},[_c('td',[_vm._v(_vm._s(detail.detail_id))]),_vm._v(" "),_c('td',[_c('v-select',{staticClass:"grid-v-select",attrs:{"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Product'),"options":_vm.getFilteredProducts(detail.search),"filterable":false,"append-to-body":""},on:{"search":function (query) { return _vm.$set(detail, 'search', query); },"open":function($event){return _vm.$set(detail, 'search', '')},"input":function($event){return _vm.onGridProductChange(detail)}},model:{value:(detail.product_id),callback:function ($$v) {_vm.$set(detail, "product_id", $$v)},expression:"detail.product_id"}})],1),_vm._v(" "),_c('td',[_c('b-form-input',{staticClass:"form-control text-center",staticStyle:{"height":"60px","font-size":"1.8rem","font-weight":"bold"},attrs:{"type":"text","inputmode":"decimal"},on:{"keyup":function($event){return _vm.Verified_Qty(detail,detail.detail_id)}},model:{value:(detail.quantity),callback:function ($$v) {_vm.$set(detail, "quantity", _vm._n($$v))},expression:"detail.quantity"}})],1),_vm._v(" "),_c('td',[_c('b-form-input',{staticClass:"form-control text-right",staticStyle:{"height":"60px","font-size":"1.8rem","font-weight":"bold"},attrs:{"type":"text","inputmode":"decimal"},on:{"keyup":function($event){return _vm.Verified_Rate(detail)}},model:{value:(detail.rate),callback:function ($$v) {_vm.$set(detail, "rate", _vm._n($$v))},expression:"detail.rate"}})],1),_vm._v(" "),_c('td',[_c('b-form-input',{staticClass:"form-control text-right",staticStyle:{"height":"60px","font-size":"1.8rem","font-weight":"bold"},attrs:{"type":"text","inputmode":"decimal"},on:{"keyup":function($event){return _vm.Manual_Amount_Update(detail)}},model:{value:(detail.subtotal),callback:function ($$v) {_vm.$set(detail, "subtotal", _vm._n($$v))},expression:"detail.subtotal"}})],1),_vm._v(" "),_c('td',{staticClass:"text-center"},[_c('i',{staticClass:"i-Close-Window text-25 text-danger cursor-pointer",on:{"click":function($event){return _vm.delete_Product_Detail(detail.detail_id)}}})])])}),0)])])]),_vm._v(" "),_c('div',{staticClass:"offset-md-9 col-md-3 mt-4"},[_c('table',{staticClass:"table table-striped table-sm"},[_c('tbody',[_c('tr',[_c('td',[_c('span',{staticClass:"font-weight-bold"},[_vm._v(_vm._s(_vm.$t('Total')))])]),_vm._v(" "),_c('td',[_c('span',{staticClass:"font-weight-bold"},[_vm._v(_vm._s(_vm.currentUser.currency)+" "+_vm._s(_vm.GrandTotal.toFixed(2)))])])])])])]),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-form-group',{attrs:{"label":_vm.$t('Note')}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.sale.notes),expression:"sale.notes"}],staticClass:"form-control",attrs:{"rows":"4","placeholder":_vm.$t('Afewwords')},domProps:{"value":(_vm.sale.notes)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.sale, "notes", $event.target.value)}}})])],1),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-form-group',[_c('b-button',{attrs:{"variant":"primary","disabled":_vm.SubmitProcessing},on:{"click":_vm.Submit_Sale}},[_c('i',{staticClass:"i-Yes me-2 font-weight-bold"}),_vm._v(" "+_vm._s(_vm.$t('submit')))]),_vm._v(" "),(_vm.SubmitProcessing)?_vm._m(0):_vm._e()],1)],1)],1)],1)],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('validation-observer',{ref:"Update_Detail"},[_c('b-modal',{attrs:{"hide-footer":"","size":"lg","id":"form_Update_Detail","title":_vm.detail.name}},[_c('b-form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit_Update_Detail.apply(null, arguments)}}},[_c('b-row',[_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Tax Method","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var valid = ref.valid;
var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('TaxMethod') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"state":errors[0] ? false : (valid ? true : null),"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Method'),"options":[
                      {label: 'Exclusive', value: '1'},
                      {label: 'Inclusive', value: '2'}
                    ]},model:{value:(_vm.detail.tax_method),callback:function ($$v) {_vm.$set(_vm.detail, "tax_method", $$v)},expression:"detail.tax_method"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Order Tax","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('OrderTax') + ' ' + '*'}},[_c('b-input-group',{attrs:{"append":"%"}},[_c('b-form-input',{attrs:{"label":"Order Tax","state":_vm.getValidationState(validationContext),"aria-describedby":"OrderTax-feedback"},model:{value:(_vm.detail.tax_percent),callback:function ($$v) {_vm.$set(_vm.detail, "tax_percent", _vm._n($$v))},expression:"detail.tax_percent"}})],1),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"OrderTax-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Discount Method","rules":{ required: true}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
                    var valid = ref.valid;
                    var errors = ref.errors;
return _c('b-form-group',{attrs:{"label":_vm.$t('Discount_Method') + ' ' + '*'}},[_c('v-select',{class:{'is-invalid': !!errors.length},attrs:{"reduce":function (label) { return label.value; },"placeholder":_vm.$t('Choose_Method'),"state":errors[0] ? false : (valid ? true : null),"options":[
                      {label: 'Percent %', value: '1'},
                      {label: 'Fixed', value: '2'}
                    ]},model:{value:(_vm.detail.discount_Method),callback:function ($$v) {_vm.$set(_vm.detail, "discount_Method", $$v)},expression:"detail.discount_Method"}}),_vm._v(" "),_c('b-form-invalid-feedback',[_vm._v(_vm._s(errors[0]))])],1)}}])})],1),_vm._v(" "),_c('b-col',{attrs:{"lg":"6","md":"6","sm":"12"}},[_c('validation-provider',{attrs:{"name":"Discount Rate","rules":{ required: true , regex: /^\d*\.?\d*$/}},scopedSlots:_vm._u([{key:"default",fn:function(validationContext){return [_c('b-form-group',{attrs:{"label":_vm.$t('Discount') + ' ' + '*'}},[_c('b-form-input',{attrs:{"label":"Discount","state":_vm.getValidationState(validationContext),"aria-describedby":"Discount-feedback"},model:{value:(_vm.detail.discount),callback:function ($$v) {_vm.$set(_vm.detail, "discount", _vm._n($$v))},expression:"detail.discount"}}),_vm._v(" "),_c('b-form-invalid-feedback',{attrs:{"id":"Discount-feedback"}},[_vm._v(_vm._s(validationContext.errors[0]))])],1)]}}])})],1),_vm._v(" "),_c('b-col',{directives:[{name:"show",rawName:"v-show",value:(_vm.detail.is_imei),expression:"detail.is_imei"}],attrs:{"lg":"12","md":"12","sm":"12"}},[_c('b-form-group',{attrs:{"label":_vm.$t('Add_product_IMEI_Serial_number')}},[_c('b-form-input',{attrs:{"label":"Add_product_IMEI_Serial_number","placeholder":_vm.$t('Add_product_IMEI_Serial_number')},model:{value:(_vm.detail.imei_number),callback:function ($$v) {_vm.$set(_vm.detail, "imei_number", $$v)},expression:"detail.imei_number"}})],1)],1),_vm._v(" "),_c('b-col',{attrs:{"md":"12"}},[_c('b-form-group',[_c('b-button',{attrs:{"variant":"primary","type":"submit","disabled":_vm.Submit_Processing_detail}},[_c('i',{staticClass:"i-Yes me-2 font-weight-bold"}),_vm._v(" "+_vm._s(_vm.$t('submit')))]),_vm._v(" "),(_vm.Submit_Processing_detail)?_vm._m(1):_vm._e()],1)],1)],1)],1)],1)],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"typo__p"},[_c('div',{staticClass:"spinner sm spinner-primary mt-3"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"typo__p"},[_c('div',{staticClass:"spinner sm spinner-primary mt-3"})])}]
render._withStripped = true


/***/ })

}]);