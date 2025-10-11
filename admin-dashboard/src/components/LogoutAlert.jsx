import { useNavigate } from 'react-router-dom'
import {
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger, 
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function LogoutAlert() {
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:3000/auth/log-out', {
      method: 'POST',
      headers: {
        'ContentType': 'application/json',
        'Authorization': localStorage.getItem('accessToken')
      }
    })
    .then(res => {
      if (!res.ok)
        throw Error('Could not log out');

      localStorage.removeItem('accessToken');
      return navigate('/');
    })
    .catch(error => console.log(error));
  };
 
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant='ghost'>
          <LogOut /> Cerrar sesión
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>

          <AlertDialogDescription>
            Estás a punto de cerrar sesión en este dispositivo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={ handleClick }>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}