import VueRouter, { RouteConfig } from "vue-router";
import GiftListsPage from "../pages/SamplePage.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import {Meteor} from "meteor/meteor";

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "GiftLists",
        component:  GiftListsPage
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage
    },
    {
        path: "/sign-up",
        name: "SignUp",
        component: SignUpPage
    },
    {
        path: '/404',
        name: '404',
        component:  PageNotFound
    }
];

export const router: VueRouter = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name !== "Login" && to.name !== "SignUp" && Meteor.userId() == null) {
        next({name: 'Login'});
    } else {
        next();
    }
});