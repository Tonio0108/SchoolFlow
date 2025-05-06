import { Link } from 'react-router'
import logo from '../assets/logo.png'

export default function Home(){
    return(
        <>
            <div className="flex items-center justify-center h-5/6">
                <div className="flex items-center justify-center">
                    <div className='w-1/4 flex items-center justify-center'>
                        <img id='logo' className='' src={logo} width={200} height={200} alt="" />
                    </div>
                    
                    <div id='description' className='w-2/4 p-3'>
                        <h3 className='text-emerald-600 font-semibold text-xl'>
                            Bienvenue sur SchoolFlow
                        </h3>
                        <p>Cette application vous permettra de créer facilement vos emploi du temps,
                             de gérer les classes, les salles, et la liste des professeurs dans votre établissement.
                              Les emploi du temps en PDF sont téléchargés au format PDF et aussi enrégistrés dans notre archive. 
                        </p>
                        <div className='flex justify-center mt-5'>
                            <Link to={'/emploi_du_temps'}
                                className='border border-emerald-600 
                                rounded px-2 py-1 hover:bg-emerald-600 hover:text-white
                                transition hover:cursor-pointer'>
                                Accèder à l'application
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}