export type RehypeExternalLinksOptions = {
  /**
   * Force external links to open in a new tab.
   * Default: true
   */
  targetBlank?: boolean;

  /**
   * Rel tokens to ensure exist on external links.
   * Default: ['noopener', 'noreferrer']
   */
  rel?: string[];

  /**
   * Decide whether a URL should be treated as external.
   * Default: any http/https URL.
   */
  isExternal?: (href: string) => boolean;
};

function defaultIsExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

function ensureRel(existing: unknown, tokens: string[]) {
  const existingTokens = new Set<string>();

  if (typeof existing === 'string') {
    for (const t of existing.split(/\s+/).filter(Boolean))
      existingTokens.add(t);
  } else if (Array.isArray(existing)) {
    for (const t of existing.filter((v) => typeof v === 'string')) {
      existingTokens.add(t as string);
    }
  }

  for (const t of tokens) existingTokens.add(t);
  return Array.from(existingTokens).join(' ');
}

function visit(node: any, fn: (node: any) => void) {
  if (!node || typeof node !== 'object') return;
  fn(node);
  const children = (node as any).children;
  if (Array.isArray(children)) {
    for (const child of children) visit(child, fn);
  }
}

export default function rehypeExternalLinks(
  options: RehypeExternalLinksOptions = {}
) {
  const {
    targetBlank = true,
    rel = ['noopener', 'noreferrer'],
    isExternal = defaultIsExternal,
  } = options;

  return function transformer(tree: any) {
    visit(tree, (node) => {
      if (node?.type !== 'element' || node?.tagName !== 'a') return;

      const props = (node.properties ??= {});
      const href = props.href;
      if (typeof href !== 'string' || href.length === 0) return;

      // Skip anchors and non-http(s) schemes.
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      if (!isExternal(href)) return;

      if (targetBlank) {
        props.target = '_blank';
      }

      props.rel = ensureRel(props.rel, rel);
    });

    return tree;
  };
}
