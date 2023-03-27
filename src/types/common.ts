import React from 'react';

export type TMenuItem = {
  id: string;
  label: string;
  url: string;
  urlMatch: string;
};

export type TSocialItem = {
  id: string;
  link: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};
