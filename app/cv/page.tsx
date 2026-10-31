import { Metadata } from 'next';
import CvPage from '@/components/cv/cvPage';

export const metadata: Metadata = {
  title: 'CV - Jaival Saija',
  description:
    'My CV: DevOps at Maven Infosoft, my projects, and the M.Sc. at RPTU Kaiserslautern, with the PDF to download.',
};

export default function Cv() {
  return <CvPage />;
}
