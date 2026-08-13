<template>
  <div class="main-content">
    <breadcumb :page="$t('Top_Selling_Products')" :folder="$t('Reports')"/>
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

      <vue-excel-xlsx
        ref="excel_btn"
        style="display: none;"
        :data="excel_products"
        :columns="columns"
        :file-name="'product_report'"
        :file-type="'xlsx'"
        :sheet-name="'product_report'"
      />

      <vue-good-table
        v-if="!isLoading"
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
        @on-search="onSearch_products"
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
        styleClass="mt-5 table-hover tableOne vgt-table"
      >
      <div slot="table-actions" class="mt-2 mb-3">
        <b-button @click="export_PDF()" size="sm" variant="outline-success ripple m-1" :disabled="exporting_pdf">
          <span v-if="exporting_pdf" class="spinner-border spinner-border-sm mr-1"></span>
          <i v-else class="i-File-Copy"></i> PDF
        </b-button>

        <b-button @click="export_Excel()" size="sm" variant="outline-danger ripple m-1" :disabled="exporting_excel">
          <span v-if="exporting_excel" class="spinner-border spinner-border-sm mr-1"></span>
          <i v-else class="i-File-Excel"></i> EXCEL
        </b-button>

      </div>
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'total'">
            <span>{{currentUser.currency}} {{props.row.total}}</span>
          </div>
        </template>
      </vue-good-table>
      <!-- </b-card> -->
    </div>
</template>

<script>
import NProgress from "nprogress";
import { mapGetters } from "vuex";
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  metaInfo: {
    title: "Top Selling Products"
  },
  components: { DateRangePicker },
  data() {
    return {
      isLoading: true,
      exporting_pdf: false,
      exporting_excel: false,
      serverParams: {
        sort: {
          field: "id",
          type: "desc"
        },
        page: 1,
        perPage: 10
      },
      limit: "10",
      totalRows: "",
      products: [],
      rows: [{
          code: 'Total',
          children: [],
      }],
      excel_products: [],
      search_products:"",
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
    ...mapGetters(["currentUser"]),
    columns() {
      return [
        {
          label: this.$t("ProductCode"),
          field: "code",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("ProductName"),
          field: "name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("TotalSales"),
          field: "total_sales",
          headerField: this.sumTotalSales,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Qty_sold"),
          field: "qty",
          headerField: this.sumQty,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("TotalAmount"),
          field: "total",
          headerField: this.sumTotalAmount,
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        }
      ];
    }
  },

  methods: {

     
    sumTotalSales(rowObj) {
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += parseFloat(rowObj.children[i].total_sales || 0);
      }
      return sum;
    },
    sumQty(rowObj) {
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += parseFloat(rowObj.children[i].qty || 0);
      }
      return sum.toFixed(2);
    },
    sumTotalAmount(rowObj) {
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += parseFloat(rowObj.children[i].total || 0);
      }
      return sum.toFixed(2);
    },

    onSearch_products(value) {
      this.search_products = value.searchTerm;
      this.Get_top_products(1);
    },

    //----------------------------- Export Excel ------------------------------\\
    export_Excel() {
      this.exporting_excel = true;
      NProgress.start();
      axios
        .get(
          "report/top_products?page=1&limit=-1&to=" +
            this.endDate +
            "&from=" +
            this.startDate +
            "&search=" +
            this.search_products
        )
        .then(response => {
          let all_products = response.data.products;
          // Calculate sums
          let totalSales = all_products.reduce((sum, p) => sum + parseFloat(p.total_sales || 0), 0);
          let totalQty = all_products.reduce((sum, p) => sum + parseFloat(p.qty || 0), 0);
          let totalAmount = all_products.reduce((sum, p) => sum + parseFloat(p.total || 0), 0);

          // Append totals row
          all_products.push({
            code: 'Total',
            name: '',
            total_sales: totalSales,
            qty: totalQty,
            total: totalAmount.toFixed(2)
          });

          this.excel_products = all_products;
          this.$nextTick(() => {
            this.$refs.excel_btn.$el.click();
            NProgress.done();
            this.exporting_excel = false;
          });
        })
        .catch(() => {
          NProgress.done();
          this.exporting_excel = false;
        });
    },

    export_PDF() {
      var self = this;
      self.exporting_pdf = true;
      NProgress.start();
      axios
        .get(
          "report/top_products?page=1&limit=-1&to=" +
            self.endDate +
            "&from=" +
            self.startDate +
            "&search=" +
            self.search_products
        )
        .then(response => {
          let all_products = response.data.products;

          // Calculate totals
          let totalSales = all_products.reduce((sum, p) => sum + parseFloat(p.total_sales || 0), 0);
          let totalQty = all_products.reduce((sum, p) => sum + parseFloat(p.qty || 0), 0);
          let totalAmount = all_products.reduce((sum, p) => sum + parseFloat(p.total || 0), 0);

          let footer = [{
            code: 'Total .....',
            name: '',
            total_sales: `${totalSales}`,
            qty: `${totalQty.toFixed(2)}`,
            total: `${totalAmount.toFixed(2)}`
          }];

          let pdf = new jsPDF("p", "pt");
          const fontPath = "/fonts/Vazirmatn-Bold.ttf";
          pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
          pdf.setFont("VazirmatnBold"); 

          let columns = [
            { title: self.$t("ProductCode"), dataKey: "code" },
            { title: self.$t("ProductName"), dataKey: "name" },
            { title: self.$t("TotalSales"), dataKey: "total_sales" },
            { title: self.$t("Qty_sold"), dataKey: "qty" },
            { title: self.$t("TotalAmount"), dataKey: "total" },
          ];

          pdf.autoTable({
            columns: columns,
            body: all_products,
            foot: footer,
            startY: 70,
            theme: "grid", 
            didDrawPage: (data) => {
              pdf.setFont("VazirmatnBold");
              pdf.setFontSize(18);
              pdf.text("Top Selling Products", 40, 25);   
            },
            styles: {
              font: "VazirmatnBold", 
              halign: "center", 
            },
            headStyles: {
              fillColor: [200, 200, 200], 
              textColor: [0, 0, 0], 
              fontStyle: "bold", 
            },
            footStyles: {
              fillColor: [200, 200, 200], 
              textColor: [0, 0, 0], 
              fontStyle: "bold", 
            }
          });

          pdf.save("Top_Selling_Products.pdf");
          NProgress.done();
          self.exporting_pdf = false;
        })
        .catch(() => {
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
        this.Get_top_products(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_top_products(1);
      }
    },

     //----------------------------- Submit Date Picker -------------------\\
     Submit_filter_dateRange() {
      var self = this;
      self.startDate =  self.dateRange.startDate.toJSON().slice(0, 10);
      self.endDate = self.dateRange.endDate.toJSON().slice(0, 10);
      self.Get_top_products(1);
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

    //----------------------------- Get_top_products------------------\\
    Get_top_products(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      this.get_data_loaded();

      axios
        .get(
          "report/top_products?page=" +
            page +
            "&limit=" +
            this.limit +
            "&to=" +
            this.endDate +
            "&from=" +
            this.startDate +
            "&search=" +
            this.search_products
        )
        .then(response => {
          this.products = response.data.products;
          this.totalRows = response.data.totalRows;
          this.rows[0].children = this.products;
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
    this.Get_top_products(1);
  }
};
</script>