import React from 'react'
import AppErrorMessage from '../AppErrorMessage'
import AppTextInput from '../../AppTextInput'
import { AppFormFieldProps, TypeKind } from './types'
import { useFormikContext, FormikProps, FormikValues } from 'formik'
import AppSubmitButton from '../AppSubmitButton'
import AppPicker from '../../AppPicker'
import { StyleSheet } from 'react-native'
import AppImageInput from '../../AppImageInput'

function AppFormField({
  name = '',
  type,
  fieldProps,
  width
}: AppFormFieldProps) {
  const {
    handleChange,
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values
  }: FormikProps<FormikValues> = useFormikContext()
  const styles = StyleSheet.create({
    field: { width }
  })
  switch (type) {
    case TypeKind.TEXT_INPUT:
      return (
        <>
          <AppTextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={handleChange(name)}
            value={values[name]}
            style={styles.field}
            {...fieldProps}
          />
          <AppErrorMessage errorMessage={touched[name] && errors[name]} />
        </>
      )
    case TypeKind.PICKER:
      return (
        <>
          <AppPicker
            onModalClose={() => setFieldTouched(name)}
            onChange={(value: any) => {
              setFieldValue(name, value)
            }}
            selectedItem={values[name]}
            style={styles.field}
            {...fieldProps}
          />
          <AppErrorMessage errorMessage={touched[name] && errors[name]} />
        </>
      )
    case TypeKind.IMAGE_INPUT:
      return (
        <>
          <AppImageInput
            onAddButtonPress={() => setFieldTouched(name)}
            imgageUris={values[name]}
            onChange={(value?: string[]) => {
              setFieldValue(name, value)
            }}
            {...fieldProps}
          />
          <AppErrorMessage errorMessage={touched[name] && errors[name]} />
        </>
      )
    case TypeKind.SUBMIT:
      return <AppSubmitButton style={styles.field} {...fieldProps} />
    default:
      return null
  }
}

export default AppFormField
