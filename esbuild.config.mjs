import * as esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

// import packageJson from './nodejs/package.json' assert { type: 'json' }

await esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  outfile: './index.js',
  // plugins: [nodeExternalsPlugin()],
  external: ['@sparticuz/chromium']
  // external: Object.keys(packageJson.dependencies)
})
