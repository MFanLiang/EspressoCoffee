import { resolve } from 'path';
import { loadEnv } from 'vite';
import { createHtmlPlugin } from "vite-plugin-html";
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

/** 获取环境变量 env */
const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target];
};

// https://vitejs.dev/config/
const baseConfig = (mode) => {
  return {
    plugins: [
      vue(),
      // 自动按需引入elmentPlus
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // svg 图标配置插件
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // Specity symbolId format
        symbolId: 'icon-[dir]-[name]'
      }),
      // 环境变量 .env 设置 html 页面标题与logo
      createHtmlPlugin({
        inject: {
          data: {
            logo: getViteEnv(mode, "VITE_APP_LOGO"),
            title: getViteEnv(mode, "VITE_APP_TITLE"),
          },
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, '../src'),
        },
        {
          find: 'assets',
          replacement: resolve(__dirname, '../src/assets'),
        },
      ],
      extensions: ['.ts', '.js'],
    },

    // 配置项目全局可用变量的样式
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import './src/styles/variable.scss'; @import './src/styles/bem.scss';`,
        }
      }
    },
  }
};

export default baseConfig;
