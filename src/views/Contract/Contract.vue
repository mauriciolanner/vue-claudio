<template lang="html">
    <div class="integration-list">
    <div class="row my-5">
      <div class="col-lg-12">
        <h1 class="text-primary font-weight-bold">
          Lista |
            <span class="text-secondary font-weight-light">
              Contratos
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
              <table id="tblContratos" class="table table-striped table-hover" >
                <thead>
                  <tr>
                    <th>Status do Contrato</th>
                    <th>Nome do Fornecedor</th>
                    <th>Numero do Contrato</th>
                    <th>Descrição Condição de Pagamento</th>
                    <th>Valor do Contrato</th>
                    <th>Saldo do Contrato</th>
                    <th>Vigencia Inicio</th>
                    <th>Vigencia Final</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="contract in contracts"
                    :key="contract.cN9NUMERO"
                  >
                    <td>{{ contract.cN9SITUAC }}</td>
                    <td>{{ contract.a2NOME }}</td>
                    <td>{{ contract.cN9NUMERO }}</td>
                    <td>{{ contract.cN9CONDPG }}</td>
                    <td>{{ contract.cN9VLATU | formatNumberMoney }}</td>
                    <td>{{ contract.cN9SALDO | formatNumberMoney }}</td>
                    <td>{{ contract.cN9DTINIC }}</td>
                    <td>{{ contract.cN9DTFIM }}</td>
                    <td class="text-left">
                      <a :href="`/portal/1/portalcontratos/contrato/${contract.cN9NUMERO}/itens`" class="btn btn-info m-0"><i title="Itens do contrato" class="fas fa-list"></i></a>
                      <a :href="`/portal/1/portalcontratos/contrato/${contract.cN9NUMERO}/${contract.cN9FILORI}/medicoes`" class="btn btn-info m-1"><i title="Medições do contrato" class="fas fa-chart-line"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "datatables.net-bs4";
import { getContracts } from "../../backend";

export default {
  data() {
    return {
      load: false,
      contracts: [],
      filter: "",
      oTable: null,
    };
  },
  mounted() {
    this.fetchContracts();
  },
  methods: {
    createTable() {
      let vm = this;
      this.$nextTick(() => {
        this.oTable = $("#tblContratos").DataTable({
          lengthMenu: [
            [25, 50, 100],
            [25, 50, 100],
          ],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json",
          },
          initComplete: function (settings) {
            vm.filter = settings.oLoadedState.search.search;
            $("#tblContratos_filter").hide();
          },
          stateSave: true,
        });
      });
    },
    async fetchContracts() {
      this.load = true;
      const { email } = JSON.parse(localStorage.getItem("dadosUsuario"));

      const result = await getContracts({ email });

      this.contracts = Array.isArray(result) ? result : [result];

      this.createTable();
      this.load = false;
    },
  },
  watch: {
    filter: {
      handler(val) {
        this.oTable.search(val).draw();
      },
    },
  },
};
</script>
