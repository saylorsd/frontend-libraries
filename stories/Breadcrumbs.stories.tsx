import * as React from 'react';
import { Story } from '@storybook/react';

import {
  BreadcrumbItem,
  Breadcrumbs,
} from '../packages/@wprdc-components/breadcrumbs';
import { BreadcrumbsProps } from '../packages/@wprdc-types/breadcrumbs';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
};

const Template: Story<BreadcrumbsProps<string>> = (args) => (
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
