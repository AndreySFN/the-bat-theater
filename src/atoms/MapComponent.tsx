import React from 'react';

export interface IMapComponentProps {
  className?: string;
  mapUrl: string;
}

export const MapComponent: React.FC<IMapComponentProps> = ({
  className,
  mapUrl,
}) => {
  return (
    <div className={className}>
      <iframe
        src={mapUrl}
        width="100%"
        height="400"
        allowFullScreen
        style={{ position: 'relative' }}
      ></iframe>
    </div>
  );
};
