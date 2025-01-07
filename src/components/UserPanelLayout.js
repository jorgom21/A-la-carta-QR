import React, { useContext, useEffect } from 'react'
import { AuthContext } from './Auth'
import { supabase } from '../supabase/cliente'
import HeaderUserPanel from './HeaderUserPanel'
import { Notify } from 'notiflix'

const UserPanelLayout = ({
	children,
	title,
	isMiMenu,
	openModal,
	setActive,
}) => {
	const { currentUser } = useContext(AuthContext)
	const switchInput = document.getElementById('switch')

	useEffect(() => {
		if (isMiMenu) {
			getMenuData()
		}
	}, [isMiMenu])

	const handleCheck = async () => {
		try {
			// Bloquea el interruptor mientras se realiza la operación
			switchInput.disabled = true;
	
			if (switchInput.checked) {
				setActive(true);
	
				// Inserta un nuevo menú en la base de datos
				const newMenu = { idUser: currentUser.user.id };
				const { error } = await supabase.from('menus').insert(newMenu);
	
				if (error) {
					throw error; // Lanza el error para manejarlo más adelante
				}
			} else {
				setActive(false);
	
				// Elimina menús relacionados con el usuario actual
				const { error } = await supabase
					.from('menus')
					.delete()
					.eq('idUser', currentUser.user.id);
	
				if (error) {
					throw error; // Lanza el error para manejarlo más adelante
				}
			}
		} catch (error) {
			// Manejo de errores
			Notify.failure('Algo salió mal.');
			console.error(error);
		} finally {
			// Reactiva el interruptor al final de la operación
			switchInput.disabled = false;
		}
	};
	

	const getMenuData = async () => {
		const switchInput = document.getElementById('switch');
		const menus = [];
		try {
			// Realiza la consulta a la base de datos
			const { data } = await supabase.from('menus').select().eq('idUser', currentUser.user.id);
			
			data.forEach((doc) => {
				menus.push({ ...doc })
			})

		} catch (error) {
			// Notificación de error
			Notify.failure('Algo salió mal con getmenudata.');
		}
	
		// Actualiza la interfaz si se encontraron menús
		if (menus.length) {
			switchInput.checked = true;
			setActive(true);
		} else {
			switchInput.checked = false;
			setActive(false);
		}
	};
	
	

	return (
		<div className="user-panel-container">
			<div className="user-panel">
				<HeaderUserPanel/>
				<div className="user-panel__title">
					<h1 className="user-panel__title--h1">{title}</h1>
					{isMiMenu && (
						<button
							onClick={() => openModal(true)}
							className="user-panel__title--button"
						>
							Añadir comida
							<img
								className="user-panel__title--button-icon"
								src="/img/icons/plus-circle.svg"
								alt="+"
							/>
						</button>
					)}
					{isMiMenu && (
						<div className="switch-container">
							<span className="switch-container__text">Publicar</span>
							<input
								type="checkbox"
								className="user-panel__switch_input"
								id="switch"
								onChange={handleCheck}
							/>
							<label className="user-panel__switch_label" htmlFor="switch">
								Toggle
							</label>
						</div>
					)}
				</div>
				{children}
			</div>
		</div>
	)
}

export default UserPanelLayout
