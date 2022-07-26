const esbuild = require('esbuild');
esbuild
    .build({
        entryPoints: ['src/index.ts'],
        outdir: 'lib',
        bundle: true,
        format: 'cjs',
        platform: "node"
    })
    .catch(() => process.exit(1));