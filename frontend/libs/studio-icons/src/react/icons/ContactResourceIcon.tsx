import React from 'react';
import type { IconProps } from '../types';
import { SvgTemplate } from './SvgTemplate';

export const ContactResourceIcon = (props: IconProps): React.ReactElement => {
  return (
    <SvgTemplate viewBox='0 0 60 60' {...props}>
      <circle cx='30' cy='30' r='30' fill='#022F51' />
      <path
        d='M21.303 33.9574C21.303 35.6919 19.886 37.1089 18.1515 37.1089C16.4169 37.1089 15 35.6919 15 33.9574C15 32.2229 16.4169 30.8059 18.1515 30.8059H21.303V33.9574Z'
        fill='#E01E5A'
      />
      <path
        d='M22.8909 33.9574C22.8909 32.2229 24.3078 30.8059 26.0424 30.8059C27.7769 30.8059 29.1938 32.2229 29.1938 33.9574V41.8483C29.1938 43.5829 27.7769 44.9998 26.0424 44.9998C24.3078 44.9998 22.8909 43.5829 22.8909 41.8483V33.9574Z'
        fill='#E01E5A'
      />
      <path
        d='M26.0424 21.303C24.3078 21.303 22.8909 19.886 22.8909 18.1515C22.8909 16.4169 24.3078 15 26.0424 15C27.7769 15 29.1938 16.4169 29.1938 18.1515V21.303H26.0424Z'
        fill='#36C5F0'
      />
      <path
        d='M26.0424 22.8906C27.777 22.8906 29.1939 24.3076 29.1939 26.0421C29.1939 27.7767 27.777 29.1936 26.0424 29.1936H18.1515C16.4169 29.1936 15 27.7767 15 26.0421C15 24.3076 16.4169 22.8906 18.1515 22.8906H26.0424Z'
        fill='#36C5F0'
      />
      <path
        d='M38.6973 26.0421C38.6973 24.3076 40.1142 22.8906 41.8488 22.8906C43.5833 22.8906 45.0002 24.3076 45.0002 26.0421C45.0002 27.7767 43.5833 29.1936 41.8488 29.1936H38.6973V26.0421Z'
        fill='#2EB67D'
      />
      <path
        d='M37.1094 26.0424C37.1094 27.777 35.6924 29.1939 33.9579 29.1939C32.2233 29.1939 30.8064 27.777 30.8064 26.0424V18.1515C30.8064 16.4169 32.2233 15 33.9579 15C35.6924 15 37.1094 16.4169 37.1094 18.1515V26.0424Z'
        fill='#2EB67D'
      />
      <path
        d='M33.9579 38.6973C35.6924 38.6973 37.1094 40.1142 37.1094 41.8488C37.1094 43.5833 35.6924 45.0002 33.9579 45.0002C32.2233 45.0002 30.8064 43.5833 30.8064 41.8488V38.6973H33.9579Z'
        fill='#ECB22E'
      />
      <path
        d='M33.9579 37.1094C32.2233 37.1094 30.8064 35.6924 30.8064 33.9579C30.8064 32.2233 32.2233 30.8064 33.9579 30.8064H41.8488C43.5834 30.8064 45.0003 32.2233 45.0003 33.9579C45.0003 35.6924 43.5834 37.1094 41.8488 37.1094H33.9579Z'
        fill='#ECB22E'
      />
    </SvgTemplate>
  );
};
