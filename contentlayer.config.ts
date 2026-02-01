import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm'; // Untuk mendukung GitHub Flavored Markdown (opsional)
import rehypeSlug from 'rehype-slug'; // Menambahkan slug ke elemen heading (opsional)
import rehypePrettyCode from 'rehype-pretty-code'; // Untuk pewarnaan sintaksis (opsional)
import rehypePresetMinify from 'rehype-preset-minify';
import rehypeExternalLinks from './libs/rehype-external-links';

export const Blogs = defineDocumentType(() => ({
  name: 'Blogs',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blogs],
  mdx: {
    remarkPlugins: [remarkGfm], // Menambahkan plugin Remark (opsional)
    rehypePlugins: [
      rehypeSlug, // Menambahkan slug untuk heading
      rehypeExternalLinks,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark', // Pilih tema untuk pewarnaan kode
        },
      ],
      rehypePresetMinify,
    ], // Menambahkan plugin Rehype (opsional)
  },
  disableImportAliasWarning: true,
});
