import * as yup from 'yup'

export const contactSchema = yup.object({
  name: yup.string().required('Nome é obrigatório').max(50),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  phone: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(/^\d{10,11}$/, {
      message: 'Telefone deve conter apenas números (10 ou 11 dígitos)',
      excludeEmptyString: true,
    }),
  cellphone: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(/^\d{10,11}$/, {
      message: 'Celular deve conter apenas números (10 ou 11 dígitos)',
      excludeEmptyString: true,
    }),
  address: yup.object({
    street: yup.string().nullable().max(255),
    city: yup.string().nullable().max(255),
    state: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .oneOf(
        [
          'AC',
          'AL',
          'AP',
          'AM',
          'BA',
          'CE',
          'DF',
          'ES',
          'GO',
          'MA',
          'MT',
          'MS',
          'MG',
          'PA',
          'PB',
          'PR',
          'PE',
          'PI',
          'RJ',
          'RN',
          'RS',
          'RO',
          'RR',
          'SC',
          'SP',
          'SE',
          'TO',
        ],
        'Estado inválido',
      ),
  }),
})
