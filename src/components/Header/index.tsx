import { ComponentType } from 'react';

import { Container, Content, Title } from './styles';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: ComponentType;
}

export function Header({ title, subtitle, icon: Icon }: HeaderProps) {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <Title>
            <Icon />
            <h1>{title}</h1>
          </Title>

          <h2>{subtitle}</h2>
        </div>
      </Content>
    </Container>
  );
}
