import { Link } from "react-router-dom"
import UserPanelLayout from "./UserPanelLayout"
import '../assets/css/pages/UserPanel.css'
const UserPanel =() => {
    
    return(
    <div>
        <UserPanelLayout title="Menú principal">
			<section className="user-panel__main">
				<Link className="user-panel__main__link" to="/mi-menu">
					<div className="main-menu-card card-1">
						<h2>TU MENÚ</h2>
						<div className="main-menu-card__arrow-container">
							<img
								className="main-menu-card__arrow-container--img"
								src="/img/icons/arrow-card-1.svg"
								alt="→"
							/>
						</div>
						<img
							className="main-menu-card--img-1"
							src="/img/illustrations/card-1.png"
							alt="Food"
						/>
					</div>
				</Link>
				<Link className="user-panel__main__link" to="/mis-pedidos">
					<div className="main-menu-card card-2">
						<h2>TUS PEDIDOS</h2>
						<div className="main-menu-card__arrow-container">
							<img
								className="main-menu-card__arrow-container--img"
								src="/img/icons/arrow-card-2.svg"
								alt="→"
							/>
						</div>
						<img
							className="main-menu-card--img-2"
							src="/img/illustrations/card-2.png"
							alt="Food"
						/>
					</div>
				</Link>
				<Link className="user-panel__main__link" to="/miperfil">
					<div className="main-menu-card card-1">
						<h2>TU PERFIL</h2>
						<div className="main-menu-card__arrow-container">
							<img
								className="main-menu-card__arrow-container--img"
								src="/img/icons/arrow-card-2.svg"
								alt="→"
							/>
						</div>
						<img
							className="main-menu-card--img-1"
							src="/img/illustrations/card-3.png"
							alt="Food"
						/>
					</div>
				</Link>
			</section>
		</UserPanelLayout> 
    </div>
    )
}

export default UserPanel