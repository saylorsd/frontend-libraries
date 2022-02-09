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
            items={options.atRisk}
            name="at-risk"
            label="At-risk-units"
          >
            {(item) => <Item key={item.value}>{item.label}</Item>}
          </Select>

          <Divider />

          <fieldset className={styles.fieldSet}>
            <legend className={styles.legend}>
              Total Subsidized units in Building
            </legend>
            <div className={styles.fieldRow}>
              <div className={styles.fieldCol}>
                <label htmlFor="sub-unit-count-min" className={styles.label}>
                  Between
                </label>
                <Field
                  className={styles.numberField}
                  id="sub-unit-count-min"
                  name="sub-unit-count-min"
                  type="number"
                />
              </div>

              <div className={styles.fieldCol}>
                <label htmlFor="sub-unit-count-max" className={styles.label}>
                  and
                </label>
                <Field
                  className={styles.numberField}
                  id="sub-unit-count-max"
                  name="sub-unit-count-max"
                  type="number"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={styles.fieldSet}>
            <legend className={styles.legend}>
              Percent Subsidized units in Building
            </legend>
            <div className={styles.fieldRow}>
              <div className={styles.fieldCol}>
                <label htmlFor="sub-unit-percent-min" className={styles.label}>
                  Between
                </label>
                <Field
                  className={styles.numberField}
                  id="sub-unit-percent-min"
                  name="sub-unit-percent-min"
                  type="number"
                />
              </div>

              <div className={styles.fieldCol}>
                <label htmlFor="sub-unit-percent-max" className={styles.label}>
                  and
                </label>
                <Field
                  className={styles.numberField}
                  id="sub-unit-percent-max"
                  name="sub-unit-percent-max"
                  type="number"
                />
              </div>
            </div>
          </fieldset>

          <Divider />

          <Select<Option>
            id="unit-ami"
            items={options.ami}
            name="unit-ami"
            label="At-risk units"
          >
            {(item) => <Item key={item.value}>{item.label}</Item>}
          </Select>

          <Select<Option>
            id="funding-source"
            items={options.fundingSource}
            name="funding-source"
            label="Funding Source"
          >
            {(item) => <Item key={item.value}>{item.label}</Item>}
          </Select>

          <Divider />

          <Select<Option>
            id="target-population"
            items={options.targetPop}
            name="target-population"
            label="Target Population"
          >
            {(item) => <Item key={item.value}>{item.label}</Item>}
          </Select>

          <Select<Option>
            id="development-type"
            items={options.devType}
            name="development-type"
            label="Development Type"
          >
            {(item) => <Item key={item.value}>{item.label}</Item>}
          </Select>

          <Divider />

          <fieldset>
            <legend>Subsidy Start Date</legend>
            <label htmlFor="sub-start-date-min">Between</label>
            <Field
              id="sub-start-date-min"
              name="sub-start-date-min"
              type="date"
            />

            <label htmlFor="sub-start-date-max">and </label>
            <Field
              id="sub-start-date-max"
              name="sub-start-date-max"
              type="date"
            />
          </fieldset>

          <fieldset>
            <legend>Subsidy End Date</legend>
            <label htmlFor="sub-end-date-min">Between</label>
            <Field id="sub-end-date-min" name="sub-end-date-min" type="date" />

            <label htmlFor="sub-end-date-max">and </label>
            <Field id="sub-end-date-max" name="sub-end-date-max" type="date" />
          </fieldset>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
