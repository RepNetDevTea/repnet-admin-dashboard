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

export default function ReportActionAlert({ alertConfig, handleClick }) {
  return(
    <AlertDialog>
      <AlertDialogTrigger >
        <alertConfig.icon color={alertConfig.color} />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿{alertConfig.action} reporte?</AlertDialogTitle>

          <AlertDialogDescription className='flex flex-col gap-y-3'>
            <span>Puedes hacerle saber al usuario tu retroalimentación:</span>

            <Textarea
              className="break-all max-h-[70vh] "
              placeholder='Escribe tu retroalimentación aquí.' 
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {/* <AlertDialogAction onClick={ handleClick }> */}

          <AlertDialogAction>
            {alertConfig.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>  
  );
}