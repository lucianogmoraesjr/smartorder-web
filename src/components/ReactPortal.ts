import { ReactNode } from 'react';
import * as ReactDOM from 'react-dom';

interface ReactPortalProps {
  containerId: string;
  children: ReactNode;
}

export function ReactPortal({ containerId, children }: ReactPortalProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}
