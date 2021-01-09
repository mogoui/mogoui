import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 mogoui 组件库</h1>
        <p>mogoui 仿ant 打造属于自己轻量级UI库</p>
        <h3>安装试试</h3>
        <code>npm install mogox-ui --save</code>
      </>
    );
  },
  { info: { disable: true } }
);
