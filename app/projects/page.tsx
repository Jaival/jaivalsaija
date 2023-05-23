import React from 'react';
import ContainerMain from '../../components/mainContainer';
import Projects from '../../components/projects';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Projects - Jaival Saija',
};
export default function projects() {
  return (
    <ContainerMain>
      <Projects />
    </ContainerMain>
  );
}
