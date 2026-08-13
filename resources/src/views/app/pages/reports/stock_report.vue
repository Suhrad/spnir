<template>
  <div class="main-content">
    <breadcumb :page="$t('stock_report')" :folder="$t('Reports')"/>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-card class="wrapper" v-if="!isLoading">
      <vue-good-table
        mode="remote"
        :columns="columns"
        :totalRows="totalRows"
        :rows="rows"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        @on-sort-change="onSortChange"
        @on-search="onSearch"
        :search-options="{
        placeholder: $t('Search_this_table'),
        enabled: true,
      }"
        :group-options="{
          enabled: true,
          headerPosition: 'bottom',
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

       <div slot="table-actions" class="mt-2 mb-3 quantity_alert_warehouse">
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
      </div>

       <div slot="table-actions" class="mt-2 mb-3">
        
          <b-button @click="stock_report_PDF()" size="sm" variant="outline-success ripple m-1" :disabled="exporting_pdf">
            <span v-if="exporting_pdf" class="spinner-border spinner-border-sm mr-1"></span>
            <i v-else class="i-File-Copy"></i> PDF
          </b-button>
          <vue-excel-xlsx
            ref="excel_btn"
            style="display: none;"
            :data="excel_stock"
            :columns="columns"
            :file-name="'stock_report'"
            :file-type="'xlsx'"
            :sheet-name="'stock_report'"
          />

          <b-button @click="export_Excel()" size="sm" variant="outline-danger ripple m-1" :disabled="exporting_excel">
            <span v-if="exporting_excel" class="spinner-border spinner-border-sm mr-1"></span>
            <i v-else class="i-File-Excel"></i> EXCEL
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'actions'">
            <router-link title="Report" :to="'/app/reports/detail_stock/'+props.row.id">
              <b-button variant="primary">{{$t('Reports')}}</b-button>
            </router-link>
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>


<script>
import NProgress from "nprogress";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  metaInfo: {
    title: "Stock Report"
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
      search: "",
      totalRows: "",
      reports: [],
      rows: [{
          statut: 'Total',
          children: [],
      },],
      excel_stock: [],
      exporting_pdf: false,
      exporting_excel: false,
      report: {},
      warehouses: [],
      warehouse_id: ""
    };
  },

  computed: {
    columns() {
      return [
        {
          label: this.$t("ProductCode"),
          field: "code",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Name_product"),
          field: "name",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
        {
          label: this.$t("Categorie"),
          field: "category",
          tdClass: "text-left",
          thClass: "text-left",
          sortable: false
        },
      
        {
          label: this.$t("Current_stock"),
          field: "quantity",
          type: "decimal",
          headerField: this.sumCount,
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.$t("Action"),
          field: "actions",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
          sortable: false
        }
      ];
    }
  },

  methods: {

     //----------------------------------- Sales PDF ------------------------------\\
    fetch_all_stock() {
      return axios.get(
        "report/stock?page=1" +
          "&SortField=" +
          this.serverParams.sort.field +
          "&SortType=" +
          this.serverParams.sort.type +
          "&warehouse_id=" +
          this.warehouse_id +
          "&search=" +
          this.search +
          "&limit=-1"
      );
    },

    export_Excel() {
      this.exporting_excel = true;
      NProgress.start();
      this.fetch_all_stock().then(response => {
        let all_stock = response.data.report;

        // Calculate totals based on the complete list
        let totalCurrentStock = all_stock.reduce((sum, item) => sum + parseFloat(item.quantity || 0), 0);

        // Append total row
        all_stock.push({
          code: 'Total',
          name: '',
          category: '',
          quantity: totalCurrentStock.toFixed(2),
          unit: ''
        });

        this.excel_stock = all_stock;
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

    stock_report_PDF() {
      this.exporting_pdf = true;
      NProgress.start();
      NProgress.set(0.1);
     
       axios
        .get("report/stock_pdf?warehouse_id=" + this.warehouse_id + "&search=" + this.search, {
          responseType: "blob", // important
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Stock_Report.pdf");
          document.body.appendChild(link);
          link.click();
          NProgress.done();
          this.exporting_pdf = false;
        })
        .catch(() => {
          NProgress.done();
          this.exporting_pdf = false;
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
        this.Get_Stock_Report(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_Stock_Report(1);
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
      this.Get_Stock_Report(this.serverParams.page);
    },

    //---- Event on Search

    onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Stock_Report(this.serverParams.page);
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

     //---------------------- Event Select Warehouse ------------------------------\\
    Selected_Warehouse(value) {
      if (value === null) {
        this.warehouse_id = "";
      }
      this.Get_Stock_Report(1);
    },

    sumCount(rowObj) {
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += parseFloat(rowObj.children[i].quantity || 0);
      }
      return sum.toFixed(2);
    },

    //--------------------------- Get Customer Report -------------\\

    Get_Stock_Report(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get(
          "report/stock?page=" +
            page +
            "&SortField=" +
            this.serverParams.sort.field +
            "&SortType=" +
            this.serverParams.sort.type +
            "&warehouse_id=" +
            this.warehouse_id +
            "&search=" +
            this.search +
            "&limit=" +
            this.limit
        )
        .then(response => {
          this.reports = response.data.report;
          this.totalRows = response.data.totalRows;
          this.warehouses = response.data.warehouses;
          this.rows[0].children = this.reports;
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
    this.Get_Stock_Report(1);
  }
};
</script>