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
import { jsPDF } from "jspdf";
import autoTablePlugin from "jspdf-autotable";

function formatToDDMMYYYY(val) {
  if (!val) return '';
  if (typeof val === 'string') {
    val = val.trim();
    if (!val) return '';
    if (/^\d{2}-\d{2}-\d{4}$/.test(val)) return val;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return val.replace(/\//g, '-');
  }
  const m = moment(val, [
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DDTHH:mm:ss',
    'YYYY-MM-DDTHH:mm:ss.SSSSSSZ',
    'YYYY-MM-DDTHH:mm:ssZ',
    'DD-MM-YYYY',
    'DD/MM/YYYY',
    'DD-MM-YYYY HH:mm:ss',
    'DD/MM/YYYY HH:mm:ss'
  ], false);
  return m.isValid() ? m.format('DD-MM-YYYY') : val;
}

Vue.filter('formatDate', formatToDDMMYYYY);
Vue.prototype.$formatDate = formatToDDMMYYYY;
Vue.prototype.formatDate = formatToDDMMYYYY;

function isDateColumn(col) {
  if (!col) return false;
  const fieldName = (col.field || col.key || '').toString().toLowerCase();
  const labelName = (col.label || '').toString().toLowerCase();
  return (
    fieldName === 'date' ||
    fieldName === 'start_date' ||
    fieldName === 'end_date' ||
    fieldName === 'date_time' ||
    fieldName === 'invoice_date' ||
    fieldName === 'original_invoice_date' ||
    fieldName === 'ack_date' ||
    fieldName === 'next_billing_date' ||
    fieldName.includes('date') ||
    fieldName.endsWith('_at') ||
    labelName.includes('date')
  );
}

function formatAnyColumns(cols) {
  if (Array.isArray(cols)) {
    cols.forEach(col => {
      if (col && typeof col === 'object' && isDateColumn(col)) {
        col.formatFn = (val) => formatToDDMMYYYY(val);
        if (!col.formatter) {
          col.formatter = (val) => formatToDDMMYYYY(val);
        }
      }
    });
  }
  return cols;
}

function processTarget(target) {
  if (!target || typeof target !== 'object') return;
  Object.keys(target).forEach(key => {
    const k = key.toLowerCase();
    if (k === 'columns' || k.includes('column') || k.includes('field')) {
      if (Array.isArray(target[key])) {
        formatAnyColumns(target[key]);
      }
    }
  });
}

// Universal jsPDF autoTable hooking
function hookAutoTableOptions(options) {
  if (!options || typeof options !== 'object') return options;
  const origDidParse = options.didParseCell;
  options.didParseCell = function(data) {
    if (origDidParse) origDidParse(data);
    if (data && data.cell && data.section === 'body') {
      const key = (data.column && (data.column.dataKey || data.column.raw || data.column.id) || '').toString().toLowerCase();
      const raw = data.cell.raw != null ? String(data.cell.raw).trim() : (data.cell.text && data.cell.text[0] ? String(data.cell.text[0]).trim() : '');
      const isDatePattern = /^\d{4}-\d{2}-\d{2}/.test(raw) || /^\d{2}\/\d{2}\/\d{4}/.test(raw);
      const isDateKey = key === 'date' || key.includes('date') || key.endsWith('_at');
      if ((isDatePattern || isDateKey) && raw) {
        const formatted = formatToDDMMYYYY(raw);
        if (formatted && formatted !== raw) {
          data.cell.text = [formatted];
        }
      }
    }
  };
  return options;
}

if (autoTablePlugin && autoTablePlugin.default) {
  const origAutoTableFn = autoTablePlugin.default;
  autoTablePlugin.default = function(doc, options, ...args) {
    return origAutoTableFn.call(this, doc, hookAutoTableOptions(options), ...args);
  };
}

if (jsPDF && jsPDF.API) {
  const origApiAutoTable = jsPDF.API.autoTable;
  jsPDF.API.autoTable = function(options, ...args) {
    if (autoTablePlugin && autoTablePlugin.default) {
      return autoTablePlugin.default(this, options, ...args);
    }
    return origApiAutoTable.call(this, hookAutoTableOptions(options), ...args);
  };
}

Vue.mixin({
  beforeCreate() {
    const options = this.$options;

    // 1. Wrap computed properties
    if (options.computed) {
      Object.keys(options.computed).forEach(key => {
        const k = key.toLowerCase();
        if (k === 'columns' || k.includes('column') || k.includes('field')) {
          const originalComputed = options.computed[key];
          options.computed[key] = function() {
            const res = originalComputed.call(this);
            return Array.isArray(res) ? formatAnyColumns(res) : res;
          };
        }
      });
    }

    // 2. Wrap methods
    if (options.methods) {
      Object.keys(options.methods).forEach(key => {
        const k = key.toLowerCase();
        if (k === 'columns' || k.includes('column') || k.includes('field')) {
          const originalMethod = options.methods[key];
          options.methods[key] = function(...args) {
            const res = originalMethod.apply(this, args);
            return Array.isArray(res) ? formatAnyColumns(res) : res;
          };
        }
      });
    }

    // 3. Wrap data function
    if (options.data) {
      const originalData = options.data;
      options.data = function() {
        const dataObj = typeof originalData === 'function' ? originalData.call(this) : originalData;
        if (dataObj && typeof dataObj === 'object') {
          processTarget(dataObj);
          if (dataObj.locale && typeof dataObj.locale === 'object') {
            dataObj.locale.format = 'DD-MM-YYYY';
          }
        }
        return dataObj;
      };
    }
  },
  created() {
    processTarget(this);
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

  
