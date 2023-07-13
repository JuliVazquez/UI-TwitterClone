import { ReactComponent as TwitterLogoIcon } from "./TwitterLogo.svg";
import { ReactComponent as HomeIcon } from "./HomeIcon.svg";
import { ReactComponent as ExploreIcon } from "./ExploreIcon.svg";
import { ReactComponent as NotificationIcon } from "./NotificationIcon.svg";
import { ReactComponent as Messages } from "./MessagesIcon.svg";
import { ReactComponent as Bookmarks } from "./BookmarksIcon.svg";
import { ReactComponent as ListsIcon } from "./ListsIcon.svg";
import { ReactComponent as ProfileIcon } from "./ProfileIcon.svg";
import { ReactComponent as MoreIcon } from "./MoreIcon.svg";
//import { ReactComponent as TweetearIcon } from './TweetearIcon.svg';

const icons = {
  Twitter: <TwitterLogoIcon />,
  Inicio: <HomeIcon />,
  Explorar: <ExploreIcon />,
  Notificaciones: <NotificationIcon />,
  Mensajes: <Messages />,
  Guardados: <Bookmarks />,
  Listas: <ListsIcon />, //
  Perfil: <ProfileIcon />, //
  "Más Opciones": <MoreIcon />,
  //'Tweetear': <TweetearIcon />,
};

function Icon({ name }) {
  return icons[name] || null;
}

export default Icon;
