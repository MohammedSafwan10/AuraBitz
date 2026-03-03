const fs = require('fs');

const files = [
    'src/components/blocks/hero-01.tsx',
    'src/components/blocks/hero-02.tsx',
    'src/components/blocks/hero-03.tsx',
    'src/components/blocks/hero-04.tsx',
    'src/components/blocks/hero-05.tsx',
    'src/components/blocks/bento-01.tsx',
    'src/components/blocks/bento-02.tsx',
    'src/components/blocks/bento-04.tsx',
];

let count = 0;
for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');

    if (content.includes('webgl-loader')) {
        console.log('SKIP (already has loader): ' + f);
        continue;
    }

    const oldDynamic = '{ ssr: false }';
    const newDynamic = '{ ssr: false, loading: () => <WebGLLoader /> }';

    if (!content.includes(oldDynamic)) {
        console.log('SKIP (no ssr:false found): ' + f);
        continue;
    }

    content = content.replace(oldDynamic, newDynamic);

    content = content.replace(
        'import dynamic from "next/dynamic";',
        'import dynamic from "next/dynamic";\nimport { WebGLLoader } from "@/components/ui/webgl-loader";'
    );

    fs.writeFileSync(f, content, 'utf8');
    count++;
    console.log('UPDATED: ' + f);
}
console.log('Done. Updated ' + count + ' files.');
