import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../assets/css/pages/LoginRegister.css'

const LoginRegisterContainer = () => {
	const location = useLocation();
	const path = location.pathname;
	console.log (path) 
	return (
		<div className="login-register">
			<div className="login-register__form">
				<Link to="/">
					<img
						className="login-register__form__logo"
						src="/img/logos/logoalacarta.png"
						alt="Logo"
					/>
				</Link>
				{path === '/register' ? <Register/> : <Login/>}
				
				<div className="login-register__links-question">
					{path === '/login' ? (
						<span>
							¿No tienes cuenta?
							<Link
								className="login-register__form__question__link"
								to="/register"
							>
								<strong> Regístrate</strong>
							</Link>
						</span>
					) : (
						<span>
							¿Ya tienes cuenta?
							<Link
								className="login-register__form__question__link"
								to="/login"
							>
								<strong> Inicia sesión</strong>
							</Link>
						</span>
					)}
					<div className="login-register__form__links">
						<Link className="login-register__form__links--link" to="/">
							Términos y condiciones
						</Link>
						<Link className="login-register__form__links--link" to="/">
							Política de privacidad
						</Link>
						<Link className="login-register__form__links--link" to="/">
							Cookies
						</Link>
						<br />
						<br />
						<span className="login-register__form__links--link">
							© 2025 A la carta QR, Inc.
						</span>
					</div>
				</div>
			</div>
			<div className="login-register__content">
				<span className="login-register__content__title">
					No dejes que tu restaurante se estanque en la era digital
				</span>
				<img
					className="login-register__content__image"
					src="/img/illustrations/login_register.png"
					alt="Ilustración"
				/>
			</div>
		</div>
	)
}

export default LoginRegisterContainer
