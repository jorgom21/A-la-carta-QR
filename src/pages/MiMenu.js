import React, { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import UserPanelLayout from '../components/UserPanelLayout'
import { AuthContext } from '../components/Auth'
import { supabase } from '../supabase/cliente'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import { Notify } from 'notiflix'
import '../assets/css/pages/UserPanel.css'
import '../assets/css/components/MiMenu.css'


const MiMenu = () => {
	const InitialStateInputValues = {
		nombre: '',
		precio: null,
		descripcion: '',
	}
	const { currentUser } = useContext(AuthContext)
	const [openModal, setOpenModal] = useState(false)
	const [NewFood, setNewFood] = useState(InitialStateInputValues)
	const [foods, setfoods] = useState([])
	const [active, setActive] = useState(false)
	const [temporalFoodEdit, setTemporalFoodEdit] = useState()
	const [temporalFoodRemove, setTemporalFoodRemove] = useState('')
	const [ModalDelete, setModalDelete] = useState(false)
	const [loaders, setLoaders] = useState({
		foodsLoader: true,
	})

	useEffect(() => {
		document.title = 'A la carta QR - Mi menú'
		getfoods()
	}, [])

	const handleInput = (event) => {
		setNewFood({
			...NewFood,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		document
			.querySelectorAll('.newfoodForm')
			.forEach((input) => (input.disabled = true))

			if (temporalFoodEdit) {
				await confirmEditFood()
			} else {
				await addfood()
			}

		document
			.querySelectorAll('.newfoodForm')
			.forEach((input) => (input.disabled = false))
		setOpenModal(false)
	}

	const onEditFood = async (id) => {
		setTemporalFoodEdit(id) 
		try {
			const {data} = await supabase.from('foods').select().eq('id', id).single()
			if (data){
				setNewFood(data)
				setOpenModal(true)
			} else{
				Notify.failure('No se encontraron datos para este alimento.');
			}
			
		} catch (error) {
			Notify.failure('Algo salió mal. Por favor inténtalo de nuevo.')
		}
	}
	const onDeleteFood = (id) => {
		setTemporalFoodRemove(id)
		setModalDelete(true)
	}

	const confirmDeleteFood = async () => {
		setModalDelete(false)
		try {
			await supabase.from('foods').delete().eq('id', temporalFoodRemove)
			Notify.success('Se eliminó la comida correctamente.')
			
		} catch (error) {
			Notify.failure(
				'Algo salió mal al intentar eliminar la información. Por favor inténtalo de nuevo.'
			)
		}
		setTemporalFoodRemove('')
	}

	const confirmEditFood = async () => {
		try {
			await supabase.from('foods').update(NewFood).eq('id',temporalFoodEdit )
			Notify.success('Se actualizo la comida correctamente.')
		} catch (error) {
			Notify.failure('Algo salió mal. Por favor inténtalo de nuevo.')
		}
		setNewFood(InitialStateInputValues)
		setTemporalFoodEdit()
	}

	const getfoods = async () => {
		const docs =[]
		try {
			
				const {data} = await supabase
				.from('foods')
				.select('*')
				.eq('idUser', currentUser.user.id)
		
				data.forEach((doc) => {
					docs.push({ ...doc })
				})
				
				setfoods(docs);
				setLoaders(true);

		} catch (error) {
			Notify.failure(
				'Ocurrió un error al traer la información. Por favor inténtalo de nuevo.'
			)
		}
	}

	const addfood = async () => {
		const newfood = {
			...NewFood,
			idUser: currentUser.user.id,
		}

		setLoaders({
			...loaders,
			newfoodLoader: true,
		})

		try {
			await supabase.from('foods').insert(newfood)
			Notify.success('Se añadió la comida correctamente.')
		} catch (error) {
			Notify.failure(
				'Algo salió mal al intentar enviar la información. Por favor inténtalo de nuevo.'
			)
			setOpenModal(false)
		}

		setLoaders({
			...loaders,
			newfoodLoader: false,
		})

		setNewFood(InitialStateInputValues)
		getfoods()
	}

    if (currentUser) {
		return (
			<UserPanelLayout
				isMiMenu
				title="Mi menú"
				setActive={(value) => setActive(value)}
				openModal={(value) => setOpenModal(value)}
			>
				{ModalDelete && (
					<Modal
						isMiMenu
						setTemporalFoodEdit={(value) => setTemporalFoodEdit(value)}
						closeModal={(value) => setModalDelete(value)}
					>
						<p>¿Quieres eliminar esta comida?</p>
						<div>
							<button
								className="modal__container__button"
								onClick={() => setModalDelete(false)}
							>
								Cancelar
							</button>
							<button
								onClick={() => confirmDeleteFood()}
								className="modal__container__button modal__container__button--red"
							>
								Eliminar
							</button>
						</div>
					</Modal>
				)}
				{openModal && (
					<Modal
						isMiMenu
						closeModal={(value) => setOpenModal(value)}
						setTemporalFoodEdit={(value) => setTemporalFoodEdit(value)}
					>
						<form onSubmit={handleSubmit} className="modal__new-food__form">
							<h2>{temporalFoodEdit ? 'Editar' : 'Añadir'}</h2>
							<br />
							<label>
								Nombre
								<input
									placeholder="Hamburguesa doble..."
									value={NewFood.nombre}
									type="text"
									name="nombre"
									onChange={handleInput}
									required
									maxLength="20"
									className="input-modal__new-food newfoodForm"
								/>
							</label>
							<label>
								Precio
								<input
									placeholder="20000..."
									value={NewFood.precio}
									type="number"
									name="precio"
									onChange={handleInput}
									required
									className="input-modal__new-food newfoodForm"
								/>
							</label>
							<label>
								Descripción
								<textarea
									placeholder="es un tipo de sándwich hecho a base de carne molida aglutinada en forma de filete cocinado a la parrilla o a la plancha, aunque también puede freírse u hornearse..."
									value={NewFood.descripcion}
									type="text"
									name="descripcion"
									onChange={handleInput}
									required
									className="input-modal__new-food input-modal__new-food--textarea newfoodForm"
								/>
							</label>
							<input
								type="submit"
								className="modal__container__button newfoodForm"
								value={temporalFoodEdit ? 'Editar comida' : 'Añadir comida'}
							/>
						</form>
					</Modal>
				)}
				<section className="mi-menu__container">
					{active && (
						<div className="menu-link-qr fadeIn">
							<p>
								Tu menú esta disponible en:
								<br />
								<Link
									className="menu-link-qr__link"
									to={`/menu/${currentUser.user.id}`}
								>{` ${window.location.origin.toString()}/menu/${
									currentUser.user.id
								}`}</Link>
							</p>
							<a
								className="menu-link-qr__qr"
								role="button"
								href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${window.location.origin.toString()}/menu/${
									currentUser.user.id
								}`}
								rel="noopener noreferrer"
								target="_blank"
							>
								Código QR del menú
								<img
									className="menu-link-qr__qr--icon"
									src="/img/icons/qrcode.svg"
									alt="QR"
								/>
							</a>
						</div>
					)}
					{loaders.foodsLoader ? (
						<Loader />
					) : (
						<>
							{foods.length === 0 ? (
								<div className="mi-menu__no-foods">
									<span>Todavía no tienes comida en tu menú</span>
								</div>
							) : (
								<>
									{foods.map((food) => {
										return (
											<div key={food.id} className="food-container">
												<h2>{food.nombre}</h2>
												<br />
												<p>{food.descripcion}</p>
												<br />
												<strong>$ {food.precio}</strong>
												<div className="food-container__buttons">
													<button
														className="food-container-button food-container__button-edit"
														onClick={() => onEditFood(food.id)}
													>
														Editar
													</button>
													<button
														className="food-container-button food-container__button-delete"
														onClick={() => onDeleteFood(food.id)}
													>
														Eliminar
													</button>
												</div>
											</div>
										)
									})}
								</>
							)}
						</>
					)}
				</section>
			</UserPanelLayout>
		)
	}
	return <redirect to="/" />
}

export default MiMenu
