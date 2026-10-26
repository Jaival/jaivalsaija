import type { Series } from '@/utils/interface';

// A post joins a series with `series: '<id>'` in its metadata; each id here
// gets a page at /blog/series/<id> listing its parts in order.
const series = {
  'kubernetes-lab': {
    title: 'Kubernetes Learning Lab',
    description:
      'Working through a hands-on Kubernetes course on a local kind cluster, one module at a time, from Pods to GitOps with Argo CD.',
    url: 'https://github.com/Jaival/kubernetes-learning-lab',
  },
  'jobhunt-agent': {
    title: 'jobhunt-agent releases',
    description:
      'What each release of my daily job-search routine changes, and why.',
    url: 'https://github.com/Jaival/jobhunt-agent',
    guide: 'jobhunt-agent-setup',
  },
} satisfies Record<string, Series>;

export type SeriesId = keyof typeof series;

export default series as Record<SeriesId, Series>;
