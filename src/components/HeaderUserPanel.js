import React from 'react'
import { supabase } from '../supabase/cliente'
import { NavLink, Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../assets/css/pages/UserPanel.css'

const HeaderUserPanel = ({ currentUser }) => {
	const navigate = useNavigate()  

	const signOut = async (e) =>{
        const { error } = await supabase.auth.signOut()
		navigate("/")
	}
	return (
		<header className="user-panel__header">
			<Link className="user-panel__header__logo" to="/">
				<img
					className="user-panel__header__logo--img"
					src="/img/logos/logoalacartablack.png"
					alt="Logo"
				/>
			</Link>
			<ul className="user-panel__header__list">
				<li>
					<NavLink
						activeClassName="header-active-link"
						className="user-panel__header__link"
						to="/mi-menu"
					>
						Mi menú
					</NavLink>
				</li>
				<li>
					<NavLink
						activeClassName="header-active-link"
						className="user-panel__header__link"
						to="/mis-pedidos"
					>
						Pedidos
					</NavLink>
				</li>
				<li>
					<NavLink
						activeClassName="header-active-link"
						className="user-panel__header__link"
						to="/miperfil"
					>
						Mi Perfil
					</NavLink>
				</li>
			</ul>
			<div className="user-panel__profile">
				<img
					className="user-panel__profile__image"
					src={'/img/profile.png'}
					alt="Foto de perfil"
				/>
				<div className="user-panel__profile__text__container">
					<span className="user-panel__profile__text">
						
					</span>
					<span onClick={signOut} className="user-panel__profile__logout">
						Cerrar sesión
					</span>
				</div>
			</div>
		</header>
	)
}

export default HeaderUserPanel
