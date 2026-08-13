<template>
  <div class="main-content text-left">
    <breadcumb :page="$t('SalesItemSummary')" :folder="$t('Reports')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <div v-if="!isLoading">
      <!-- Filters Row -->
      <b-row class="mb-4 no-print">
        <b-col md="12">
          <b-card>
            <b-row align-v="center">
              <!-- Timeline (Date Picker) -->
              <b-col lg="3" md="6" sm="12" class="mb-2">
                <label>{{ $t('date') }}</label>
                <date-range-picker 
                  v-model="dateRange" 
                  :startDate="startDate" 
                  :endDate="endDate" 
                  @update="Submit_filter_dateRange"
                  :locale-data="locale"
                  style="width: 100%;"
                >
                  <template v-slot:input="picker">
                    {{ formatDate(picker.startDate) }} - {{ formatDate(picker.endDate) }}
                  </template>
                </date-range-picker>
              </b-col>

              <!-- Warehouse Filter -->
              <b-col lg="3" md="6" sm="12" class="mb-2">
                <label>{{ $t('warehouse') }}</label>
                <v-select
                  v-model="Filter_warehouse"
                  :reduce="label => label.value"
                  :placeholder="$t('Choose_Warehouse')"
                  :options="warehouses.map(w => ({label: w.name, value: w.id}))"
                  @input="Get_Sales_Summary"
                />
              </b-col>

              <!-- Category Filter -->
              <b-col lg="3" md="6" sm="12" class="mb-2">
                <label>{{ $t('Category') }}</label>
                <v-select
                  v-model="Filter_category"
                  :reduce="label => label.value"
                  :placeholder="$t('Choose_Category')"
                  :options="categories.map(c => ({label: c.name, value: c.id}))"
                  @input="Get_Sales_Summary"
                />
              </b-col>

              <!-- Product Filter -->
              <b-col lg="3" md="6" sm="12" class="mb-2">
                <label>{{ $t('Product') }}</label>
                <v-select
                  v-model="Filter_product"
                  :reduce="label => label.value"
                  :placeholder="$t('Choose_Product')"
                  :options="products.map(p => ({label: p.name, value: p.id}))"
                  @input="Get_Sales_Summary"
                />
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col md="12" class="text-right">
                <b-button variant="outline-primary ripple m-1" size="sm" @click="Reset_Filter">
                  <i class="i-Power-2"></i> {{ $t('Reset') }}
                </b-button>
                <b-button variant="outline-success ripple m-1" size="sm" @click="printReport">
                  <i class="i-Billing"></i> {{ $t('Print') }}
                </b-button>
                <b-button variant="outline-danger ripple m-1" size="sm" @click="export_Excel">
                  <i class="i-File-Excel"></i> EXCEL
                </b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- Report Content Card -->
      <b-row>
        <b-col md="12">
          <b-card class="printable-area">
            <!-- Header for Printing -->
            <div class="print-header text-center mb-4">
              <h4>SHANTI TEXTILE MANUFACTURING CO</h4>
              <h5>Sales Item Summary</h5>
              <p>Period From: {{ formatDate(startDate) }} To {{ formatDate(endDate) }}</p>
            </div>

            <!-- Custom Summary Table -->
            <div class="table-responsive">
              <table class="table table-bordered table-striped summary-table">
                <thead class="bg-gray-300 font-weight-bold">
                  <tr>
                    <th>Item Name</th>
                    <th>HSN Code</th>
                    <th class="text-center">GST %</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Amount</th>
                    <th class="text-right">TCS Amount</th>
                    <th class="text-right">CGST Amount</th>
                    <th class="text-right">SGST Amount</th>
                    <th class="text-right">IGST Amount</th>
                    <th class="text-right">Total Amt</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="sales_summary.length === 0">
                    <tr>
                      <td colspan="10" class="text-center py-4">{{ $t('NodataAvailable') }}</td>
                    </tr>
                  </template>

                  <template v-else v-for="group in sales_summary">
                    <!-- Category Header Row -->
                    <tr class="group-header-row font-weight-bold bg-light">
                      <td colspan="10">Item Group Name : {{ group.category_name }}</td>
                    </tr>

                    <!-- Category Items Rows -->
                    <tr v-for="(item, idx) in group.items" :key="group.category_name + '_' + idx">
                      <td>{{ item.item_name }}</td>
                      <td>{{ item.hsn_code }}</td>
                      <td class="text-center">{{ formatDecimal(item.gst_rate) }}%</td>
                      <td class="text-right">{{ formatDecimal(item.quantity) }}</td>
                      <td class="text-right">{{ formatDecimal(item.net_amount) }}</td>
                      <td class="text-right">0.00</td>
                      <td class="text-right">{{ formatDecimal(item.cgst_amount) }}</td>
                      <td class="text-right">{{ formatDecimal(item.sgst_amount) }}</td>
                      <td class="text-right">{{ formatDecimal(item.igst_amount) }}</td>
                      <td class="text-right font-weight-bold">{{ formatDecimal(item.total_amount) }}</td>
                    </tr>

                    <!-- Category Subtotal Row -->
                    <tr class="subtotal-row font-weight-bold bg-light-gray text-primary">
                      <td colspan="3" class="text-right">Sub Total...</td>
                      <td class="text-right">{{ formatDecimal(group.sub_total.quantity) }}</td>
                      <td class="text-right">{{ formatDecimal(group.sub_total.net_amount) }}</td>
                      <td class="text-right">0.00</td>
                      <td class="text-right">{{ formatDecimal(group.sub_total.cgst_amount) }}</td>
                      <td class="text-right">{{ formatDecimal(group.sub_total.sgst_amount) }}</td>
                      <td class="text-right">{{ formatDecimal(group.sub_total.igst_amount) }}</td>
                      <td class="text-right">{{ formatDecimal(group.sub_total.total_amount) }}</td>
                    </tr>
                  </template>

                  <!-- Grand Total Row -->
                  <tr v-if="sales_summary.length > 0" class="grand-total-row font-weight-bold bg-dark-gray text-success">
                    <td colspan="3" class="text-right">Grand Total...</td>
                    <td class="text-right">{{ formatDecimal(grand_totals.quantity) }}</td>
                    <td class="text-right">{{ formatDecimal(grand_totals.net_amount) }}</td>
                    <td class="text-right">0.00</td>
                    <td class="text-right">{{ formatDecimal(grand_totals.cgst_amount) }}</td>
                    <td class="text-right">{{ formatDecimal(grand_totals.sgst_amount) }}</td>
                    <td class="text-right">{{ formatDecimal(grand_totals.igst_amount) }}</td>
                    <td class="text-right">{{ formatDecimal(grand_totals.total_amount) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

export default {
  metaInfo: {
    title: "Sales Item Summary"
  },
  components: { DateRangePicker },
  data() {
    return {
      isLoading: true,
      today_mode: true,
      startDate: "",
      endDate: "",
      dateRange: {
        startDate: "",
        endDate: ""
      },
      locale: {
        Label: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: 1
      },
      Filter_warehouse: "",
      Filter_category: "",
      Filter_product: "",
      warehouses: [],
      categories: [],
      products: [],
      sales_summary: [],
      grand_totals: {
        quantity: 0.0,
        net_amount: 0.0,
        cgst_amount: 0.0,
        sgst_amount: 0.0,
        igst_amount: 0.0,
        total_amount: 0.0
      },
      currency: ""
    };
  },

  methods: {
    formatDate(date) {
      if (!date) return "";
      return moment(date).format("DD/MM/YYYY");
    },

    formatDecimal(value) {
      if (value === undefined || value === null) return "0.00";
      return parseFloat(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    setToStrings() {
      if (this.Filter_warehouse === null) this.Filter_warehouse = "";
      if (this.Filter_category === null) this.Filter_category = "";
      if (this.Filter_product === null) this.Filter_product = "";
    },

    get_data_loaded() {
      if (this.today_mode) {
        let startDate = moment().startOf("month");
        let endDate = moment().endOf("day");

        this.startDate = startDate.format("YYYY-MM-DD");
        this.endDate = endDate.format("YYYY-MM-DD");

        this.dateRange.startDate = startDate.toDate();
        this.dateRange.endDate = endDate.toDate();
      }
    },

    Submit_filter_dateRange() {
      this.startDate = this.dateRange.startDate.toJSON().slice(0, 10);
      this.endDate = this.dateRange.endDate.toJSON().slice(0, 10);
      this.Get_Sales_Summary();
    },

    Reset_Filter() {
      this.Filter_warehouse = "";
      this.Filter_category = "";
      this.Filter_product = "";
      this.Get_Sales_Summary();
    },

    Get_Sales_Summary() {
      NProgress.start();
      NProgress.set(0.1);
      this.setToStrings();
      this.get_data_loaded();

      axios
        .get(
          "report/sales_item_summary?from=" +
            this.startDate +
            "&to=" +
            this.endDate +
            "&warehouse_id=" +
            this.Filter_warehouse +
            "&category_id=" +
            this.Filter_category +
            "&product_id=" +
            this.Filter_product
        )
        .then(response => {
          this.sales_summary = response.data.sales_summary;
          this.grand_totals = response.data.grand_totals;
          this.currency = response.data.currency;
          this.warehouses = response.data.warehouses;
          this.categories = response.data.categories;
          this.products = response.data.products;

          NProgress.done();
          this.isLoading = false;
          this.today_mode = false;
        })
        .catch(() => {
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
            this.today_mode = false;
          }, 500);
        });
    },

    printReport() {
      window.print();
    },

    export_Excel() {
      let rows = [];
      
      this.sales_summary.forEach(group => {
        rows.push({
          "Item Name": "Item Group Name : " + group.category_name,
          "HSN Code": "",
          "GST %": "",
          "Qty": "",
          "Amount": "",
          "TCS Amount": "",
          "CGST Amount": "",
          "SGST Amount": "",
          "IGST Amount": "",
          "Total Amt": ""
        });

        group.items.forEach(item => {
          rows.push({
            "Item Name": item.item_name,
            "HSN Code": item.hsn_code,
            "GST %": item.gst_rate + "%",
            "Qty": item.quantity,
            "Amount": item.net_amount,
            "TCS Amount": 0.00,
            "CGST Amount": item.cgst_amount,
            "SGST Amount": item.sgst_amount,
            "IGST Amount": item.igst_amount,
            "Total Amt": item.total_amount
          });
        });

        rows.push({
          "Item Name": "Sub Total...",
          "HSN Code": "",
          "GST %": "",
          "Qty": group.sub_total.quantity,
          "Amount": group.sub_total.net_amount,
          "TCS Amount": 0.00,
          "CGST Amount": group.sub_total.cgst_amount,
          "SGST Amount": group.sub_total.sgst_amount,
          "IGST Amount": group.sub_total.igst_amount,
          "Total Amt": group.sub_total.total_amount
        });
      });

      rows.push({
        "Item Name": "Grand Total...",
        "HSN Code": "",
        "GST %": "",
        "Qty": this.grand_totals.quantity,
        "Amount": this.grand_totals.net_amount,
        "TCS Amount": 0.00,
        "CGST Amount": this.grand_totals.cgst_amount,
        "SGST Amount": this.grand_totals.sgst_amount,
        "IGST Amount": this.grand_totals.igst_amount,
        "Total Amt": this.grand_totals.total_amount
      });

      const XLSX = require("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sales_Item_Summary");
      XLSX.writeFile(workbook, "Sales_Item_Summary_Report.xlsx");
    }
  },

  created() {
    this.Get_Sales_Summary();
  }
};
</script>

<style scoped>
.summary-table th, .summary-table td {
  padding: 8px 12px;
  vertical-align: middle;
  font-size: 0.95rem;
}
.group-header-row td {
  font-size: 1.1rem;
  background-color: #f0f0f0;
}
.subtotal-row td {
  background-color: #f7f7f7;
  font-size: 1rem;
}
.grand-total-row td {
  background-color: #e2e8f0;
  font-size: 1.1rem;
}

@media print {
  .no-print {
    display: none !important;
  }
  .printable-area {
    border: none !important;
    padding: 0 !important;
  }
  .main-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  .print-header {
    display: block !important;
  }
}
@media screen {
  .print-header {
    display: none;
  }
}
</style>
