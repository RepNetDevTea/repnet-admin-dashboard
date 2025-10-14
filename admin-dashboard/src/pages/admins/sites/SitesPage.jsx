import { useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { Navigate } from 'react-router-dom'
import PageCard from '@/components/PageCard'
import PaginationComponent from '@/components/PaginationComponent'
import SearchBar from '@/components/SearchBar'
import { Globe } from 'lucide-react'

export default function SitesPage() {
  if (!localStorage.getItem('accessToken'))
    return (<Navigate to="/accounts/log-in" replace={true} />);

  const { 
    data: sitesData, 
    isPending: isSitesPending, 
    error: sitesError, 
  } = useFetch('http://localhost:3000/sites')

  const [siteDomain, setSiteDomain] = useState('');
  const handleChange = (e) => {setSiteDomain(e.target.value)};

  const [siteData, setSiteData] = useState(null);
  const [isSitePending, setIsSitePending] = useState(false);
  const [siteError, setSiteError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSitePending(true);

    fetch(`http://localhost:3000/sites/?siteDomain=${siteDomain}`, {
      method: 'GET',
      headers: {'Authorization': localStorage.getItem('accessToken')}
    })
    .then(res => {
      if (!res.ok)
        throw Error('Could not fetch the data');
      return res.json()
    })
    .then(data => {
      setSiteData(data);
      setIsSitePending(false);
      setSiteError(null);
    })
    .catch(error => {
      setIsSitePending(false);
      setSiteError(error.message);
      console.log(error.message);
    });
  }
  
  const icon = <Globe color='#FACC15' />;
  const buttonContent = 'Analizar';

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

      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
        { 
          siteData ? (
            <PageCard 
              cardConfig={{ report: {}, site: { ...siteData, icon, buttonContent } }} 
            />
          ) : (
            sitesData?.map((siteData) => (
              <PageCard 
                cardConfig={{ report: {}, site: { ...siteData, icon, buttonContent } }} 
              />
            ))
          )
        }
      </div>      

      <PaginationComponent />
    </div>
  ); 
}