import { Badge } from '@/components/ui/badge'
import {
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,  
  CardFooter, 
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function SidebarCard({ username }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='truncate'>¡Bienvenido {username}!</CardTitle>

        <Separator />

        <CardDescription className='max-w-100'>
          <div className='h-6 flex items-center space-x-4 text-sm'>
            <Badge variant='outline' className='bg-[#FACC15] text-black leading-tight truncate'>
              Administrador
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}