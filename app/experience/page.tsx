import { Metadata } from 'next';
import Experience from '@/components/experience';
import PageWrapper from '@/components/pageWrapper';

export const metadata: Metadata = {
  title: 'Experience - Jaival Saija',
};

export default function experience() {
  return (
    <PageWrapper>
      <Experience />
    </PageWrapper>
  );
}
