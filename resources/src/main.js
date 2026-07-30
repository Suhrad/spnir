import store from "./store";
import axios from 'axios';

import Vue from "vue";
import router, { setupRouterGuards } from "./router";

import App from "./App.vue";
import Auth from './auth/index.js';
window.auth = new Auth();
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from "vee-validate/dist/rules";

localize({
  en: {
    messages: {
      required: 'This field is required',
      required_if: 'This field is required',
      regex: 'This field must be a valid',
      mimes: `This field must have a valid file type.`,
      size: (_, { size }) => `This field size must be less than ${size}.`,
      min: 'This field must have no less than {length} characters',
      max: (_, { length }) => `This field must have no more than ${length} characters`
    }
  },
});
// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// Register it globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


Vue.component('qrcode-scanner', {
  props: {
    qrbox: {
      type: Number,
      default: 250
    },
    fps: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {
      isFirstScan: true,
      html5QrcodeScanner: null,
    };
  },
  template: `<div id="reader"></div>`, // Use ref instead of id for dynamic rendering

  mounted () {
    this.initializeScanner();
  },
  methods: {
    initializeScanner() {
      const config = {
        fps: this.fps,
        qrbox: this.qrbox,
      };
      this.html5QrcodeScanner = new Html5QrcodeScanner('reader', config); // Use id for dynamic rendering
      this.html5QrcodeScanner.render(this.onScanSuccess);
    },
    onScanSuccess (decodedText, decodedResult) {
      if (this.isFirstScan) {
        this.isFirstScan = false;
        this.$emit('result', decodedText, decodedResult);
      } else {
        this.html5QrcodeScanner.stop();
      }
    },

  },

  beforeDestroy() {
    if (this.html5QrcodeScanner) {
      this.html5QrcodeScanner.clear();
    }
  }

});

import StockyKit from "./plugins/stocky.kit";
Vue.use(StockyKit);
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

window.axios = require('axios');
window.axios.defaults.baseURL = '/api/';

window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const stockyToken = VueCookies.get('Stocky_token');
if (stockyToken) {
  window.auth.setAuthToken(stockyToken);
}

axios.interceptors.response.use((response) => {

  return response;
}, (error) => {
  if (error.response && error.response.data) {
    if (error.response.status === 401) {
      // Only redirect to login if not already on the login page (prevents redirect loops)
      if (!window.location.pathname.includes('/login')) {
        window.location.href='/login';
      }
    }

    if (error.response.status === 404) {
      router.push({ name: 'NotFound' }).catch(() => {});
    }
    if (error.response.status === 403) {
      router.push({ name: 'not_authorize' }).catch(() => {});
    }

    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

import '@trevoreyre/autocomplete-vue/dist/style.css';

window.Fire = new Vue();

import moment from "moment";

Vue.filter('formatDate', function(value) {
  if (!value) return '';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return value;
  const m = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'], true);
  return m.isValid() ? m.format('DD/MM/YYYY') : value;
});

function formatColumns(cols, moment) {
  if (Array.isArray(cols)) {
    cols.forEach(col => {
      const isDateCol = col.field === 'date' || col.field === 'original_invoice_date' || col.field === 'ack_date' || col.field === 'invoice_date' || col.field === 'next_billing_date';
      if (isDateCol && !col.formatFn) {
        col.formatFn = (val) => {
          if (!val) return '';
          if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return val;
          const m = moment(val, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'], true);
          return m.isValid() ? m.format('DD/MM/YYYY') : val;
        };
      }
    });
  }
  return cols;
}

Vue.mixin({
  beforeCreate() {
    const options = this.$options;

    // 1. Wrap computed columns if it exists
    if (options.computed && options.computed.columns) {
      const originalComputedColumns = options.computed.columns;
      options.computed.columns = function() {
        const cols = originalComputedColumns.call(this);
        return formatColumns(cols, moment);
      };
    }

    // 2. Wrap methods columns if it exists
    if (options.methods && options.methods.columns) {
      const originalMethodsColumns = options.methods.columns;
      options.methods.columns = function() {
        const cols = originalMethodsColumns.call(this);
        return formatColumns(cols, moment);
      };
    }

    // 3. Wrap data function to intercept data columns
    if (options.data) {
      const originalData = options.data;
      options.data = function() {
        const dataObj = typeof originalData === 'function' ? originalData.call(this) : originalData;
        if (dataObj && dataObj.columns) {
          dataObj.columns = formatColumns(dataObj.columns, moment);
        }
        return dataObj;
      };
    }
  }
});

import Breadcumb from "./components/breadcumb";
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);


Vue.component("breadcumb", Breadcumb);

Vue.config.productionTip = true;
Vue.config.silent = true;
Vue.config.devtools = false;

import { loadI18n } from './plugins/i18n.loader';

loadI18n().then(i18n => {
 store.commit('SetDefaultLanguage', { i18n, Language: i18n.locale });
  setupRouterGuards(i18n); // ✅ inject into router

  new Vue({
    store,
    router,
    VueCookie,
    i18n, // vue-i18n will inject $i18n to all components
    render: h => h(App),
  }).$mount("#app");
});

  
