<template>
  <b-row class="vh-100 row-login">
    <b-col lg="6" class="d-none d-lg-block text-center">
      <img
        src="https://s29.q4cdn.com/562286712/files/design/logo/Largo-Logo-RGB-Reverse.png"
        style="width: 514px; margin-top: 50%"
      />
    </b-col>
    <b-col
      lg="6"
      md="12"
      sm="12"
      class="d-flex justify-content-center align-items-center left-login"
    >
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">Faça o login</h2>
        <p v-if="load" class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
        </p>
        <b-form>
          <b-form-group label="Login" label-for="email">
            <b-form-input
              id="email"
              type="text"
              placeholder="Digite seu login"
              autocomplete="true"
              v-model.trim="$v.form.email.$model"
              :state="true"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-for="password">
            <label class="d-flex justify-content-between">
              Senha
              <small
                ><a href="#" @click="openModalRecuperaSenha"
                  >Esqueceu sua senha?</a
                ></small
              >
            </label>

            <b-form-input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              v-model="$v.form.password.$model"
              :state="getValidation('password')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Cnpj" label-for="cnpj">
            <b-form-input
              id="cnpj"
              type="text"
              placeholder="Digite seu cnpj"
              autocomplete="true"
              v-model="$v.form.cnpj.$model"
              :state="getValidation('cnpj')"
            ></b-form-input>
          </b-form-group>

          <b-button type="button" variant="dark" block @click="login">
            <i class="fas fa-sign-in-alt"></i> Entrar
          </b-button>

          <p class="text-danger" v-if="acessoInvalido">{{ mensagemErro }}</p>
        </b-form>
      </div>
    </b-col>

    <sweet-modal
      :width="'65%'"
      :blocking="true"
      ref="recuperaSenhaModal"
      title=""
      overlay-theme="dark"
    >
      <h4>Alterar senha</h4>

      <b-form>
        <b-form-group label="E-mail" label-for="email">
          <b-form-input
            id="emailRecuperaSenha"
            type="text"
            placeholder="Digite seu e-mail"
            autocomplete="true"
            v-model.trim="$v.formRecuperaSenha.email.$model"
            :state="getValidationRecuperaSenha('email')"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-for="password" label="Senha">
          <b-form-input
            id="passwordRecuperaSenha"
            type="password"
            placeholder="Digite sua senha"
            v-model="$v.formRecuperaSenha.password.$model"
            :state="getValidationRecuperaSenha('password')"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Cnpj" label-for="cnpj">
          <b-form-input
            id="cnpjRecuperaSenha"
            type="text"
            placeholder="Digite seu cnpj"
            autocomplete="true"
            v-model="$v.formRecuperaSenha.cnpj.$model"
            :state="getValidationRecuperaSenha('cnpj')"
          ></b-form-input>
        </b-form-group>

        <b-button type="button" variant="primary" block @click="alteraSenha()">
          Alterar senha
        </b-button>
      </b-form>
    </sweet-modal>
  </b-row>
</template>
 
<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { getAcesso, recuperaSenha } from "../backend";
import { SweetModal } from "sweet-modal-vue";

export default {
  data() {
    return {
      load: false,
      form: {
        email: "",
        password: "",
        cnpj: "",
      },
      formRecuperaSenha: {
        email: "",
        password: "",
        cnpj: "",
      },
      acessoInvalido: false,
      mensagemErro: "",
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },

      password: {
        required,
      },

      cnpj: {
        required,
        minLength: minLength(14),
      },
    },
    formRecuperaSenha: {
      email: {
        required,
        email,
      },

      password: {
        required,
      },

      cnpj: {
        required,
        minLength: minLength(14),
      },
    },
  },
  components: {
    SweetModal,
  },

  methods: {
    async login() {
      console.log("[TESTE LOGIN]");
      console.log(this.$v.form);
      // this.$v.$touch();
      // if (this.$v.form.$error) {
      //   return;
      // }
      console.log("[TESTE LOGIN passou]");

      this.load = true;
      const { cnpj, email, password } = this.form;
      const resultAcesso = await getAcesso({ cnpj, email, password });
      this.load = false;

      console.log(resultAcesso);

      if (resultAcesso.lSTATUS === "false") {
        this.acessoInvalido = true;
        this.mensagemErro = resultAcesso.cMENSAGEM;
        return;
      } else if (resultAcesso.lSTATUS === "true") {
        localStorage.setItem("dadosUsuario", JSON.stringify(this.form));

        this.$router.push({ name: "contrato" });
      }
    },

    async alteraSenha() {
      const result = await recuperaSenha({ ...this.formRecuperaSenha });
      if (result.lSTATUS === "true") {
        this.$swal.fire(result.cMENSAGEM, "success");

        this.$refs.recuperaSenhaModal.close();
      }
    },

    getValidation(field) {
      if (this.$v.form.$dirty === false) {
        return null; //enquanto o form não for submetido não valida os campos
      }

      return !this.$v.form[field].$error;
    },
    getValidationRecuperaSenha(field) {
      if (this.$v.formRecuperaSenha.$dirty === false) {
        return null; //enquanto o form não for submetido não valida os campos
      }

      return !this.$v.formRecuperaSenha[field].$error;
    },
    openModalRecuperaSenha() {
      this.$refs.recuperaSenhaModal.open();
    },
  },
};
</script>
 
<style>
*, /*resetar o estilo da página*/
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.row-login {
  margin-left: 0;
}

.left-login {
  background-color: #f2f2f2;
}

.title-login {
  font-weight: bold;
}

.img-login {
  width: 514px;
  margin-top: 50%;
}
</style>