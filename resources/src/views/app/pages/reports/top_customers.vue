<template>
  <div class="main-content">
    <breadcumb :page="$t('Top_customers')" :folder="$t('Reports')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <vue-good-table
      v-if="!isLoading"
      mode="remote"
      :columns="columns"
      :totalRows="totalRows"
      :rows="customers"
      @on-page-change="onPageChange"
      @on-per-page-change="onPerPageChange"
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
        <b-button @click="export_PDF()" size="sm" variant="outline-success ripple m-1" :disabled="exporting_pdf">
          <span v-if="exporting_pdf" class="spinner-border spinner-border-sm mr-1"></span>
          <i v-else class="i-File-Copy"></i> PDF
        </b-button>
        <vue-excel-xlsx
          ref="excel_btn"
          style="display: none;"
          :data="excel_customers"
          :columns="columns"
          :file-name="'Top_Customers'"
          :file-type="'xlsx'"
          :sheet-name="'Top_Customers'"
        />

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
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  metaInfo: {
    title: "Top Customers"
  },
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
      totalRows: "",
      customers: [],
      excel_customers: [],
      exporting_pdf: false,
      exporting_excel: false,
    };
  },

  computed: {
     ...mapGetters(["currentUser"]),
    columns() {
      return [
        {
          label: this.$t("Name"),
          field: "name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Phone"),
          field: "phone",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Email"),
          field: "email",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
         {
          label: "Total Orders",
          field: "total_sales",
          tdClass: "text-center",
          thClass: "text-center",
          sortable: false
        },
         {
          label: this.$t("TotalAmount"),
          field: "total",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
       
      ];
    }
  },

  methods: {

     fetch_all_top_customers() {
       return axios.get(
         "report/top_customers?page=1" +
           "&limit=-1"
       );
     },

     export_Excel() {
       this.exporting_excel = true;
       NProgress.start();
       NProgress.set(0.1);
       this.fetch_all_top_customers().then(response => {
         let all_customers = response.data.customers;

         // Calculate totals based on the complete list
         let totalSales = all_customers.reduce((sum, c) => sum + parseFloat(c.total_sales || 0), 0);
         let totalAmount = all_customers.reduce((sum, c) => sum + parseFloat(c.total || 0), 0);

         // Append total row
         all_customers.push({
           name: 'Total',
           phone: '',
           email: '',
           total_sales: totalSales,
           total: totalAmount.toFixed(2)
         });

         this.excel_customers = all_customers;
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

     export_PDF() {
       var self = this;
       self.exporting_pdf = true;
       NProgress.start();
       NProgress.set(0.1);
       self.fetch_all_top_customers().then(response => {
         let all_customers = response.data.customers;

         let pdf = new jsPDF("p", "pt");
         const fontPath = "/fonts/Vazirmatn-Bold.ttf";
         pdf.addFont(fontPath, "VazirmatnBold", "bold"); 
         pdf.setFont("VazirmatnBold"); 
         
         let columns = [
           { title: self.$t("Name"), dataKey: "name" },
           { title: self.$t("Phone"), dataKey: "phone" },
           { title: self.$t("Email"), dataKey: "email" },
           { title: "Total Orders", dataKey: "total_sales" },
           { title: self.$t("TotalAmount"), dataKey: "total" },
         ];

         // Calculate totals based on the complete list
         let totalSales = all_customers.reduce((sum, c) => sum + parseFloat(c.total_sales || 0), 0);
         let totalAmount = all_customers.reduce((sum, c) => sum + parseFloat(c.total || 0), 0);

         let footer = [{
           name: self.$t("Total"),
           phone: '',
           email: '',
           total_sales: `${totalSales}`,
           total: `${totalAmount.toFixed(2)}`,
         }];

         pdf.autoTable({
                columns: columns,
                body: all_customers,
                foot: footer,
                startY: 70,
                theme: "grid", 
                didDrawPage: (data) => {
                  pdf.setFont("VazirmatnBold");
                  pdf.setFontSize(18);
                  pdf.text("Top Customers", 40, 25);   
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

         pdf.save("Top_Customers.pdf");
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
        this.Get_top_Customers(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_top_Customers(1);
      }
    },

    //----------------------------- Get_top_Customers-------------------\\
    Get_top_Customers(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get(
          "report/top_customers?page=" +
            page +
            "&limit=" +
            this.limit
        )
        .then(response => {
          this.customers = response.data.customers;
          this.totalRows = response.data.totalRows;
          // Complete the animation of theprogress bar.
          NProgress.done();
          this.isLoading = false;
        })
        .catch(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    }
  }, //end Methods

  //----------------------------- Created function------------------- \\

  created: function() {
    this.Get_top_Customers(1);
  }
};
</script>