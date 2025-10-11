import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignInForm () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    fathersLastName: '',
    mothersLastName: '',
    username: '',
    email: '',
    hashedPassword: '',
    userRole: 'admin'
  });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit= (e) => {
    e.preventDefault()
    setIsPending(true);

    fetch('http://localhost:3000/auth/teachers/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ formData })
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then(({accessToken, refreshToken}) => {
      localStorage.setItem('accessToken', `Bearer ${accessToken}`);
      localStorage.setItem('refreshToken', `Bearer ${refreshToken}`)
      setIsPending(false);
      setError(null);
      navigate('/admin/dashboard');
    })
    .catch((error) => {
      setIsPending(false);
      setError(error.message);
      console.log(error);
    });
  };

  return (
    <form 
      onSubmit={ handleSubmit } 
      className='w-[75vw] lg:w-[50vw] py-15 px-10 rounded-lg'
    >

      <div className='pb-6 flex flex-col items-baseline gap-y-5'>
        <div className='w-[100%] flex items-center gap-x-2'>
          <Label htmlFor='name'>Nombre:</Label>
          <Input 
            onChange={ handleChange } 
            name='name' 
            id='name' 
            type='text' 
            required 
          />
        </div>

        <div className='w-[100%] flex flex-row items-center gap-x-3'>
          <div className='w-[50%] flex items-center items-stretch'>
            <Label htmlFor='fathersLastName'>Appellido Paterno:</Label>
           <Input 
            onChange={ handleChange } 
            name='fathersLastName' i
            d='fathersLastName' 
            type='text' 
            required 
          />
          </div>

          <div className='w-[50%] flex items-center items-stretch'>
            <Label htmlFor='mothersLastName'>Appellido Materno:</Label>
            <Input 
              onChange={ handleChange } 
              name='mothersLastName' 
              id='mothersLastName' 
              type='text' 
              required 
            />
          </div>
        </div>
      </div>

      <div className='mb-2 space-y-2'>
        <Label htmlFor='username'>Username:</Label>
        <Input 
          onChange={ handleChange } 
          name='username' 
          id='username' 
          type='text' 
          required 
        />
      </div>

      <div className='mb-2 space-y-2'>
        <Label htmlFor='email'>Email:</Label>
        <Input 
          onChange={ handleChange } 
          name='email' 
          id='email' 
          type='email' 
          required 
        />
      </div>

      <div className='mb-2 space-y-2'>
        <Label htmlFor='hashedPassword'>Contraseña:</Label>
        <Input 
          onChange={ handleChange } 
          name='hashedPassword' 
          id='hashedPassword' 
          type='password' 
          required 
        />
      </div>

      <Button className='mt-4 bg-[#FACC15]' type='submit'>
        Registrarse
      </Button>
    </form>
  );
}