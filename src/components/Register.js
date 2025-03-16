import React, { useEffect, useState, useContext } from 'react'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Auth'
import { supabase } from '../supabase/cliente'
import { Report } from 'notiflix'

const Register = () => {
	const {currentUser} = useContext(AuthContext)
	const navigate = useNavigate()
	const [form, setValues] = useState({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		document.title = 'A la carta QR - Registro'
	}, [])

	const addUser = async(e)=>{
		e.preventDefault();
		const { error } = await supabase
		.from('users')
		.insert({ name: '' ,
			 phone: ''
			 })
	  
	}

	const handleInput = (event) => {
		setValues({
			...form,
			[event.target.name]: event.target.value, 
		})
		console.log(form)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = true))
		try {
			const { data, error } = await supabase.auth.signUp(
			form
		)

			Report.success(
				'Registrado con exito',
				'Ahora puede empezar a usar de nuestros servicios',
				'aceptar',
				);

		} catch (error) {
			Report.failure('Error al hacer el registro',
				'Espera un momento e intentalo de nuevo',
				'Aceptar',
			);
		}
		

		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = false))
		setLoading(false)
	}

	if (currentUser) {
		navigate ("/")
	}

	return (
		<div className="login-register-container__grid">
			<h1>Registrarse</h1>
			<form onSubmit={handleSubmit} className="regirter-grid">
				
				<label className="login-register-form__label regirter-grid--division">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/sobre.svg"
						alt="User"
					/>
					<input
						name="email"
						placeholder="Correo"
						className="login-register-form__input"
						type="email"
						required
						onChange={handleInput}
					/>
				</label>
				<label className="login-register-form__label register-grid__correccion-icon">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/cerrar.svg"
						alt="User"
					/>
					<input
						name="password"
						placeholder="Contraseña"
						className="login-register-form__input"
						type="password"
						required
						minLength="8"
						onChange={handleInput}
					/>
				</label>
				<label className='login-register-form__label regirter-grid--division'>
					<img
						className="login-register-form__label__icon"
						src="/img/icons/usuario.svg"
						alt="User"
					/>
					<input
					 type="text" 
					 className="login-register-form__input" 
					 placeholder='Nombre del establecimiento'
					 name="name" 
					 required
					 onChange={handleInput}
					 />
				</label>
				<label className='login-register-form__label regirter-grid--division'>
					<img
						className="login-register-form__label__icon"
						src="/img/icons/llamada-telefonica.svg"
						alt="User"
					/>
					<input
					 type="number" 
					 className="login-register-form__input"  
					 placeholder='Telefono'
					 name="phone" 
					 required
					 onChange={handleInput}
					 />
				</label>
				
				<input
					className="login-register-form__button regirter-grid--division"
					type="submit"
					value="Registrarse"
				/>
			</form>
			
			{loading && <Loader />}
			
		</div>
	)
}

export default Register
