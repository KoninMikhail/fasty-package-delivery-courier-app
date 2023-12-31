/// <reference types="vitest" />

import path from 'path';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { vitePluginVersionMark } from 'vite-plugin-version-mark';

export default defineConfig(({ mode }) => ({
    test: {
        css: false,
        include: ['src/**/__tests__/*'],
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/shared/config/tests/setupTests.ts',
        clearMocks: true,
        coverage: {
            provider: 'istanbul',
            enabled: true,
            '100': true,
            reporter: ['text', 'lcov'],
            reportsDirectory: 'coverage'
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        tsconfigPaths(),
        react(),
        ...(mode === 'test'
            ? []
            : [
                eslintPlugin(),
                VitePWA({
                    registerType: 'autoUpdate',
                    includeAssets: [
                        'favicon.png',
                        'robots.txt',
                        'apple-touch-icon.png',
                        'icons/*.svg',
                        'fonts/*.woff2'
                    ],
                    manifest: {
                        name: 'Fasty - Delivery Exchange For Couriers',
                        short_name: 'Fasty',
                        theme_color: '#BD34FE',
                        icons: [
                            {
                                src: '/android-chrome-192x192.png',
                                sizes: '192x192',
                                type: 'image/png',
                                purpose: 'any maskable'
                            },
                            {
                                src: '/android-chrome-512x512.png',
                                sizes: '512x512',
                                type: 'image/png'
                            }
                        ]
                    }
                }),
              vitePluginVersionMark({
                  ifGitSHA: true,
                  ifShortSHA: true,
                  ifMeta: true,
                  ifLog: true,
                  ifGlobal: true,
              }),
                svgr(),
            ])
    ]
}));
