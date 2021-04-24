import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker'

import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from "vue-router";

import App from '../imports/ui/App.vue'
import {router} from "../imports/ui/router/Router";
import BootstrapVue, {IconsPlugin} from "bootstrap-vue/src";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Meteor.startup(() => {

    console.log("Startup")

    Tracker.autorun((computation) => {
        console.warn("Logging in...");

        if (!Meteor.loggingIn()) {
            computation.stop();
            console.warn("Initializing App...");

            Vue.config.productionTip = false

            const vuetify = new Vuetify();

            new Vue({
                el: '#app',
                router,
                vuetify,
                template: '<App/>',
                components: { App },
                render: h => h(App)
            })
        }
    });

});
