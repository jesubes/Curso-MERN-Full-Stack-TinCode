import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { Auth } from '../../../../api'
import { initialValues, validationSchema } from './RegisterForm.form'
import './RegisterForm.scss'

const authController = new Auth();

export const RegisterForm = ( props ) => {
  const { openLogin } = props;
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async( formValue ) =>{ 
      try{
        setError('')
        await authController.register(formValue)
        openLogin(); 
      } catch( error ){
        setError('Error en el sevidor')
      }
    }
  })

  return (
    <div>
      <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
          name='email' 
          placeholder='Correo Electronico' 
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          />
        <Form.Input 
          name='password' 
          type='password' 
          placeholder='Contraseña'
          onChange={formik.handleChange} 
          value={formik.values.password}
          error={formik.errors.password}
          />
        <Form.Input 
          name='repeatPassword' 
          type='repeatPassword' 
          placeholder='Repite Contraseña' 
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
          />
        <Form.Checkbox 
          name='conditionsAccepted' 
          label='He leido y acepto las políticas de privacidad' 
          onChange={(_,data) => formik.setFieldValue("conditionsAccepted", data.checked)}
          checked={formik.values.conditionsAccepted}
          error={formik.errors.conditionsAccepted} 
          />
        <Form.Button type='submit' primary fluid >
          Crear una Cuenta
        </Form.Button>
        
        <p className='register-form__error'>{error}</p>
      </Form>
    </div>
  )
}
