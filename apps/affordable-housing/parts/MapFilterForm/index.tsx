/**
 *
 * MapFilterMenu
 *
 */
import * as React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { options } from './demoData';
import { Divider, Item, Select } from '@wprdc/toolkit';

import styles from './MapFilterMenu.module.css';
import { Button } from '@wprdc-components/button';

interface Props {}

interface Option {
  value: string;
  label: string;
}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export function MapFilterForm(props: Props) {
  return (
    <div className={styles.container}>
      {/*  {t(...messages.someThing())}  */}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>,
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <Select<Option>
            id="at-risk-menu"
            name="at-risk"
            label="At-risk-units"
          >
            <Item key="5y">Subsidy expiration within 5 years</Item>
            <Item key="3y">Subsidy expiration within 3 years</Item>
            <Item key="1y">Subsidy expiration within 1 year</Item>
            <Item key="6m">Subsidy expiration within 6 months</Item>
          </Select>

          <Divider />

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
}
