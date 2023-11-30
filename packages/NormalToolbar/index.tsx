import React, { MouseEvent, ReactElement } from 'react';
import { prefix } from '~/config';

export interface NormalToolbarProps {
  title?: string;
  trigger: string | ReactElement;
  onClick: (e: MouseEvent) => void;
}

const NormalToolbar = (props: NormalToolbarProps) => {
  // 这就是一个ReactElement
  const element = <div className="my-class">Hello, World!</div>;
  return (
    <div className={`${prefix}-toolbar-item`} title={props.title} onClick={props.onClick}>
      {props.trigger}
    </div>
  );
};

export default NormalToolbar;
