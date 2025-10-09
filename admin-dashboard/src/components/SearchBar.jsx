import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

export default function SearchBar({placeholder, handleSubmit, handleChange}) {
  return (
    <form
      className="h-14 mb-7 flex items-center gap-x-2"
      onSubmit={handleSubmit} 
    >
      <Badge className='rounded-full p-3 bg-[#FACC15] drop-shadow-[0_0_7px_#FACC15]'>
        <Search />
      </Badge>
      <Input 
        className='rounded-full p-5'
        name="search_bar" 
        type="text" 
        placeholder={placeholder} autoComplete="off"
        onChange={handleChange}
      />
      <Button className='rounded-xl p-5 ' type="submit">Buscar</Button>
    </form>
  );
}