  <template>
  <div id="wrapper">
    <Sidebar v-if="isAuth"/>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar v-if="isAuth"/>
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
      <Footer v-if="isAuth"/>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  components: {
    Sidebar,
    Navbar,
    Footer
  },
  computed:{
    isAuth(){
      return localStorage.getItem('dadosUsuario') !== 'null';
    }
  }
};
</script>
