import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTrigger, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogAction, 
  AlertDialogCancel, 
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'

export default function ReportActionAlert({ alertConfig }) {
  const [characterCount, setCharacterCount] = useState(0);
  const [adminFeedback, setAdminFeedback] = useState('');
  const { reportId } = useParams();

  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const input = e.target.value;

    if (input.length <= 521) {
      setAdminFeedback(input);
      setCharacterCount(input.length);
      return;
    }

    setAdminFeedback((previousState) => (previousState))
    e.target.value = adminFeedback;
  }

  const handleClick = () => {
    setIsPending(true);

    fetch(`http://localhost:3000/reports/${reportId}/status`, {
      method: 'PATCH', 
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('accessToken'), 
      }, 
      body: JSON.stringify({ reportStatus: alertConfig.toStatus, adminFeedback })
    })
    .then(res => {
      if (!res.ok)
        throw new Error('Could not fetch the desired data');
      return res.json()
    })
    .then((data) => {
      setIsPending(false);
      setError(null);
      navigate('/admins/search/reports');
    })
    .catch((error) => {
      setIsPending(false);
      setError(error.message);
    })  
  }

  return(
    <AlertDialog>
      <AlertDialogTrigger >
        <alertConfig.icon color={ alertConfig.color } />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿{alertConfig.action} reporte?</AlertDialogTitle>

          <AlertDialogDescription className='flex flex-col gap-y-3'>
            <span>Puedes hacerle saber al usuario tu retroalimentación (opcional):</span>
            <span>{characterCount} / 521</span>
            <Textarea
              className="break-all max-h-[70vh] "
              placeholder='Escribe tu retroalimentación aquí.'
              onChange={ handleChange } 
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={ handleClick }>
            {alertConfig.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>  
  );
}