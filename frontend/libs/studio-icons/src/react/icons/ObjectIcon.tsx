import React from 'react';
import { SvgTemplate } from './SvgTemplate';
import type { IconProps } from '../types';

export const ObjectIcon = (props: IconProps): React.ReactElement => (
  <SvgTemplate viewBox='0 0 36 36' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='
        M 13.0604 10.5
        C 12.7791 10.5 12.5093 10.6117 12.3104 10.8107
        C 12.1115 11.0096 11.9997 11.2794 11.9997 11.5607
        V 12.6897
        C 11.9997 14.7992 11.025 16.7377 9.43968 18
        C 11.025 19.2623 11.9997 21.2008 11.9997 23.3103
        V 24.4393
        C 11.9997 24.7206 12.1115 24.9904 12.3104 25.1893
        C 12.5093 25.3883 12.7791 25.5 13.0604 25.5
        H 13.4997
        V 28.5
        H 13.0604
        C 11.9834 28.5 10.9506 28.0722 10.1891 27.3107
        C 9.42755 26.5491 8.99973 25.5163 8.99973 24.4393
        V 23.3103
        C 8.99973 21.6805 7.95682 20.2335 6.41065 19.7181
        L 5.52539 19.423
        L 5.52539 16.577
        L 6.41065 16.2819
        C 7.95682 15.7665 8.99973 14.3195 8.99973 12.6897
        V 11.5607
        C 8.99973 10.4837 9.42755 9.45086 10.1891 8.68934
        C 10.9506 7.92782 11.9834 7.5 13.0604 7.5
        H 13.4997
        V 10.5
        Z
      '
      fill='currentColor'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='
        M 22.9396 25.5
        C 23.2209 25.5 23.4907 25.3883 23.6896 25.1893
        C 23.8885 24.9904 24.0003 24.7206 24.0003 24.4393
        V 23.3103
        C 24.0003 21.2008 24.975 19.2623 26.5603 18
        C 24.975 16.7377 24.0003 14.7992 24.0003 12.6897
        L 24.0003 11.5607
        C 24.0003 11.2794 23.8885 11.0096 23.6896 10.8107
        C 23.4907 10.6117 23.2209 10.5 22.9396 10.5
        H 22.5003
        V 7.5
        H 22.9396
        C 24.0166 7.5 25.0494 7.92782 25.8109 8.68934
        C 26.5725 9.45086 27.0003 10.4837 27.0003 11.5607
        V 12.6897
        C 27.0003 14.3195 28.0432 15.7665 29.5894 16.2819
        L 30.4746 16.577
        V 19.423
        L 29.5894 19.7181
        C 28.0432 20.2335 27.0003 21.6805 27.0003 23.3103
        V 24.4393
        C 27.0003 25.5163 26.5725 26.5491 25.8109 27.3107
        C 25.0494 28.0722 24.0166 28.5 22.9396 28.5
        H 22.5003
        V 25.5
        Z
      '
      fill='currentColor'
    />
  </SvgTemplate>
);
