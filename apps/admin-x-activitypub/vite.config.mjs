import adminXViteConfig from '@tryghost/admin-x-framework/vite';
import path, {resolve} from 'path';
import pkg from './package.json';
import react from '@vitejs/plugin-react';

export default (function viteConfig() {
    return adminXViteConfig({
        packageName: pkg.name,
        entry: resolve(__dirname, 'src/index.tsx'),
        overrides: {
            plugins: [react()],
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src')
                }
            }
        }
    });
});
