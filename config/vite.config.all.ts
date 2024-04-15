import { defineConfig } from 'vite';
import baseConfig from './vite.config.base';

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // 根据当前工作目录中的 'mode'配置选项 加载项目根目录下的 .env.devlopment 文件
      mode: 'development', // 当前项目工作模式为开发模式

      // 开发模式环境下的服务配置设置
      server: {
        host: '0.0.0.0',
        port: 4040,
        open: true,
        fs: {
          strict: true,
        },
        proxy: {
          '/api': {
            target: 'http://116.63.42.17/api',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          }
        },
      },
      ...baseConfig(mode),
    }
  } else {
    // command === 'build'
    return {
      // 根据当前工作目录中的 'mode'配置选项 加载项目根目录下的 .env.production 文件
      mode: 'production', // 当前项目工作模式为生产模式
      // 打包配置
      build: {
        chunkSizeWarningLimit: 2000,
      },
      ...baseConfig(mode),
    }
  }
})
