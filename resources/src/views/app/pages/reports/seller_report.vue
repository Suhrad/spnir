<template>
  <div class="main-content">
    <breadcumb :page="$t('Seller_report')" :folder="$t('Reports')"/>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

      <b-col md="12" class="text-center" v-if="!isLoading">
        <date-range-picker 
          v-model="dateRange" 
          :startDate="startDate" 
          :endDate="endDate" 
           @update="Submit_filter_dateRange"
          :locale-data="locale" > 

          <template v-slot:input="picker" style="min-width: 350px;">
              {{ picker.startDate.toJSON().slice(0, 10)}} - {{ picker.endDate.toJSON().slice(0, 10)}}
          </template> 

        </date-range-picker>
        <!-- Time Range Filters -->
        <b-row class="mt-2 justify-content-center">
          <b-col cols="5" md="3">
            <b-form-group label="Start Time">
              <b-form-input type="time" v-model="start_time" @change="Seller_report(1)" />
            </b-form-group>
          </b-col>
          <b-col cols="5" md="3">
            <b-form-group label="End Time">
              <b-form-input type="time" v-model="end_time" @change="Seller_report(1)" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>


    <b-card class="wrapper" v-if="!isLoading">
      <vue-good-table
        mode="remote"
        :columns="columns"
        :totalRows="totalRows"
        :rows="payments"
       
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        @on-sort-change="onSortChange"
        @on-search="onSearch"
        :search-options="{
        placeholder: $t('Search_this_table'),
        enabled: true,
      }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          nextLabel: 'next',
          prevLabel: 'prev',
          dropdownAllowAll: true,
          perPage: serverParams.perPage
        }"
        styleClass="table-hover tableOne vgt-table"
      >
        <div slot="table-actions" class="mt-2 mb-3">

           <!-- warehouse -->
          <b-form-group :label="$t('warehouse')">
            <v-select
              @input="Selected_Warehouse"
              v-model="warehouse_id"
              :reduce="label => label.value"
              :placeholder="$t('Choose_Warehouse')"
              :options="warehouses.map(warehouses => ({label: warehouses.name, value: warehouses.id}))"
            />
          </b-form-group>
         
          <b-button @click="Seller_report_pdf()" size="sm" variant="outline-success ripple m-1" :disabled="exporting_pdf">
            <span v-if="exporting_pdf" class="spinner-border spinner-border-sm mr-1"></span>
            <i v-else class="i-File-Copy"></i> PDF
          </b-button>
          <vue-excel-xlsx
            ref="excel_btn"
            style="display: none;"
            :data="excel_payments"
            :columns="columns"
            :file-name="'Seller_report'"
            :file-type="'xlsx'"
            :sheet-name="'Seller_report'"
          />

          <b-button @click="export_Excel()" size="sm" variant="outline-danger ripple m-1" :disabled="exporting_excel">
            <span v-if="exporting_excel" class="spinner-border spinner-border-sm mr-1"></span>
            <i v-else class="i-File-Excel"></i> EXCEL
          </b-button>
        </div>
      </vue-good-table>

    </b-card>


  </div>
</template>


<script>
import NProgress from "nprogress";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'

