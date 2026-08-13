<template>
    <div class="main-content">
      <breadcumb :page="$t('Sales_by_Brand')" :folder="$t('Reports')"/>
  
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
      </b-col>

      <b-card class="wrapper" v-if="!isLoading">
        <vue-good-table
          mode="remote"
          :columns="columns"
          :totalRows="totalRows"
          :rows="rows"
          :group-options="{
            enabled: true,
            headerPosition: 'bottom',
          }"
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
          styleClass="tableOne table-hover vgt-table mt-3"
        >
  
         <div slot="table-actions" class="mt-2 mb-3">
          
          <b-button @click="report_pdf()" size="sm" variant="outline-success ripple m-1" :disabled="exporting_pdf">
            <span v-if="exporting_pdf" class="spinner-border spinner-border-sm mr-1"></span>
            <i v-else class="i-File-Copy"></i> PDF
          </b-button>
          <vue-excel-xlsx
            ref="excel_btn"
            style="display: none;"
            :data="excel_brand"
            :columns="columns"
            :file-name="'sales_by_brand_report'"
            :file-type="'xlsx'"
            :sheet-name="'sales_by_brand_report'"
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
  import { mapGetters } from "vuex";

  import DateRangePicker from 'vue2-daterange-picker'
  //you need to import the CSS manually
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
  import moment from 'moment'
  
  export default {
    components: { DateRangePicker },
    metaInfo: {
      title: "Sales By Brand"
    },
    data() {
      return {
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
          today_mode: true,
          to: "",
          from: "",
        isLoading: true,
        rows: [{
          brand_name: 'Total',
         
          children: [
             
          ],
      },],
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
        currency: "",
        reports: [],
        excel_brand: [],
        exporting_pdf: false,
        exporting_excel: false,
        report: {},
        warehouse_id: 0
      };
    },
  
    computed: {
      ...mapGetters(["currentUser"]),
      columns() {
        return [
          {
            label: this.$t("Brand"),
            field: "brand_name",
            tdClass: "text-left",
            thClass: "text-left",
            sortable: false
          },
         
          {
            label: this.$t("Qty_sold"),
            field: "qty_sold",
            headerField: this.sumQty,
            tdClass: "text-center",
            thClass: "text-center",
            sortable: false
          },

          {
            label: this.$t("TotalAmount"),
            field: "total_sales",
            headerField: this.sumAmount,
            tdClass: "text-right",
            thClass: "text-right",
            sortable: false
          },

         
        ];
      }
    },
  
    methods: {

      
    sumQty(rowObj) {
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += parseFloat(rowObj.children[i].qty_sold || 0);
      }
      return sum.toFixed(2);
    },

    sumAmount(rowObj) {
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += parseFloat(rowObj.children[i].total_sales || 0);
      }
      return sum.toFixed(2) + ' ' + this.currency;
    },

    // kept for backward compat
    sumCount(rowObj) {
      return this.sumAmount(rowObj);
    },

  
       //----------------------------------- Sales PDF ------------------------------\\
      fetch_all_sales_by_brand() {
        this.get_data_loaded();
        return axios.get(
          "report/sales_by_brand_report?page=1" +
            "&SortField=" +
            this.serverParams.sort.field +
            "&SortType=" +
            this.serverParams.sort.type +
            "&search=" +
            this.search +
            "&limit=-1" +
            "&to=" +
            this.endDate +
            "&from=" +
            this.startDate
        );
      },

      export_Excel() {
        this.exporting_excel = true;
        NProgress.start();
        NProgress.set(0.1);
        this.fetch_all_sales_by_brand().then(response => {
          let all_sales = response.data.reports;

          // Calculate totals based on the complete list
          let totalGrandTotal = all_sales.reduce((sum, report) => sum + parseFloat(report.total_sales || 0), 0);
          let totalQty = all_sales.reduce((sum, report) => sum + parseFloat(report.qty_sold || 0), 0);

          // Append total row
          all_sales.push({
            brand_name: 'Total',
            qty_sold: totalQty.toFixed(2),
            total_sales: totalGrandTotal.toFixed(2)
          });

          this.excel_brand = all_sales;
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

      report_pdf() {
        var self = this;
        self.exporting_pdf = true;
        NProgress.start();
        self.fetch_all_sales_by_brand().then(response => {
          let all_sales = response.data.reports;

          let pdf = new jsPDF("p", "pt");
          const fontPath = "/fonts/Vazirmatn-Bold.ttf";
          pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
          pdf.setFont("VazirmatnBold"); 

          let columns = [
            { title: self.$t("Brand"), dataKey: "brand_name" },
            { title: self.$t("Qty_sold"), dataKey: "qty_sold" },
            { title: self.$t("TotalAmount"), dataKey: "total_sales" },
          ];

          // Calculate totals
          let totalGrandTotal = all_sales.reduce((sum, report) => sum + parseFloat(report.total_sales || 0), 0);
          let totalQty = all_sales.reduce((sum, report) => sum + parseFloat(report.qty_sold || 0), 0);
          
          let footer = [{
            brand_name: self.$t("Total"),
            qty_sold: totalQty.toFixed(2),
            total_sales: `${totalGrandTotal.toFixed(2)}`,
          }];

          pdf.autoTable({
               columns: columns,
               body: all_sales,
               foot: footer,
               startY: 70,
               theme: "grid", 
               didDrawPage: (data) => {
                 pdf.setFont("VazirmatnBold");
                 pdf.setFontSize(18);
                 pdf.text("Sales by Brand", 40, 25);   
               },
               styles: {
                 font: "VazirmatnBold", 
                 halign: "center", // 
               },
               headStyles: {
                 fillColor: [200, 200, 200], 
                 textColor: [0, 0, 0], 
                 fontStyle: "bold", 
               },
               footStyles: {
                 fillColor: [230, 230, 230], 
                 textColor: [0, 0, 0], 
                 fontStyle: "bold", 
               },
          });

          pdf.save("Sales_by_Brand.pdf");
          NProgress.done();
          self.exporting_pdf = false;
        }).catch(() => {
          NProgress.done();
          self.exporting_pdf = false;
        });
      },
  
      //---- update Params Table
      updateParams(newProps) {
        this.serverParams = Object.assign({}, this.serverParams, newProps);
      },
  
      //---- Event Page Change
      onPageChange({ currentPage }) {
        if (this.serverParams.page !== currentPage) {
          this.updateParams({ page: currentPage });
          this.get_sales_by_brand(currentPage);
        }
      },
  
      //---- Event Per Page Change
      onPerPageChange({ currentPerPage }) {
        if (this.limit !== currentPerPage) {
          this.limit = currentPerPage;
          this.updateParams({ page: 1, perPage: currentPerPage });
          this.get_sales_by_brand(1);
        }
      },
  
      //---- Event on Sort Change
      onSortChange(params) {
        this.updateParams({
          sort: {
            type: params[0].type,
            field: params[0].field
          }
        });
        this.get_sales_by_brand(this.serverParams.page);
      },
  
      //---- Event on Search
  
      onSearch(value) {
        this.search = value.searchTerm;
        this.get_sales_by_brand(this.serverParams.page);
      },
  
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
  
    //----------------------------- Submit Date Picker -------------------\\
    Submit_filter_dateRange() {
      var self = this;
      self.startDate =  self.dateRange.startDate.toJSON().slice(0, 10);
      self.endDate = self.dateRange.endDate.toJSON().slice(0, 10);
      self.get_sales_by_brand(1);
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

  
      //--------------------------- Get Customer Report -------------\\
  
      get_sales_by_brand(page) {
        // Start the progress bar.
        NProgress.start();
        NProgress.set(0.1);
        this.get_data_loaded();
        axios
          .get(
            "report/sales_by_brand_report?page=" +
              page +
              "&SortField=" +
              this.serverParams.sort.field +
              "&SortType=" +
              this.serverParams.sort.type +
              "&search=" +
              this.search +
              "&limit=" +
              this.limit +
              "&to=" +
            this.endDate +
            "&from=" +
            this.startDate
          )
          .then(response => {
            this.reports = response.data.reports;
            this.totalRows = response.data.totalRows;
            this.currency = response.data.currency;
            this.rows[0].children = this.reports;

            // Complete the animation of theprogress bar.
            NProgress.done();
            this.isLoading = false;
            this.today_mode = false;
          })
          .catch(response => {
            // Complete the animation of theprogress bar.
            NProgress.done();
            setTimeout(() => {
              this.isLoading = false;
              this.today_mode = false;
            }, 500);
          });
      }
    }, //end Methods
  
    //----------------------------- Created function------------------- \\
  
    created: function() {
      this.get_sales_by_brand(1);
    }
  };
  </script>