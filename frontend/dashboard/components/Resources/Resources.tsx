import React from 'react';
import { ResourceItem } from '../ResourceItem';
import classes from './Resources.module.css';
import { useTranslation } from 'react-i18next';
import { StudioHeading } from '@studio/components';

interface Resource {
  label: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

const resources: Resource[] = [
  {
    label: 'dashboard.resource_docs_label',
    description: 'dashboard.resource_docs_description',
    url: 'https://docs.altinn.studio',
    icon: (
      <svg
        width='60'
        height='60'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='30' cy='30' r='30' fill='#022F51' />
        <path
          d='M41 44H20V16H41V44ZM21.2353 42.7826H39.7647V17.2174H21.2353V42.7826Z'
          fill='#FFFEFE'
        />
        <path
          d='M24.9412 26.9565H36.0588V28.1739H24.9412V26.9565ZM24.9412 22.0869H31.1176V23.3043H24.9412V22.0869ZM24.9412 31.8261H36.0588V33.0435H24.9412V31.8261ZM24.9412 36.6956H36.0588V37.913H24.9412V36.6956Z'
          fill='#FFFEFE'
        />
      </svg>
    ),
  },
  {
    label: 'dashboard.resource_organisations_label',
    description: 'dashboard.resource_organisations_description',
    url: `${window.location.origin}/repos/explore/organizations`,
    icon: (
      <svg
        width='60'
        height='60'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <ellipse cx='30' cy='29.7794' rx='30' ry='29.7794' fill='#022F51' />
        <path
          d='M18.294 35.875V26.749H16.458V35.875H18.294ZM18.348 24.949V23.005H16.404V24.949H18.348ZM29.2141 35.875L25.6501 30.331L28.8181 26.749H26.5861L23.0401 30.961V23.059H21.2041V35.875H23.0401V33.193L24.3901 31.663L26.9461 35.875H29.2141ZM37.5267 31.303C37.5267 29.773 37.3107 28.621 36.4467 27.721C35.8527 27.109 34.9527 26.641 33.7107 26.641C32.4687 26.641 31.5867 27.109 30.9927 27.721C30.1287 28.621 29.9127 29.773 29.9127 31.303C29.9127 32.851 30.1287 34.003 30.9927 34.903C31.5867 35.515 32.4687 35.983 33.7107 35.983C34.9527 35.983 35.8527 35.515 36.4467 34.903C37.3107 34.003 37.5267 32.851 37.5267 31.303ZM35.6907 31.303C35.6907 32.293 35.6187 33.247 35.0607 33.805C34.7187 34.147 34.2507 34.345 33.7107 34.345C33.1707 34.345 32.7207 34.147 32.3787 33.805C31.8207 33.247 31.7487 32.293 31.7487 31.303C31.7487 30.313 31.8207 29.359 32.3787 28.801C32.7207 28.459 33.1707 28.279 33.7107 28.279C34.2507 28.279 34.7187 28.459 35.0607 28.801C35.6187 29.359 35.6907 30.313 35.6907 31.303ZM47.4107 35.875V30.043C47.4107 29.017 47.1947 28.153 46.4927 27.469C45.9527 26.947 45.1787 26.641 44.2427 26.641C43.3247 26.641 42.4427 26.983 41.8127 27.667V26.749H40.0127V35.875H41.8487V30.313C41.8487 28.909 42.7127 28.279 43.7387 28.279C44.7647 28.279 45.5747 28.891 45.5747 30.313V35.875H47.4107Z'
          fill='#022F51'
        />
        <path
          d='M44 42H42.7273V15.2727H28.7273V42H27.4545V25.4545H17.2727V42H16V24.1818H27.4545V14H44V42Z'
          fill='#FFFEFE'
        />
        <path
          d='M37.6364 19.0909H38.9091V42H37.6364V19.0909ZM32.5455 19.0909H33.8182V42H32.5455V19.0909ZM21.0909 30.5454H24.9091V31.8182H21.0909V30.5454ZM21.0909 35.6363H24.9091V36.9091H21.0909V35.6363ZM21.0909 40.7272H24.9091V42H21.0909V40.7272Z'
          fill='#FFFEFE'
        />
      </svg>
    ),
  },
  {
    label: 'dashboard.resource_contact_label',
    description: 'dashboard.resource_contact_description',
    url: 'https://altinn.studio/contact',
    icon: (
      <svg
        width='60'
        height='60'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
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
      </svg>
    ),
  },
  {
    label: 'dashboard.resource_design_label',
    description: 'dashboard.resource_design_description',
    url: 'https://www.figma.com/file/wnBveAG2ikUspFsQwM3GNE/Prototyping-av-skjematjenester?node-id=47%3A4068',
    icon: (
      <svg
        width='60'
        height='60'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='30' cy='30' r='30' fill='#022F51' />
        <path
          d='M18.294 36V26.874H16.458V36H18.294ZM18.348 25.074V23.13H16.404V25.074H18.348ZM29.2141 36L25.6501 30.456L28.8181 26.874H26.5861L23.0401 31.086V23.184H21.2041V36H23.0401V33.318L24.3901 31.788L26.9461 36H29.2141ZM37.5267 31.428C37.5267 29.898 37.3107 28.746 36.4467 27.846C35.8527 27.234 34.9527 26.766 33.7107 26.766C32.4687 26.766 31.5867 27.234 30.9927 27.846C30.1287 28.746 29.9127 29.898 29.9127 31.428C29.9127 32.976 30.1287 34.128 30.9927 35.028C31.5867 35.64 32.4687 36.108 33.7107 36.108C34.9527 36.108 35.8527 35.64 36.4467 35.028C37.3107 34.128 37.5267 32.976 37.5267 31.428ZM35.6907 31.428C35.6907 32.418 35.6187 33.372 35.0607 33.93C34.7187 34.272 34.2507 34.47 33.7107 34.47C33.1707 34.47 32.7207 34.272 32.3787 33.93C31.8207 33.372 31.7487 32.418 31.7487 31.428C31.7487 30.438 31.8207 29.484 32.3787 28.926C32.7207 28.584 33.1707 28.404 33.7107 28.404C34.2507 28.404 34.7187 28.584 35.0607 28.926C35.6187 29.484 35.6907 30.438 35.6907 31.428ZM47.4107 36V30.168C47.4107 29.142 47.1947 28.278 46.4927 27.594C45.9527 27.072 45.1787 26.766 44.2427 26.766C43.3247 26.766 42.4427 27.108 41.8127 27.792V26.874H40.0127V36H41.8487V30.438C41.8487 29.034 42.7127 28.404 43.7387 28.404C44.7647 28.404 45.5747 29.016 45.5747 30.438V36H47.4107Z'
          fill='#022F51'
        />
        <path
          d='M24.9333 45.0001C27.6564 45.0001 29.8665 42.7601 29.8665 40V35H24.9333C22.2101 35 20 37.24 20 40C20 42.7601 22.2101 45.0001 24.9333 45.0001Z'
          fill='#0ACF83'
        />
        <path
          d='M20 30C20 27.24 22.2101 25 24.9333 25H29.8665V35.0001H24.9333C22.2101 35.0001 20 32.7601 20 30Z'
          fill='#A259FF'
        />
        <path
          d='M20 20C20 17.24 22.2101 15 24.9333 15H29.8665V25.0001H24.9333C22.2101 25.0001 20 22.7601 20 20Z'
          fill='#F24E1E'
        />
        <path
          d='M29.8667 15H34.8C37.5231 15 39.7332 17.24 39.7332 20C39.7332 22.7601 37.5231 25.0001 34.8 25.0001H29.8667V15Z'
          fill='#FF7262'
        />
        <path
          d='M39.7332 30C39.7332 32.7601 37.5231 35.0001 34.8 35.0001C32.0768 35.0001 29.8667 32.7601 29.8667 30C29.8667 27.24 32.0768 25 34.8 25C37.5231 25 39.7332 27.24 39.7332 30Z'
          fill='#1ABCFE'
        />
      </svg>
    ),
  },
  {
    label: 'dashboard.resource_roadmap_label',
    description: 'dashboard.resource_roadmap_description',
    url: 'https://docs.altinn.studio/nb/community/roadmap/',
    icon: (
      <svg
        width='60'
        height='60'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='30' cy='30' r='30' fill='#022F51' />
        <path
          d='M24.9692 31.011H26.2V44.5588H24.9692V31.011ZM24.9692 15H26.2V19.9265H24.9692V15ZM39.2462 31.011H15V21.1581H39.1231L47 26.0845L39.2462 31.011V31.011ZM16.2308 29.7794H38.8769L44.6615 26.0845L38.7538 22.3897H16.2308V29.7794Z'
          fill='white'
        />
      </svg>
    ),
  },
  {
    label: 'dashboard.resource_status_label',
    description: 'dashboard.resource_status_description',
    url: 'https://status.digdir.no/',
    icon: (
      <svg
        width='60'
        height='60'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <ellipse cx='30' cy='29.7794' rx='30' ry='29.7794' fill='#022F51' />
        <path
          d='M18.294 35.875V26.749H16.458V35.875H18.294ZM18.348 24.949V23.005H16.404V24.949H18.348ZM29.2141 35.875L25.6501 30.331L28.8181 26.749H26.5861L23.0401 30.961V23.059H21.2041V35.875H23.0401V33.193L24.3901 31.663L26.9461 35.875H29.2141ZM37.5267 31.303C37.5267 29.773 37.3107 28.621 36.4467 27.721C35.8527 27.109 34.9527 26.641 33.7107 26.641C32.4687 26.641 31.5867 27.109 30.9927 27.721C30.1287 28.621 29.9127 29.773 29.9127 31.303C29.9127 32.851 30.1287 34.003 30.9927 34.903C31.5867 35.515 32.4687 35.983 33.7107 35.983C34.9527 35.983 35.8527 35.515 36.4467 34.903C37.3107 34.003 37.5267 32.851 37.5267 31.303ZM35.6907 31.303C35.6907 32.293 35.6187 33.247 35.0607 33.805C34.7187 34.147 34.2507 34.345 33.7107 34.345C33.1707 34.345 32.7207 34.147 32.3787 33.805C31.8207 33.247 31.7487 32.293 31.7487 31.303C31.7487 30.313 31.8207 29.359 32.3787 28.801C32.7207 28.459 33.1707 28.279 33.7107 28.279C34.2507 28.279 34.7187 28.459 35.0607 28.801C35.6187 29.359 35.6907 30.313 35.6907 31.303ZM47.4107 35.875V30.043C47.4107 29.017 47.1947 28.153 46.4927 27.469C45.9527 26.947 45.1787 26.641 44.2427 26.641C43.3247 26.641 42.4427 26.983 41.8127 27.667V26.749H40.0127V35.875H41.8487V30.313C41.8487 28.909 42.7127 28.279 43.7387 28.279C44.7647 28.279 45.5747 28.891 45.5747 30.313V35.875H47.4107Z'
          fill='#022F51'
        />
        <path
          d='M28.3501 36.7166C30.9167 35.7833 33.6001 34.2666 35.8167 31.9333C40.1334 27.6166 42.0001 22.1333 41.1834 17.6999C36.7501 16.8833 31.2667 18.7499 26.9501 23.0666C24.6167 25.3999 23.1001 27.9666 22.1667 30.5333L28.3501 36.7166Z'
          stroke='white'
          strokeMiterlimit='10'
        />
        <path d='M18.9 33.8L15.6333 37.1834' stroke='white' strokeMiterlimit='10' />
        <path d='M22.1668 37.1833L17.2668 42.0834' stroke='white' strokeMiterlimit='10' />
        <path d='M25.4334 40.45L22.1667 43.7166' stroke='white' strokeMiterlimit='10' />
        <path
          d='M28.0002 22.1332C24.8502 21.8999 21.5835 22.9499 19.0168 25.1666L22.7502 28.8999'
          stroke='white'
          strokeMiterlimit='10'
        />
        <path
          d='M29.9835 36.25L33.7169 39.9833C35.9335 37.4166 36.9835 34.15 36.7502 30.8833'
          stroke='white'
          strokeMiterlimit='10'
        />
        <path d='M30.4501 20.3833L38.5001 28.4333' stroke='white' strokeMiterlimit='10' />
      </svg>
    ),
  },
];

export function Resources() {
  const { t } = useTranslation();
  return (
    <div className={classes.wrapper}>
      <StudioHeading level={2} size='sm' className={classes.header}>
        {t('dashboard.resources')}
      </StudioHeading>
      <div className={classes.resourcesContainer}>
        {resources.map((resource, index) => (
          <ResourceItem
            key={`resource-item-${index}`}
            label={resource.label}
            description={resource.description}
            link={resource.url}
            icon={resource.icon}
          />
        ))}
      </div>
    </div>
  );
}
