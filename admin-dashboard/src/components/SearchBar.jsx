import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function SearchBar({ placeholder, handleChange, handleSubmit }) {
  return (
    <form className='h-14 mb-7 flex items-center gap-x-2' onSubmit={handleSubmit}>
      <Badge className='p-3 rounded-full bg-[#FACC15] drop-shadow-[0_0_7px_#FACC15]'>
        <Search />
      </Badge>
      <Input 
        className='p-5 rounded-full '
        name='search_bar'
        type='text'
        placeholder={placeholder} autoComplete='off'
        onChange={handleChange}
      />
      <Button variant='secondary' className='rounded-xl p-5 ' type='submit'>
        Buscar
      </Button>
    </form>
  );
}