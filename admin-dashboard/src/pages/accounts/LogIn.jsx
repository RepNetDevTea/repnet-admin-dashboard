import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // const [isPending, setIsPending] = useState(false);
  // const [isError, setError] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState, 
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsPending(true);

    fetch('http://localhost:3000/accounts/teachers/log-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) {
        navigate('/accounts/log-in');
        throw Error('Could not validate credentials');
      }
      return res.json();
    })
    .then(({newToken}) => {
      // setIsPending(false);
      localStorage.setItem('jwt', `Bearer ${newToken}`);
      navigate('/teachers/matches');
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[100vh] w-full antialiased'>
      <h1 
        className='pb-10 bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 text-7xl text-transparent text-center font-bold'
      >
        Inicia sesión
      </h1>

      <div className='w-[75vw] lg:w-[50vw] min-h-[60vh] z-10'>
        <CardHeader>
          <CardTitle>Para ustedes administradores</CardTitle>
          
          <CardDescription>
            ¡Inicie sesión aquí! Haga click en <Badge className='bg-[#FACC15]'>Iniciar sesión</Badge> cuando termine
          </CardDescription>
        </CardHeader>

        <CardContent className='mt-6'>
          <form onSubmit={ handleSubmit } className='flex flex-col gap-y-10'>
            <div className='space-y-3'>
              <Label htmlFor='email'>Email:</Label>
              <Input 
                onChange={ handleChange } 
                name='email' 
                id='email'
                type='email' 
                required 
              />
            </div>

            <div className='space-y-3'>
              <Label htmlFor='password'>Contraseña:</Label>
              <Input 
                onChange={ handleChange } 
                name='password' 
                id='password' 
                type='password' 
                required 
              />
            </div>

            <Button className='w-[25%] bg-[#FACC15]'>Iniciar sesíon</Button>
          </form>
        </CardContent>
      </div>

      <BackgroundBeams />
    </div>
  );
}