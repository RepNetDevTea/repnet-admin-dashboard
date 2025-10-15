import { Link } from 'react-router-dom'
import {
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
} from '@/components/ui/navigation-menu'
import NavListItem from '@/components/NavListItem'

const listItemStyles = {
  main: {
    wrapper: 'flex flex-col h-full w-full select-none justify-end rounded-md bg-gradient-to-b from-muted/40 to-muted p-6', 
    title: 'mb-2 mt-4 text-lg font-medium', 
  },
  notMain: {
    wrapper: 'rounded-md block select-none space-y-1 p-3 leading-none transition-colors hover:bg-accent', 
    title: 'text-sm font-medium leading-none mb-1.5', 
  },
  content: 'text-sm leading-tight text-muted-foreground', 
};

const styles = { 
  wrapper: listItemStyles.notMain.wrapper, 
  title: listItemStyles.notMain.title, 
  content: listItemStyles.content, 
};

const adminListItems = [
  {
    title: '¿Qué vas a admnisitrar?', 
    content: {
      nonbold: 'A través del dashboard, te encargarás de moderar diversos elementos de RepNet como: ', 
      bold: 'sitios web, reportes y usuarios', 
    }, 
    styles: {
      wrapper: listItemStyles.main.wrapper, title: listItemStyles.main.title, 
      content: listItemStyles.content, 
    }
  }, 
  {
    title: 'Los usuarios', 
    content: {
      nonbold: 'Nuestra comunidad es la fuente principal que difunde los sitos e incidentes en los que suceden mientras navegamos ', 
      bold: 'la Web', 
    }, 
    styles
  }, 
  {
    title: 'Tu rol', 
    content: { nonbold: 'Con tu experiencia, podremos asegurar  la calidad del contenido y la comunidad de RepNet' },
    styles
  },
  {
    title: 'Los sitios', 
    content: { nonbold: 'Podrás consultar analíticas y la reputación de sitios registrados en RepNet a través del dashboard' }, 
    styles 
  }, 
];

const reportListItems = [
  {
    title: '¿Qué es un reporte?', 
    content: {
      nonbold: 'Es la pieza de información más importante de RepNet, sus piezas cruciales son: ',
      bold: 'las etiquetas, los impactos, las evidencias y los votos', 
    },
    styles: {
      wrapper: listItemStyles.main.wrapper, title: listItemStyles.main.title, 
      content: listItemStyles.content
    }
  },
  {
    title: 'Los impactos',
    content: { nonbold: 'Son las consecuencias reportadas por el usario, cuentan con un puntaje de severidad y descripción' },
    styles 
  }, 
  {
    title: 'Las etiquetas',
    content: { nonbold: 'Son las vulnerabilidades en las que un reporte cae, cuentan con un puntaje de severidad y descripción' },
    styles
  },
  {
    title: 'La severidad',
    content: {
      nonbold: 'Indica la gravedad del incidente a toda la comunidad de RepNet, calculada a partir de ',
      bold: 'nuestro algoritmo e IA (interpretando evidencias)', 
    },
    styles
  }, 
];

export default function LandingPageNavigationMenu() {
  const menuTriggerStyles = 'text-white bg-black';
  const navigationMenuContentStyles = 'grid md:grid-cols-2 gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]';

  return (
    <NavigationMenu className='z-20'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={ menuTriggerStyles }>
            ¿Eres administrador?
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className={ navigationMenuContentStyles }>
              { adminListItems.map(listItemConfig => (<NavListItem config={ listItemConfig } />)) }
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={ menuTriggerStyles }>
            Acerca de los reportes
          </NavigationMenuTrigger>
            
          <NavigationMenuContent>
            <ul className={ navigationMenuContentStyles }>
              { reportListItems.map(listItemConfig => (<NavListItem config={ listItemConfig } />)) }
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem 
          className={`${menuTriggerStyles} font-semibold px-3.5 py-1.5 rounded-md hover:text-black hover:bg-[#FACC15]`}
        >
          <Link className='text-sm' to='admins'>Dashboard</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}