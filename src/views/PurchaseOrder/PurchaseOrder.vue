<template lang="html">
    <div class="integration-list">
    <div class="row my-5">
      <div class="col-lg-12">
        <h1 class="text-primary font-weight-bold">
          Lista |
            <span class="text-secondary font-weight-light">
              Pedidos de Compras - Vigentes
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
              <table id="tblPedidos" class="table table-striped table-hover" >
                <thead>
                  <tr>
                    <th>Nr. Pedido</th>
                    <th>Emissão</th>
                    <th>Código/Loja Fornecedor</th>
                    <th>Fornecedor</th>
                    <th>Condição de Pagamento</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="pedido in pedidos"
                    :key="pedido.c7NUM"
                  >
                    <td>{{ pedido.c7NUM }}</td>
                    <td>{{ pedido.c7EMISSAO }}</td>
                    <td>{{ pedido.c7FORNECE }} / {{ pedido.c7LOJA }}</td>
                    <td>{{ pedido.a2NOME }}</td>
                    <td>{{ pedido.c7COND }}</td>
                    <td class="text-left">
                      <button
                        class="btn btn-info m-0"
                        @click="openModalItens( pedido )"
                      >
                        <i class="fas fa-list" title="Itens do contrato"></i>
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


    <sweet-modal :width="'65%'" :blocking="true" ref="itensModal"
    title="" overlay-theme="dark">

      <h4>Itens do Pedido</h4>

      <div class="row">
        <div class="col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-body">
              <div class="table-responsive">
                <table id="tblKPI" class="table table-striped table-hover" >
                  <thead>
                    <tr>
                      <th>Código Produto</th>
                      <th>Descrição</th>
                      <th>Unidade de Medida</th>
                      <th>IPI</th>
                      <th>Desconto</th>
                      <th>Quantidade</th>
                      <th>Valor Unitário</th>
                      <th>Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in itens.stritenspc">
                      <td>{{ item.c7PRODUTO }}</td>
                      <td>{{ item.c7DESCRI }}</td>
                      <td>{{ item.c7UM }}</td>
                      <td>{{ item.c7IPI | formatNumberMoney}}</td>
                      <td>{{ item.c7DESC | formatNumberMoney}}</td>
                      <td>{{ item.c7QUANT | formatNumber}}</td>
                      <td>{{ item.c7PRECO | formatNumberMoney}}</td>
                      <td>{{ item.c7TOTAL | formatNumberMoney}}</td>
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
import { getPedidoDeCompras } from "../../backend";
import { SweetModal } from "sweet-modal-vue";

export default {
  data() {
    return {
      load: false,
      pedidos: [],
      itens: [],
      filter: "",
      oTable: null,
    };
  },
  components: {
    SweetModal,
  },
  mounted() {
    this.fetchPedidos();
  },
  methods: {
    createTable() {
      let vm = this;
      this.$nextTick(() => {
        this.oTable = $("#tblPedidos").DataTable({
          lengthMenu: [
            [25, 50, 100],
            [25, 50, 100],
          ],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json",
          },
          initComplete: function (settings) {
            vm.filter = settings.oLoadedState.search.search;
            $("#tblPedidos_filter").hide();
          },
          stateSave: true,
        });
      });
    },
    async fetchPedidos() {
      this.load = true;
      const { cnpj } = JSON.parse(localStorage.getItem("dadosUsuario"));

      this.pedidos = await getPedidoDeCompras({ cnpj });
      this.createTable();
      this.load = false;
    },
    openModalItens(pedido) {
      this.itens = JSON.parse(pedido.iTENS);
      this.$refs.itensModal.open();
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
