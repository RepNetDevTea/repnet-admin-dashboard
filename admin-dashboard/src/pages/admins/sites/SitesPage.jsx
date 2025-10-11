import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import PageCard from '@/components/PageCard'
import PaginationComponent from '@/components/PaginationComponent'
import SearchBar from '@/components/SearchBar'
import { Globe } from 'lucide-react'

export default function SitesPage() {
  const [studentId, setStudentId] = useState('');
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {setStudentId(e.target.value)};

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch('http://localhost:3000/sites', {
      method: 'GET',
      headers: {'Authorization': localStorage.getItem('accessToken')}
    })
    .then(res => {
      if (!res.ok)
        throw Error('Could not fetch the data');
      return res.json()
    })
    .then(data => {
      setData(data);
      setIsPending(false);
      setError(null);
    })
    .catch(error => {
      setIsPending(false);
      setError(error.message);
      console.log(error);
    });
  }

  // if (!localStorage.getItem('accessToken'))
  //   return (<Navigate to="/accounts/log-in" replace={true} />);

  const createCardConfig = (reputation) => { 
    const cardConfig = {
      report: {},
      site: {
        icon: <Globe color='#FACC15' />,
        siteDomain: 'AWS.COM',
        siteReputation: reputation,
        createdAt: new Date().toLocaleString('es-MX'),
        id: 3,
        buttonContent: 'Análisis', 
      }
    }
    return cardConfig;
  };

  const cardConfig1 = createCardConfig(90)
  const cardConfig2 = createCardConfig(71);
  const cardConfig3 = createCardConfig(49);
  const cardConfig4 = createCardConfig(20);
  const cardConfig5 = createCardConfig(100);

  return (
    <div className='w-full flex-col justify-start items-start'>
      <h1 
        className='py-10 bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 text-transparent text-7xl text-center font-bold'
      >
        Sitios
      </h1>

      <SearchBar 
        placeholder='DOMINIO'
        handleSubmit={ handleSubmit } 
        handleChange={ handleChange } 
      />

      {true && 
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
          <PageCard cardConfig={ cardConfig1 } />
          <PageCard cardConfig={ cardConfig2 } />
          <PageCard cardConfig={ cardConfig3 } />
          <PageCard cardConfig={ cardConfig4 } />
          <PageCard cardConfig={ cardConfig5 } />
          <PageCard cardConfig={ cardConfig1 } />
          <PageCard cardConfig={ cardConfig2 } />
          <PageCard cardConfig={ cardConfig3 } />
          <PageCard cardConfig={ cardConfig4 } />
          <PageCard cardConfig={ cardConfig5 } />
        </div>
      }
      <PaginationComponent />
    </div>
  ); 
}