export default {
  metaInfo: {
    title: "Report Seller"
  },
  components: { DateRangePicker },

  data() {
    return {
      isLoading: true,
      serverParams: {
        sort: {
          field: "id",
          type: "desc"
        },
        page: 1,
        perPage: 10
      },
      limit: "10",
      search: "",
      totalRows: "",
      start_time: '',
      end_time: '',
      payments: [],
      excel_payments: [],
      exporting_pdf: false,
      exporting_excel: false,
      paymentMethods: [],
      warehouse_id: "",
      today_mode: true,
      startDate: "", 
      endDate: "", 
      dateRange: { 
       startDate: "", 
       endDate: "" 
      }, 
      locale:{ 
          //separator between the two ranges apply
          Label: "Apply", 
          cancelLabel: "Cancel", 
          weekLabel: "W", 
          customRangeLabel: "Custom Range", 
          daysOfWeek: moment.weekdaysMin(), 
          //array of days - see moment documenations for details 
          monthNames: moment.monthsShort(), //array of month names - see moment documenations for details 
          firstDay: 1 //ISO first day of week - see moment documenations for details
        },
    };
  },

  computed: {
    columns() {
      const base = [
        {
          label: this.$t("Seller"),
          field: "username",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: true
        },
        {
          label: "Total Orders",
          field: "total_orders",
          tdClass: "text-center",
          thClass: "text-center",
          sortable: false
        },
        {
          label: this.$t("TotalSales"),
          field: "total_sales",
          tdClass: "text-center",
          thClass: "text-center",
          sortable: false
        }
      ];

      const dynamic = this.paymentMethods.map(method => ({
        label: method,
        field: method,
        tdClass: "text-right",
        thClass: "text-right",
        sortable: false
      }));

      return [...base, ...dynamic];
    }


  },
  methods: {

     //---------------------- Event Select Warehouse ------------------------------\\
    Selected_Warehouse(value) {
      if (value === null) {
        this.warehouse_id = "";
      }
      this.Seller_report(1);
    },

    //---- update Params Table
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    //---- Event Page Change
    onPageChange({ currentPage }) {
      if (this.serverParams.page !== currentPage) {
        this.updateParams({ page: currentPage });
        this.Seller_report(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Seller_report(1);
      }
    },

    //---- Event on Sort Change
    onSortChange(params) {
      let field = "";
      field = params[0].field;
      this.updateParams({
        sort: {
          type: params[0].type,
          field: field
        }
      });
      this.Seller_report(this.serverParams.page);
    },

    //---- Event on Search

    onSearch(value) {
      this.search = value.searchTerm;
      this.Seller_report(this.serverParams.page);
    },


  fetch_all_seller_report() {
    this.get_data_loaded();
    return axios.get("report/seller_report", {
      params: {
        page: 1,
        SortField: this.serverParams.sort.field,
        SortType: this.serverParams.sort.type,
        search: this.search,
        limit: -1,
        warehouse_id: this.warehouse_id,
        end_date: this.endDate,
        start_date: this.startDate,
        start_time: this.start_time,
        end_time: this.end_time, 
      }
    });
  },

  export_Excel() {
    this.exporting_excel = true;
    NProgress.start();
    this.fetch_all_seller_report().then(response => {
      let all_payments = response.data.report;

      // Calculate totals based on the complete list
      let totals = {
        username: 'Total',
        total_sales: all_payments.reduce((sum, item) => sum + parseFloat(item.total_sales || 0), 0).toFixed(2),
      };
      this.paymentMethods.forEach(method => {
        totals[method] = all_payments.reduce((sum, item) => sum + parseFloat(item[method] || 0), 0).toFixed(2);
      });

      // Append total row
      all_payments.push(totals);

      this.excel_payments = all_payments;
      this.$nextTick(() => {
        this.$refs.excel_btn.$el.click();
        NProgress.done();
        this.exporting_excel = false;
      });
    }).catch(() => {
      NProgress.done();
      this.exporting_excel = false;
    });
  },

  Seller_report_pdf() {
    var self = this;
    self.exporting_pdf = true;
    NProgress.start();
    
    self.fetch_all_seller_report().then(response => {
      let all_payments = response.data.report;

      const pdf = new jsPDF("p", "pt");
      const fontPath = "/fonts/Vazirmatn-Bold.ttf";
      pdf.addFont(fontPath, "VazirmatnBold", "bold");
      pdf.setFont("VazirmatnBold");

      // 1. Base headers
      const headers = [
        { title: this.$t("Seller"), dataKey: "username" },
        { title: "Total Orders", dataKey: "total_orders" },
        { title: this.$t("TotalSales"), dataKey: "total_sales" },
        ...(this.paymentMethods || []).map(method => ({
          title: this.$t(method.replace(/\s+/g, "_")),
          dataKey: method
        }))
      ];

      // Calculate totals
      let totalSales = all_payments.reduce((sum, item) => sum + parseFloat(item.total_sales || 0), 0);
      let totalOrders = all_payments.reduce((sum, item) => sum + parseFloat(item.total_orders || 0), 0);
      let totalsRow = {
        username: this.$t("Total"),
        total_orders: totalOrders,
        total_sales: totalSales.toFixed(2),
      };
      this.paymentMethods.forEach(method => {
        totalsRow[method] = all_payments.reduce((sum, item) => sum + parseFloat(item[method] || 0), 0).toFixed(2);
      });

      // Generate PDF table
      pdf.autoTable({
        head: [headers.map(h => h.title)],
        body: [
          ...all_payments.map(row => headers.map(h => row[h.dataKey] ?? '')),
          headers.map(h => totalsRow[h.dataKey] ?? '')
        ],
        startY: 70,
        theme: "grid",
        didDrawPage: () => {
          pdf.setFontSize(18);
          pdf.text('Seller Payment Report', 40, 25);
          // Date range subtitle
          if (self.startDate && self.endDate) {
            pdf.setFontSize(11);
            pdf.text(`Period: ${self.startDate}  to  ${self.endDate}`, 40, 45);
          }
        },
        styles: {
          font: "VazirmatnBold",
          halign: "center"
        },
        headStyles: {
          fillColor: [200, 200, 200],
          textColor: [0, 0, 0],
          fontStyle: "bold"
        },
        footStyles: {
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          fontStyle: "bold"
        }
      });

      pdf.save("Seller_Payment_Report.pdf");
      NProgress.done();
      self.exporting_pdf = false;
    }).catch(() => {
      NProgress.done();
      self.exporting_pdf = false;
    });
  },




     //----------------------------- Submit Date Picker -------------------\\
    Submit_filter_dateRange() {
      var self = this;
      self.startDate =  self.dateRange.startDate.toJSON().slice(0, 10);
      self.endDate = self.dateRange.endDate.toJSON().slice(0, 10);
      self.Seller_report(1);
    },


     get_data_loaded() {
       var self = this;
       if (self.today_mode) {
         let startDate = moment().startOf('month');
         let endDate = moment().endOf('day');

         self.startDate = startDate.format("YYYY-MM-DD");
         self.endDate = endDate.format("YYYY-MM-DD");

         self.dateRange.startDate = startDate.toDate();
         self.dateRange.endDate = endDate.toDate();
       }
     },

    //-------------------------------- Get All Payments Sales ---------------------\\
    Seller_report(page) {
      // Start the progress bar
      NProgress.start();
      NProgress.set(0.1);

      // Mark loading
      this.get_data_loaded();

      axios
        .get("report/seller_report", {
          params: {
            page: page,
            SortField: this.serverParams.sort.field,
            SortType: this.serverParams.sort.type,
            search: this.search,
            limit: this.limit,
            warehouse_id: this.warehouse_id,
            end_date: this.endDate,
            start_date: this.startDate,
            start_time: this.start_time,
            end_time: this.end_time, 
          }
        })
        .then(response => {
          this.payments = response.data.report;
          this.paymentMethods = response.data.paymentMethods || [];
          this.warehouses = response.data.warehouses;
          this.totalRows = response.data.totalRows;

          NProgress.done();
          this.isLoading = false;
          this.today_mode = false;
        })
        .catch(error => {
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
            this.today_mode = false;
          }, 500);
        });
    }

  },

  //----------------------------- Created function-------------------\\
  created: function() {
    this.Seller_report(1);
  }
};
</script>