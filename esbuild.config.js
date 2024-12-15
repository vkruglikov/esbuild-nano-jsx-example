import esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy'

const isDev = process.argv.includes('--dev')

const context = await esbuild.context({
  logLevel: 'info',
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  inject: ['jsx-shim.ts'],
  outfile: 'dist/main.js',
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./public/*'],
        to: ['./dist']
      },
      watch: true
    })
  ],
  ...(isDev
    ? {
        jsxDev: true,
        sourcemap: true
      }
    : null)
})

if (isDev) {
  context.watch()
  context.serve({
    servedir: 'dist'
  })
} else {
  context.rebuild()
  context.dispose()
}
