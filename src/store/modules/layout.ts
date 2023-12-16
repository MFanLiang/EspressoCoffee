/** Layout布局组件相关状态 */

import { defineStore } from 'pinia';
import type { SettingState } from './types/type';

const ueeLayOutSettingStore = defineStore('SettingStore', {
  state: (): SettingState => {
    return {
      fold: false,
      refresh: false,
      sysSettingDrawerVisible: false,
    }
  },
});

export default ueeLayOutSettingStore;
