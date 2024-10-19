import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './BlurredBackgroundWrapper.module.scss';

type BlurredBackgroundComponentProps = {
  children: ReactNode;
  blurDataUrl?: string;
  className?: string;
};

export const BlurredBackgroundComponent: React.FC<
  BlurredBackgroundComponentProps
> = ({ children, className, blurDataUrl }) => {
  return (
    <div className={classNames(styles.centeredContainer, className)}>
      {blurDataUrl && (
        <img
          src={blurDataUrl}
          alt="Blurred Background"
          className={styles.blurredBackground}
        />
      )}
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};
