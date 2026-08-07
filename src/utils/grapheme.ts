/**
 * Bangla & Universal Unicode Extended Grapheme Cluster Utility
 * Prevents DOM text-node isolation of dependent vowels (Kars like e-kar, i-kar, etc.)
 * which cause browsers to render fallback dotted circles (U+25CC) and artificial spaces.
 */

export interface ClusterInfo {
  cluster: string;
  start: number;
  end: number;
}

interface SegmenterInstance {
  segment(input: string): Iterable<{ segment: string }>;
}

interface ExtendedIntl {
  Segmenter?: new (locale: string, options?: { granularity: string }) => SegmenterInstance;
}

export function getGraphemeClusters(text: string): string[] {
  if (!text) return [];

  const intlObj = Intl as unknown as ExtendedIntl;
  if (typeof Intl !== "undefined" && intlObj.Segmenter) {
    const segmenter = new intlObj.Segmenter("bn", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text)).map((s: { segment: string }) => s.segment);
  }

  // Fallback regex for Bangla grapheme clusters (base char + combining marks/kars/virama, including Bangla Extended)
  const graphemeRegex = /[\u0980-\u09FF\uA980-\uA9DF][\u09BC-\u09CD\u09D7\u200C\u200D]*/g;
  graphemeRegex.lastIndex = 0;
  const clusters: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = graphemeRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      clusters.push(...Array.from(text.slice(lastIndex, match.index)));
    }
    clusters.push(match[0]);
    lastIndex = graphemeRegex.lastIndex;
    if (match.index === graphemeRegex.lastIndex) {
      graphemeRegex.lastIndex++;
    }
  }
  if (lastIndex < text.length) {
    clusters.push(...Array.from(text.slice(lastIndex)));
  }
  return clusters;
}

export function getClusterRanges(text: string): ClusterInfo[] {
  const clusters = getGraphemeClusters(text);
  const result: ClusterInfo[] = [];
  let currentOffset = 0;

  for (const cluster of clusters) {
    const start = currentOffset;
    const end = currentOffset + cluster.length;
    result.push({ cluster, start, end });
    currentOffset = end;
  }

  return result;
}
