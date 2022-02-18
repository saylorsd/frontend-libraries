/**
 *
 * MapFilterMenu
 *
 */
import * as React from 'react';
import { Form, Formik, FormikHelpers, Field, FieldProps } from 'formik';
import { Item, Select } from '@wprdc/toolkit';

import styles from './MapFilterMenu.module.css';
import { Button } from '@wprdc-components/button';

interface Option {
  value: string;
  label: string;
}

interface Values {
  'at-risk': string;
}

export function MapFilterForm() {
  function handleSubmit() {}

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          'at-risk': '3y',
        }}
        validateOnBlur
        onSubmit={(x) => console.log(x)}
      >
        <Form>
          <div className={styles.field}>
            <Field name="at-risk">
              {({
                field, // { name, value, onChange, onBlur }
                meta,
              }: FieldProps) => {
                return (
                  <Select
                    id="at-risk"
                    label="At risk units"
                    name={field.name}
                    onBlur={field.onBlur}
                    selectedKey={field.value}
                    onSelection={(x) => {
                      field.onChange({
                        target: { value: x, name: field.name },
                      });
                    }}
                    errorMessage={meta.touched && meta.error}
                  >
                    <Item key="future">Subsidy expiration 5+ years away</Item>
                    <Item key="5y">Subsidy expiration within 5 years</Item>
                    <Item key="3y">Subsidy expiration within 3 years</Item>
                    <Item key="1y">Subsidy expiration within 1 year</Item>
                    <Item key="6m">Subsidy expiration within 6 months</Item>
                  </Select>
                );
              }}
            </Field>
          </div>
          <div className={styles.buttonSection}>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
