import * as Yup from 'yup'
import { Login, UserValidation } from '../UserValidation'
import { ApiError } from '../../../../presentation/helpers'
import { HTTP_CODE } from '../../../../constants/constants'

export class YupUserValidation implements UserValidation {
    async LoginValidation(login: Login) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail é obrigatório').email('Informe um e-mail válido'),
                password: Yup.string().required('Informe a senha'),
            })

            return await schema.validate(login, { abortEarly: false, stripUnknown: true });
        } catch (error) {
            const err = []

            error.inner.forEach((field) => {
                err.push({
                    field: field.path,
                    errors: field.errors
                })
            })

            throw new ApiError(
                'Verifique os campos de entrada',
                HTTP_CODE.BAD_REQUEST,
                err
            )
        }
    }

}
