import React from 'react';
import AboutMe from '../../components/aboutme';
import ContainerMain from '../../components/mainContainer';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'About - Jaival Saija',
};

export default function aboutMe() {
  return (
    <ContainerMain>
      <AboutMe />
    </ContainerMain>
  );
}
