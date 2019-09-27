<template>
  <div class="main-page-holder">
    <div class="cats-panel">
      <div class="cats-title">
        <span>PWA app - test</span>
      </div>
      <div class="page-content">
        <div class="cats-holder">
          <div v-for="cat in cats" :key="cat.id">
            <span>{{cat.id}}</span>
            <!-- <img :src="cat.url" /> -->
          </div>
          <button @click="askPermission">click</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { catService } from "./../services";

export default {
  name: "MainPage",
  data() {
    return {
      cats: null,
      notifcationAllowed: true
    };
  },
  created() {
    this.getCatsList();
  },
  methods: {
    async getCatsList() {
      try {
        const res = await catService.getRandomCats(5);
        console.log("result: ", res.data);
        this.cats = res.data;
      } catch (err) {
        console.error("error! ", err);
      }
    },
    askPermission() {
      if (this.notifcationAllowed) {
        Notification.requestPermission(res => {
          console.log("result from permission questoin", res);
          if (res !== "granted") {
            alert("notificatoins not allowed");
          } else {
            console.log("test notification will be displayed now");
            this.showNotification();
          }
        });
      }
    },
    showNotification() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then(swreg =>
          swreg.showNotification("notifications granted!", {
            body: "test notification",
            vibrate: [300, 200, 300]
          })
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-page-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  .cats-panel {
    box-shadow: 4px 4px 27px -2px rgba(0, 0, 0, 0.43);
    border-radius: 12px;
    overflow: hidden;

    .cats-title {
      display: block;
      padding: 15px;
      background: #b4eab3;
      text-align: center;
      font-weight: 600;
      text-transform: uppercase;
    }

    .cats-holder {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 10px;

      img {
        max-width: 350px;
        margin: 10px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 100ms ease-in-out;

        &:hover {
          transform: translateY(-3px);
        }
      }
    }
  }
}
</style>