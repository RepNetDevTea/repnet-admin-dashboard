import {Link} from "react-router-dom";

import {
  NavigationMenu, NavigationMenuContent, 
  NavigationMenuItem, NavigationMenuList, 
  NavigationMenuTrigger, 
} from "@/components/ui/navigation-menu";

import ListItem from "@/components/ListItem";

const listItemStyles = {
  main: {
    wrapper: `flex flex-col h-full w-full select-none justify-end rounded-md 
    bg-gradient-to-b from-muted/40 to-muted p-6`,
    title: `mb-2 mt-4 text-lg font-medium`
  },
  notMain: {
    wrapper: `rounded-md block select-none space-y-1 p-3 leading-none 
    transition-colors hover:bg-accent`,
    title: `text-sm font-medium leading-none mb-1.5`
  },
  content: `text-sm leading-tight text-muted-foreground`
};

const adminListItems = [
  {
    title: "¿Qué vas a admnisitrar?",
    content: {
      nonbold: `A través del dashboard, te encargarás de moderar diversos elementos 
      de RepNet como: `,
      bold: `sitios web, reportes y usuarios`
    },
    styles: {
      wrapper: listItemStyles.main.wrapper, title: listItemStyles.main.title, 
      content: listItemStyles.content
    }
  },
  {
    title: "Los usuarios",
    content: {
      nonbold: `Nuestra comunidad es la fuente principal que difunde los sitos e
      incidentes en los que suceden mientras navegamos `,
      bold: `la Web`
    },
    styles: {
      wrapper: listItemStyles.notMain.wrapper, title: listItemStyles.notMain.title,
      content: listItemStyles.content
    }
  }, 
  {
    title: "Tu rol",
    content: {
      nonbold: `Con tu experiencia, podremos asegurar  la calidad del contenido y 
      la comunidad de RepNet`
    },
    styles: { 
      wrapper: listItemStyles.notMain.wrapper, title: listItemStyles.notMain.title,
      content: listItemStyles.content 
    }
  },
  {
    title: "Los sitios",
    content: {
      nonbold: `Podrás consultar analíticas y la reputación de sitios registrados en 
      RepNet a través del dashboard`
    },
    styles: {
      wrapper: listItemStyles.notMain.wrapper, title: listItemStyles.notMain.title, 
      content: listItemStyles.content
    }
  }, 
];

const reportListItems = [
  {
    title: "¿Qué es un reporte?",
    content: {
      nonbold: `Es la pieza de información más importante de RepNet, sus piezas 
      cruciales son: `,
      bold: `las etiquetas, los impactos, las evidencias y los votos`
    },
    styles: {
      wrapper: listItemStyles.main.wrapper, title: listItemStyles.main.title, 
      content: listItemStyles.content
    }
  },
  {
    title: "Los impactos",
    content: {
      nonbold: `Son las consecuencias reportadas por el usario, cuentan con un 
      puntaje de severidad y descripción`,
    },
    styles: {
      wrapper: listItemStyles.notMain.wrapper, title: listItemStyles.notMain.title,
      content: listItemStyles.content
    }
  }, 
  {
    title: "Las etiquetas",
    content: {
      nonbold: `Son las vulnerabilidades en las que un reporte cae, cuentan con un 
      puntaje de severidad y descripción`
    },
    styles: { 
      wrapper: listItemStyles.notMain.wrapper, title: listItemStyles.notMain.title,
      content: listItemStyles.content 
    }
  },
  {
    title: "La severidad",
    content: {
      nonbold: `Indica la gravedad del incidente a 
      toda la comunidad de RepNet, calculada a partir de `,
      bold: `nuestro algoritmo e IA (interpretando evidencias)`
    },
    styles: {
      wrapper: listItemStyles.notMain.wrapper, title: listItemStyles.notMain.title, 
      content: listItemStyles.content
    }
  }, 
];

export default function LandingPageNavigationMenu() {
  const menuTrigger_styles = "text-white bg-black";

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={menuTrigger_styles}>
              ¿Eres administrador?
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {adminListItems.map(listItemConfig => (<ListItem config={listItemConfig} />))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className={menuTrigger_styles}>
              Acerca de los reportes
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {reportListItems.map(listItemConfig => (<ListItem config={listItemConfig} />))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className={`${menuTrigger_styles} font-semibold  
          px-3.5 py-1.5 rounded-md hover:text-black hover:bg-white`}>
            <Link className="text-sm" to="/admins/">Dashboard</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}