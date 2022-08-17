<template lang="html">
    <div class="integration-list">
    <div class="row my-5">
      <div class="col-lg-12">
        <h1 class="text-primary font-weight-bold">
          Lista |
            <span class="text-secondary font-weight-light">
              Itens Contratos
            </span>
        </h1>
        <p v-if="load" class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
        </p>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-12">
        <div class="input-group mr-4">
          <input
            type="text"
            v-model="filter"
            placeholder="Digite para Procurar"
            class="input form-control search"
          />
          <div class="input-group-append">
            <button
              type="button"
              class="btn btn btn-light"
            >
              <i class="fa fa-eraser"></i>
            </button>
            <button type="button" class="btn btn btn-secondary">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-body">
            <div class="table-responsive">
              <table id="tblItensContrato" class="table table-striped table-hover" >
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Código Produto</th>
                    <th>Descrição</th>
                    <th>Centro de Custo</th>
                    <th>Conta Contábil</th>
                    <th>Número SC</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Valor Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in itensContract"
                    :key="item.cnbitem"
                  >
                    <td>{{ item.cnbitem }}</td>
                    <td>{{ item.cnbprodut }}</td>
                    <td>{{ item.cnbdescri }}</td>
                    <td>{{ item.cnbcc }}</td>
                    <td>{{ item.cnbconta }}</td>
                    <td>{{ item.cnbnumsc }}</td>
                    <td>{{ item.cnbquant | formatNumber}}</td>
                    <td>{{ item.cnbvlunit | formatNumberMoney }}</td>
                    <td>{{ item.cnbvltot | formatNumberMoney}}</td>
                    <td class="text-left">
                      <button
                        class="btn btn-info m-0"
                        @click="openModalKpi( item )"
                        v-if="item.kpi.strkpiplanilha"
                      >
                        KPI's
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <sweet-modal :width="'65%'" :blocking="true" ref="kpiModal"
    title="" overlay-theme="dark">

      <h4>KPI's</h4>

      <div class="row">
        <div class="col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-body">
              <div class="table-responsive">
                <table id="tblKPI" class="table table-striped table-hover" >
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Descrição</th>
                      <th>Meta</th>
                      <th>Referência</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="kpi in kpis"
                      :key="kpi.zkitem"
                    >
                      <td>{{ kpi.zkitem }}</td>
                      <td>{{ kpi.zkdescric }}</td>
                      <td>{{ kpi.zkmeta }}</td>
                      <td>{{ kpi.zkreferen }}</td>
                      <td>{{ kpi.zkobs }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </sweet-modal>

  </div>
</template>

<script>
import numeral from "numeral";
import $ from "jquery";
import "datatables.net-bs4";
import { getItensContracts } from "../../backend";
import { SweetModal } from "sweet-modal-vue";

export default {
  data() {
    return {
      load: false,
      itensContract: [],
      kpis: [],
      filter: "",
      oTable: null,
    };
  },
  components: {
    SweetModal,
  },
  mounted() {
    this.fetchItensContracts();
  },
  methods: {
    createTable() {
      let vm = this;
      this.$nextTick(() => {
        this.oTable = $("#tblItensContrato").DataTable({
          lengthMenu: [
            [25, 50, 100],
            [25, 50, 100],
          ],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json",
          },
          initComplete: function (settings) {
            vm.filter = settings.oLoadedState.search.search;
            $("#tblItensContrato_filter").hide();
          },
          stateSave: true,
        });
      });
    },
    async fetchItensContracts() {
      this.load = true;
      const result = await getItensContracts(this.$route.params.contrato);
      console.log(result)
      var arrayItens = JSON.parse(result.iTENS);
      console.log(result.iTENS);
      this.itensContract = arrayItens.stritensplanilha;
      this.createTable();
      this.load = false;
    },
    openModalKpi(item) {
      this.kpis = !item.kpi.strkpiplanilha
        ? item.kpi.strkpiplanilha
        : Array.isArray(item.kpi.strkpiplanilha)
        ? item.kpi.strkpiplanilha
        : [item.kpi.strkpiplanilha];

      this.$refs.kpiModal.open();
    },
  },
  watch: {
    filter: {
      handler(val) {
        this.oTable.search(val).draw();
      },
    },
  },
  filters: {
    formatNumber(value) {
      return numeral(parseFloat(value)).format("0.00");
    },
  },
};
</script>
