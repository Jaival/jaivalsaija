import Experience from '../../components/experience';
import ContainerMain from '../../components/mainContainer';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Experience - Jaival Saija',
};
export default function experience() {
  return (
    <ContainerMain>
      <Experience />
    </ContainerMain>
  );
}