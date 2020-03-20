import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import Vue from "vue";

import App from "./App";
import appInfo from "./app-info";

Vue.config.productionTip = false;
Vue.prototype.$appInfo = appInfo;

new Vue({
  render: h => h(App)
}).$mount("#app");
