import { useState, useEffect } from 'react'
import useFetch from '@/hooks/useFetch'
import { Navigate } from 'react-router-dom'
import PageCard from '@/components/PageCard'
import PaginationComponent from '@/components/PaginationComponent'
import SearchBar from '@/components/SearchBar'
import { Globe } from 'lucide-react'

export default function SitesPage() {
  const { 
    data, 
    isPending, 
    error, 
  } = useFetch(`http://localhost:3000/sites/?page=1`);

  const [sitesData, setSitesData] = useState(null);
  const [areSitesPending, setAreSitesPending] = useState(false);
  const [sitesError, setSitesError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [totalNumberOfSites, setTotalNumberOfSites] = useState(0);

  useEffect(() => {
    if (data) {
      console.log(data);
      setSitesData(data.sites);
      setCurrentPage(data.metaData.currentPage);
      setTotalNumberOfPages(data.metaData.totalNumberOfPages);
      setTotalNumberOfSites(data.metaData.totalNumberOfSites);
    }
  }, [data]);

  const [siteDomain, setSiteDomain] = useState('');

  const [siteData, setSiteData] = useState(null);
  const [isSitePending, setIsSitePending] = useState(false);
  const [siteError, setSiteError] = useState(null);

  if (!localStorage.getItem('accessToken'))
    return (<Navigate to="/accounts/log-in" replace={true} />);
  if (isPending) return (<div className='text-transparent'>...</div>);
  if (areSitesPending) return (<div className='text-transparent'>...</div>);

  // console.log('currentPage: ', currentPage);
  // console.log('sitesData: ', sitesData);
  // console.log('siteData: ', siteData);

  const handleSiteFetching = (page) => {
    setCurrentPage(page);
    setAreSitesPending(true);

    fetch(`http://localhost:3000/sites/?page=${page}`, {
      method: 'GET', 
      headers: { 'Authorization': localStorage.getItem('accessToken') }, 
    })
    .then((res) => {
      if (!res.ok)
        throw new Error('Could not fetch the desired data');
      return res.json();
    })
    .then((data) => {
      setAreSitesPending(false);
      setSitesError(null);
      setSiteData(null);

      const { sites, metaData } = data;
      setSitesData(sites);
      setCurrentPage(metaData.currentPage);
      setTotalNumberOfPages(metaData.totalNumberOfPages);
      setTotalNumberOfSites(metaData.totalNumberOfSites);
    })
    .catch((error) => {
      setAreSitesPending(false);
      setSitesError(error.message);
    });
  }

  const handleChange = (e) => {setSiteDomain(e.target.value)};

  const handleSearching = (e) => {
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
        handleSubmit={ handleSearching } 
        handleChange={ handleChange } 
      />

      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
        { 
          siteData ? (
            <PageCard 
              cardConfig={{ 
                report: {}, 
                site: { 
                  ...siteData, 
                  createdAt: siteData.createdAt.toLocaleString('es-MX'), 
                  icon, 
                  buttonContent, 
                } 
              }} 
            />
          ) : (
            sitesData?.map((siteData) => {
              const { createdAt, ...remainingSiteData } = siteData;

              return (<PageCard 
                cardConfig={{ 
                  report: {}, 
                  site: { 
                    ...remainingSiteData, 
                    createdAt: new Date(createdAt).toLocaleString('es-MX'), 
                    icon, 
                    buttonContent, 
                  } 
                }} 
              />);
            })
          )
        }
      </div>
      
      {data && (
        <PaginationComponent 
          currentPage={ currentPage } 
          totalNumberOfPages={ totalNumberOfPages } 
          totalNumberOfItems={ totalNumberOfSites } 
          handleClick = { handleSiteFetching } 
        />
      )}
    </div>
  ); 
}