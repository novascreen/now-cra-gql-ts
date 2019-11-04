import React from 'react';

type Props = {
  content?: string;
};

const HTML = ({ content = '' }: Props) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

export default HTML;
