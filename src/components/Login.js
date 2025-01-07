import React, { useEffect, useState, useContext } from 'react'
import Loader from '../components/Loader'
import {supabase} from '../supabase/cliente'
import { AuthContext } from './Auth'
import { useNavigate } from 'react-router-dom'


const Login = () => {
	const { currentUser } = useContext(AuthContext)
	const [form, setValues] = useState({})
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()  

	useEffect(() => {
		document.title = 'Delimenú - Inicio de sesión'
	}, [])

	const handleInput = (event) => {
		setValues({
			...form,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = async (e) =>  {
		e.preventDefault(); // Evita el comportamiento por defecto de recargar la página
		setLoading(true)
		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = true))

		const { data, error } = await supabase.auth.signInWithPassword(
				form
			  )
		
		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = false))
		setLoading(false)
	}

	if (currentUser) {
		navigate ("/")
		console.log(currentUser)
	}



	return (
		<div className="login-register-container__grid">
			<h1>Iniciar Sesión</h1>
			<form onSubmit={handleSubmit} className="login-grid">
				<label className="login-register-form__label">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/mail.svg"
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
				<label className="login-register-form__label">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/padlock.svg"
						alt="User"
					/>
					<input
						name="password"
						placeholder="Contraseña"
						className="login-register-form__input"
						type="password"
						required
						onChange={handleInput}
					/>
				</label>
				<input
					className="login-register-form__button"
					type="submit"
					value="Iniciar Sesión"
				/>
			</form>
			
			{loading && <Loader />}
			
		</div>
	)
}

export default Login
