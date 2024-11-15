import { Spin } from 'antd';
import React from 'react';
import s from './Loader.module.scss';

export const Loader = () => (
  <div className={s.loaderContainer}>
    <Spin tip="Loading" size="large"></Spin>
  </div>
);
