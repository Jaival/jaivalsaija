import React from 'react';
import ContactMe from '../../components/contactme';
import ContainerMain from '../../components/mainContainer';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Contact Me - Jaival Saija',
};

export default function contactMe() {
  return (
    <ContainerMain>
      <ContactMe />
    </ContainerMain>
  );
}
