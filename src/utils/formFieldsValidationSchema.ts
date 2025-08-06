import * as Yup from 'yup'

type fieldsTypes =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'password'
  | 'cpassword'
  | 'loginPassword'
  | 'phone'

export const formFieldsValidationSchema = ({
  fields,
}: {
  fields: fieldsTypes[]
}) => {
  // Messages
  const mandatoryFieldMessage = 'Required field.'
  const emailInvalidMessage = 'Invalid email address.'
  const passwordMismatchMessage = 'Passwords do not match.'
  const passwordInvalidMessage =
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  const phoneInvalidMessage =
    "Please enter a valid phone number, starting with a '+' and followed by 10-15 digits. No spaces or special characters allowed."

  // Regex
  // const passwordRegExp =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\?+\-=_\/])(?=.{8,})/
  const phoneRegExp = /^\+[1-9]\d{1,14}$|^$/

  // Fields
  const schemaFields: {
    [key in fieldsTypes]: Yup.StringSchema<string | undefined | null>
  } = {
    first_name: Yup.string().required(mandatoryFieldMessage),
    last_name: Yup.string().required(mandatoryFieldMessage),
    email: Yup.string()
      .required(mandatoryFieldMessage)
      .email(emailInvalidMessage),
    password: Yup.string()
      .required(mandatoryFieldMessage)
      .matches(passwordRegExp, passwordInvalidMessage),
    cpassword: Yup.string()
      .required(mandatoryFieldMessage)
      .oneOf([Yup.ref('password')], passwordMismatchMessage),
    loginPassword: Yup.string().required(mandatoryFieldMessage),
    phone: Yup.string().nullable().matches(phoneRegExp, phoneInvalidMessage),
  }

  return Yup.object().shape({
    ...fields.reduce(
      (acc: { [key in fieldsTypes]?: Yup.StringSchema }, field) => {
        ;(acc[field] as any) = schemaFields[field]
        return acc
      },
      {},
    ),
  })
}
