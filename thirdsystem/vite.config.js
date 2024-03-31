import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue','vuex',"vue-router"],
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      dirs: ['src/components/'],
      extensions: ['vue', 'md'],
      resolvers: [AntDesignVueResolver(), IconsResolver()],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    createStyleImportPlugin({
      resolvers: [AntDesignVueResolver()],
    })
  ],
})