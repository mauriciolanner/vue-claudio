<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >

    <div class="sidebar-heading">Modulos</div>

    <li class="nav-item">
      <router-link class="nav-link" to="/portal/1/portalcontratos/contrato">
        <i class="fas fa-file-contract"></i>
        <span>Contratos</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/portal/1/portalcontratos/pedidos">
        <i class="fas fa-shopping-basket"></i>
        <span>Pedidos de Compras</span>
      </router-link>
    </li>
    
    <li class="nav-item">
      <a href="#" @click="signOut()" class="nav-link">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </a>
    </li>

    <hr class="sidebar-divider d-none d-md-block" />    

    <div class="text-center d-none d-md-inline mt-5">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
</template>

<script>
import $ from "jquery";

export default {
  mounted() {
    // $('body').toggleClass('sidebar-toggled')
    // $('.sidebar').toggleClass('toggled')
    //
    // if ($(".sidebar").hasClass("toggled")) {
    //   $(".sidebar .collapse").collapse("hide");
    // }

    $("#sidebarToggle, #sidebarToggleTop").on("click", () => {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        //$(".sidebar .collapse").collapse("hide");
        $(".sidebar .collapse").removeClass("show");
      }
    });

    $("body").on("click", () => {
      //if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").removeClass("show");
      //}
    });
  },
  methods: {
    signOut() {
        localStorage.setItem('dadosUsuario', null);
        this.$router.replace({ name:"login-fluig" });
    }
  },
};
</script>

<style lang="scss">
ul {
  li {
    p {
      margin: 0;
    }
  }
}
</style>
