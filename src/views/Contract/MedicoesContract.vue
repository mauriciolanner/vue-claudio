<template lang="html">
    <div class="integration-list">
    <div class="row my-5">
      <div class="col-lg-12">
        <h2 class="text-primary font-weight-bold">
          Lista |
            <span class="text-secondary font-weight-light">
              Medições Contrato: {{this.$route.params.contrato}}
            </span>
        </h2>
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
    <div class="row mb-3">
      <div class="col-lg-12">
        <div class="input-group mr-4">
         <button
          class="btn btn-dark m-0" style="margin-right: 9px !important;"
          @click="openModalCreateMedicao"
        >
          Criar Medição
        </button>

        <button
          class="btn btn-dark m-0"
          onclick="javascript:history.back()"
        >
          Voltar
        </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-body">
            <div class="table-responsive">
              <table id="tblItensMedicoes" class="table table-striped table-hover" >
                <thead>
                  <tr>
                    <th>Nr. Medição</th>
                    <th>Nr. Revisão</th>
                    <th>Fornecedor - Loja</th>
                    <th>Competência</th>
                    <th>Cond Pagto</th>
                    <th>Parcela</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="medicao in medicoes"
                    :key="medicao.cNDNUMMED"
                  >
                    <td>{{ medicao.cNDNUMMED }}</td>
                    <td>{{ medicao.cNDREVISA }}</td>
                    <td>{{ medicao.a2NOME }} - {{ medicao.cNDLJFORN }}</td>
                    <td>{{ medicao.cNDCOMPET }}</td>
                    <td>{{ medicao.cNDCONDPG }}</td>
                    <td>{{ medicao.cNDPARCEL }}</td>
                    <td class="text-left">
                      <button
                        class="btn btn-info m-0"
                        @click="openModalItens( medicao )"
                      >
                        <i title="Itens da medição" class="fas fa-list"></i>
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

      <h4>Itens da Medição</h4>

      <div class="row">
        <div class="col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-body">
              <div class="table-responsive">
                <table id="tblKPI" class="table table-striped table-hover" >
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Código Produto</th>
                      <th>Descrição</th>
                      <th>Centro de Custo</th>
                      <th>Conta Contábil</th>
                      <th>Quantidade</th>
                      <th>Valor Unitário</th>
                      <th>Valor Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in itens">
                      <td>{{ item.cneitem }}</td>
                      <td>{{ item.cneprodut }}</td>
                      <td>{{ item.cnefsdesc }}</td>
                      <td>{{ item.cnecc }}</td>
                      <td>{{ item.cneconta }}</td>
                      <td>{{ item.cnequant | formatNumber}}</td>
                      <td>{{ item.cnevlunit | formatNumberMoney}}</td>
                      <td>{{ item.cnevltot | formatNumberMoney}}</td>
                      <td>
                        <button
                          class="btn btn-info m-0"
                          @click="openModalKPI( item )"
                        >
                          KPI's
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>Total itens:</strong> {{totalQtdMed}}
                      </td>
                      <td></td>
                      <td>
                        <strong>Total Valor:</strong> {{totalValorMed | formatNumberMoney}}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </sweet-modal>

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
                    <tr v-for="kpi in kpis">
                      <td>{{ kpi.zlitem }}</td>
                      <td>{{ kpi.zldescric }}</td>
                      <td>{{ kpi.zlmeta }}</td>
                      <td>{{ kpi.zlreferen }}</td>
                      <td>{{ kpi.zlobs}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </sweet-modal>

    <sweet-modal :width="'65%'" :blocking="true" ref="createMedicaoModal"
    title="" overlay-theme="dark">

      <h4>Criar Medição</h4>
      <p v-if="load" class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
        </p>
      <b-row>
        <b-col lg="4">
          <label for>Contrato</label>
          <b-form-input type="text" readonly v-model="medicao.cnd_contra"/>
        </b-col>
        <b-col lg="4">
          <label for>Revisão</label>
          <b-form-input type="text" readonly v-model="medicao.cnd_revisa"/>
        </b-col>
        <b-col lg="4">
          <label for>Fornecedor</label>
          <b-form-input type="text" readonly v-model="medicao.cnd_fornec"/>
        </b-col>        
        <b-col lg="4">
          <label for>Número</label>
          <b-form-input type="text" readonly v-model="medicao.cnd_numero"/>
        </b-col>
        <b-col lg="4">
          <label for>Competência </label>
          <h4>{{this.medicao.cnd_competencia}}</h4>
        </b-col>
        <b-col lg="4">
          
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="12">
          <label for>Texto para nota fiscal</label>
          <textarea v-model="medicao.cnd_nfparc" rows="3" class="form-control"></textarea>
          <br><br>
        </b-col>
      </b-row>

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
                      <th>SC</th>
                      <th>Quantidade Solicitada</th>
                      <th>Saldo</th>
                      <th>Quantidade</th>
                      <th>Percentual</th>
                      <th>Valor Unitário</th>
                      <th>Valor Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in medicao.itens">
                      <td>{{ item.cnbitem }}</td>
                      <td>{{ item.cnbprodut }}</td>
                      <td>{{ item.cnbdescri }}</td>
                      <td>
                        {{ item.cnbcc }}
                        <b-form-select style="width: 223px;" v-model="item.cnbcc" :options="optionsCentroCusto"></b-form-select>
                      </td>
                      <td>{{ item.cnbconta }}</td>
                      <td>{{ item.cnbnumsc }}</td>
                      <td>{{ item.cnbquant }}</td>
                      <td>{{ item.cnbsldmed }}</td>
                      <td>
                        <money v-model="item.quantidade" v-bind="money" class="form-control" @blur.native="calculaQuantidade('quantidade',item); calculaTotais(medicao.itens)" :readonly="parseFloat(item.cnbsldmed.replace(',', '.')) ===  parseFloat(0.00)"></money>
                      </td>
                      <td>
                        <money v-model="item.percentual" v-bind="money" class="form-control" @blur.native="calculaQuantidade('percentual',item); calculaTotais(medicao.itens)" :readonly="parseFloat(item.cnbsldmed.replace(',', '.')) ===  parseFloat(0.00)"></money>
                      </td>
                      <td>{{ item.cnbvlunit | formatNumberMoney }}</td>
                      <td>{{ item.cnbvltot | formatNumberMoney}}</td>
                      <td class="text-left">
                        <button
                          class="btn btn-info m-0"
                          @click="openModalCreateKPI( item )"
                          v-if="item.kpi.strkpiplanilha"
                        >
                          KPI's
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>Total Qtd:</strong> {{this.totalQtd}}
                      </td>
                      <td>
                        <strong>Total %:</strong> {{this.totalPercent}}%
                      </td>
                      <td></td>
                      <td>
                        <strong>Total Valores:</strong> {{this.totalValor | formatNumberMoney}}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-secondary m-0"
        @click="saveMedicao"
      >
        Salvar
      </button>
      <p class="text-danger" v-if="erroMedicao">{{ messageError }}</p>

    </sweet-modal>

    <sweet-modal :width="'65%'" :blocking="true" ref="createKpiModal"
    title="" overlay-theme="dark">

      <h4>Medições</h4>

      <div class="row">
        <div class="col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-body">
              <div class="table-responsive">
                <table id="tblItensContrato" class="table table-striped table-hover" >
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Descrição</th>
                      <th>SC</th>
                      <th>Meta</th>
                      <th>Valor Medido</th>
                      <th>Referência</th>
                      <th>Tipo</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in itemSelecionado.kpi.strkpiplanilha">
                      <td>{{ item.zkitem }}</td>
                      <td>{{ item.zkdescric }}</td>
                      <td>{{ item.zkitsc }}</td>
                      <td>{{ item.zkmeta }}</td>
                      <td>
                        <b-form-input type="text" v-model="item.zlvlrmed" />
                      </td>
                      <td>{{ item.zkreferen }}</td>
                      <td>{{ item.zktipo }}</td>
                      <td>
                         <b-form-input type="text" v-model="item.zkobs.trim()" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
      @click="openModalKPIClose()"
        class="btn btn-secondary m-0"
      >
        Salvar
      </button>
    </sweet-modal>

  </div>
</template>

<script>
import numeral from "numeral";
import { Money } from "v-money";
import $ from "jquery";
import "datatables.net-bs4";
import {
  getMedicoes,
  getItensContracts,
  gravaMedicao,
  getCompetencias,
  getCentroCusto,
} from "../../backend";
import { SweetModal } from "sweet-modal-vue";

export default {
  data() {
    return {
      totalValor: 0.0,
      totalQtd: 0.0,
      totalValorMed: 0.0,
      totalQtdMed: 0.0,
      totalPercent: 0.0,
      back: "",
      selected: null,
      selectedCusto: null,
      options: [],
      optionsCentroCusto: [],
      medicoes: [],
      centroCusto: [],
      itens: [],
      kpis: [],
      load: false,
      filter: "",
      oTable: null,
      medicao: {
        cnd_contra: "",
        cnd_fornec: "",
        cnd_ljforn: "",
        cnd_nfparc: "",
        cnd_numero: "",
        cnd_parcel: "",
        cnd_revisa: "",
        cnd_filori: "",
        cnd_competencia: "",
        itens: [],
      },
      money: {
        decimal: ".",
        thousands: "",
        prefix: "",
        suffix: "",
        precision: 4,
        masked: true,
      },
      currency: {
        decimal: ",",
        thousands: ".",
        prefix: "R$",
        suffix: "",
        precision: 2,
        masked: false,
      },
      itemSelecionado: {
        kpi: {
          strkpiplanilha: {},
        },
      },
      erroMedicao: false,
      messageError: "",
    };
  },
  components: {
    SweetModal,
    Money,
  },
  mounted() {
    this.fetchMedicoesContracts();
  },
  methods: {
    createTable() {
      let vm = this;
      this.$nextTick(() => {
        this.oTable = $("#tblItensMedicoes").DataTable({
          lengthMenu: [
            [25, 50, 100],
            [25, 50, 100],
          ],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json",
          },
          initComplete: function (settings) {
            vm.filter = settings.oLoadedState.search.search;
            $("#tblItensMedicoes_filter").hide();
          },
          stateSave: true,
        });
      });
    },
    async fetchContract() {
      this.load = true;
      const { email } = JSON.parse(localStorage.getItem("dadosUsuario"));
      const contract = await getItensContracts(this.$route.params.contrato);
      const planilhaContrato = JSON.parse(contract.iTENS);
      const competenciasCont = await getCompetencias(
        this.$route.params.contrato
      );

      const centrodeCusto = await getCentroCusto();

      this.centroCusto = centrodeCusto;

      this.options = competenciasCont.map(function (competencias) {
        return {
          value: competencias.cNDRCCOMP,
          text: competencias.cNDRCCOMP,
        };
      });

      this.optionsCentroCusto = centrodeCusto.map(function (centrosCusto) {
        return {
          value: centrosCusto.cTTCUSTO,
          text: centrosCusto.cTTCUSTO + " - " + centrosCusto.cTTDESC01,
        };
      });

      var data = new Date();
      var mes = String(data.getMonth() + 1).padStart(2, "0");
      var ano = data.getFullYear();

      this.selected = mes + "/" + ano;
      this.medicao.cnd_contra = contract.cNACONTRA;
      this.medicao.cnd_revisa = contract.cNAREVISA;
      this.medicao.cnd_fornec = contract.cNAFORNEC;
      this.medicao.cnd_ljforn = contract.cNALJFORN;
      this.medicao.cnd_numero = contract.cNANUMERO;
      this.medicao.cnd_revisa = contract.cNAREVISA || "";
      this.medicao.cnd_filori = this.$route.params.filial;
      this.medicao.cnd_competencia = this.selected;

      this.medicao.itens = planilhaContrato.stritensplanilha.map((planilha) => {
        planilha.cnbquant = numeral(parseFloat(planilha.cnbquant)).format(
          "0.0000"
        );
        planilha.cnbsldmed = numeral(parseFloat(planilha.cnbsldmed)).format(
          "0.0000"
        );
        planilha.kpi.strkpiplanilha = !planilha.kpi.strkpiplanilha
          ? planilha.kpi.strkpiplanilha
          : Array.isArray(planilha.kpi.strkpiplanilha)
          ? planilha.kpi.strkpiplanilha
          : [planilha.kpi.strkpiplanilha];
        return planilha;
      });
      this.load = false;
      console.log("this.medicao.itens");
      console.log(this.medicao.itens);

      for (var j = 0; j < this.medicao.itens.length; j++) {
        this.totalValor += this.medicao.itens[j].cnbvltot;
      }
    },
    async fetchMedicoesContracts() {
      this.load = true;
      this.medicoes = [];
      const result = await getMedicoes(this.$route.params.contrato);

      var objeto = "";
      var arrayobjeto = [];

      for (var j = 0; j < result.length; j++) {
        var ArraytensObj = JSON.parse(result[j].iTENS);
        ArraytensObj = ArraytensObj.stritensmedicao;
        var somaItens = 0;
        var SomaValor = 0.0;
        objeto = result[j];

        for (var h = 0; h < ArraytensObj.length; h++) {
          somaItens += ArraytensObj[h].cnequant;
          SomaValor += ArraytensObj[h].cnevltot;
        }

        objeto["TotalItens"] = somaItens;
        objeto["TotalValor"] = SomaValor;
        arrayobjeto.push(objeto);
      }

      this.medicoes = arrayobjeto;
      this.createTable();
      this.load = false;

      console.log("this.medicoes");
      console.log(this.medicoes);
    },
    openModalItens(item) {
      this.load = true;
      var itensArray = JSON.parse(item.iTENS);
      this.itens = itensArray.stritensmedicao;
      this.totalValorMed = item.TotalValor,
      this.totalQtdMed = item.TotalItens,
      this.$refs.itensModal.open();
      this.load = false;
    },
    openModalKPI(item) {
      this.load = true;
      this.kpis = item.kpi.strkpimedicao;
      this.$refs.kpiModal.open();
      this.load = false;
    },
    openModalKPIClose() {
      this.$refs.createKpiModal.close();
    },
    async openModalCreateMedicao() {
      this.load = true;
      this.messageError = "";
      this.erroMedicao = false;
      await this.fetchContract();
      this.$refs.createMedicaoModal.open();
      this.load = false;
    },
    openModalCreateKPI(item) {
      this.load = true;
      this.itemSelecionado = item;

      this.$refs.createKpiModal.open();
      this.load = false;
    },
    async saveMedicao() {
      this.load = true;
      const result = await gravaMedicao(
        this.medicao,
        this.selected,
        this.$route.params.filial
      );

      if (result.lSTATUS === "true") {
        this.$refs.createMedicaoModal.close();
        this.$swal.fire("Medição salva com sucesso!", "success");
      } else {
        this.messageError = result.cMENSAGEM;
        console.error(this.messageError);
        this.erroMedicao = true;
      }
      await this.fetchContract();
      this.load = false;
    },
    calculaTotais(item) {
      this.totalQtd = 0.0;
      this.totalPercent = 0.0;
      for (var j = 0; j < item.length; j++) {
        this.totalQtd += parseFloat(item[j].quantidade);
        this.totalPercent += parseFloat(item[j].percentual);
      }
    },
    calculaQuantidade(tipoCampo, item) {
      if (tipoCampo === "percentual") {
        var quantidade =
          (parseFloat(item.cnbsldmed.replace(",", ".")) *
            parseFloat(item.percentual.replace(",", "."))) /
          100;
        item.quantidade = quantidade;
      } else if (tipoCampo === "quantidade") {
        var percentual =
          (100 * parseFloat(item.quantidade.replace(",", "."))) /
          parseFloat(item.cnbsldmed.replace(",", "."));
        item.percentual = percentual;
      }
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
      return numeral(parseFloat(value)).format("0.0000");
    },
  },
};
</script>
