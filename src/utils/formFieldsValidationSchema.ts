import * as Yup from "yup";

type fieldsTypes =
  | "first_name"
  | "last_name"
  | "first_last_name"
  | "message"
  | "email"
  | "password"
  | "cpassword"
  | "loginPassword"
  | "phone"
  | "terms_agree";

export const formFieldsValidationSchema = ({
  fields,
  lang,
}: {
  fields: fieldsTypes[];
  lang: "en" | "pt";
}) => {
  // Messages
  const mandatoryFieldMessage =
    lang == "en" ? "Required field." : "Campo obrigatório.";
  const emailInvalidMessage =
    lang == "en" ? "Invalid email address." : "Email inválido.";
  const passwordMismatchMessage =
    lang == "en" ? "Passwords do not match." : "As passwords não coincidem.";
  const passwordInvalidMessage =
    lang == "en"
      ? "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      : "Deve conter 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial";
  const phoneInvalidMessage =
    lang == "en"
      ? "Please enter a valid phone number, starting with a '+' and followed by 10-15 digits. No spaces or special characters allowed."
      : "Por favor insira um número de telefone válido, começando com '+' e seguido de 10-15 dígitos. Não são permitidos espaços ou caracteres especiais.";

  // Regex
  // const passwordRegExp =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\?+\-=_\/])(?=.{8,})/;
  const phoneRegExp = /^\+[1-9]\d{1,14}$|^$/;

  // Fields
  const schemaFields: {
    [key in fieldsTypes]:
      | Yup.StringSchema<string | undefined | null>
      | Yup.BooleanSchema<boolean | undefined | null>;
  } = {
    first_name: Yup.string().required(mandatoryFieldMessage),
    last_name: Yup.string().required(mandatoryFieldMessage),
    message: Yup.string().required(mandatoryFieldMessage),
    first_last_name: Yup.string().required(mandatoryFieldMessage),
    email: Yup.string()
      .required(mandatoryFieldMessage)
      .email(emailInvalidMessage),
    password: Yup.string()
      .required(mandatoryFieldMessage)
      .matches(passwordRegExp, passwordInvalidMessage),
    cpassword: Yup.string()
      .required(mandatoryFieldMessage)
      .oneOf([Yup.ref("password")], passwordMismatchMessage),
    loginPassword: Yup.string().required(mandatoryFieldMessage),
    phone: Yup.string().matches(phoneRegExp, phoneInvalidMessage),
    terms_agree: Yup.boolean()
      .required(mandatoryFieldMessage)
      .oneOf([true], mandatoryFieldMessage),
  };

  return Yup.object().shape({
    ...fields.reduce(
      (acc: { [key in fieldsTypes]?: Yup.StringSchema }, field) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc[field] as any) = schemaFields[field];
        return acc;
      },
      {}
    ),
  });
};
