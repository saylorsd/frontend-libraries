import * as React from 'react';
import { BreadcrumbItem, Breadcrumbs } from './';
import { Story } from '@storybook/react';

import { BreadcrumbsProps } from '@wprdc-types/breadcrumbs';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
};

const Template: Story<BreadcrumbsProps<string>> = args => (
  <Breadcrumbs {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  showCurrent: true,
  bigTitle: true,
  children: [
    <BreadcrumbItem href={'#'}>Test</BreadcrumbItem>,
    <BreadcrumbItem href={'#'}>Thingamabob</BreadcrumbItem>,
    <BreadcrumbItem href={'#'}>Another one</BreadcrumbItem>,
  ],
};
export const Secondary = Template.bind({});
Secondary.args = {
  showCurrent: false,
  children: [
    <BreadcrumbItem href={'#'}>Test</BreadcrumbItem>,
    <BreadcrumbItem href={'#'}>Another one</BreadcrumbItem>,
  ],
};
