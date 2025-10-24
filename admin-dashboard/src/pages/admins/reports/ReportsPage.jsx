import { useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { Navigate } from 'react-router-dom'
import PageCard from '@/components/PageCard'
import PaginationComponent from '@/components/PaginationComponent'
import SearchBar from '@/components/SearchBar'
import { ClipboardPen } from 'lucide-react'

export default function ReportsPage() {
  const {
    data,  
    isPending, 
    error,  
  } = useFetch('http://localhost:3000/reports/?page=1');

  const [reportsData, setReportsData] = useState(null);
  const [areReportsPending, setAreReportsPending] = useState(false);
  const [reportsError, setReportsError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [totalNumberOfReports, setTotalNumberOfReports] = useState(0);

  useEffect(() => {
    if (data) {
      console.log(data);
      setReportsData(data.sites);
      setCurrentPage(data.metaData.currentPage);
      setTotalNumberOfPages(data.metaData.totalNumberOfPages);
      setTotalNumberOfReports(data.metaData.totalNumberOfReports);
    }
  }, [data]);

  const [reportId, setReportId] = useState('');

  const [reportData, setReportData] = useState(null);
  const [isReportPending, setIsReportPending] = useState(false);
  const [reportError, setReportError] = useState(null);

  if (!localStorage.getItem('accessToken'))
    return (<Navigate to='/accounts/log-in' replace={true} />);
  if (isPending) return (<div className='text-transparent'>...</div>);
  if (areReportsPending) return (<div className='text-transparent'>...</div>);

  const handleReportFetching = (page) => {
    setCurrentPage(page);
    setAreReportsPending(true);

    fetch(`http://localhost:3000/reports/?page=${page}`, {
      method: 'GET', 
      headers: { 'Authorization': localStorage.getItem('accessToken') }, 
    })
    .then((res) => {
      if (!res.ok)
        throw new Error('Could not fetch the desired data');
      return res.json();
    })
    .then((data) => {
      setAreReportsPending(false);
      setReportsError(null);
      setReportData(null);

      const { sites, metaData } = data;
      setReportsData(sites);
      setCurrentPage(metaData.currentPage);
      setTotalNumberOfPages(metaData.totalNumberOfPages);
      setTotalNumberOfReports(metaData.totalNumberOfReports);
    })
    .catch((error) => {
      setAreReportsPending(false);
      setReportsError(error.message);
    });
  }

  const handleChange = (e) => {setReportId(e.target.value)};

  const handleSearching = (e) => {
    e.preventDefault();
    setIsReportPending(true);

    fetch(`http://localhost:3000/reports/?reportId=${reportId}`, {
      method: 'GET',
      headers: {'Authorization': localStorage.getItem('accessToken')}
    })
    .then(res => {
      if (!res.ok)
        throw Error('Could not fetch the data');
      return res.json()
    })
    .then(data => {
      setReportData(data);
      setIsReportPending(false);
      setReportError(null);
    })
    .catch(error => {
      setIsReportPending(false);
      setReportError(error.message);
      console.log(error.message);
    });
  }

  const icon = <ClipboardPen color='#FACC15' />;
  const buttonContent = 'Examinar';

  return (
   <div className='w-full flex-col justify-start items-start'>
      <h1 
        className='py-10 bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 text-transparent text-7xl text-center font-bold'
      >
        Reportes
      </h1>

      <SearchBar 
        placeholder='ID'
        handleSubmit={ handleSearching } 
        handleChange={ handleChange } 
      />

      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
        { 
          reportData ? (
            <PageCard 
              cardConfig={{ 
                site: {}, 
                report: { 
                  ...reportData, 
                  createdAt: reportData.createdAt.toLocaleString('es-MX'), 
                  icon, 
                  buttonContent, 
                } 
              }} 
            />
          ) : (
            reportsData?.map((reportData) => {
              const {createdAt, ...remainingReportData } = reportData;

              return (<PageCard 
                cardConfig={{ 
                  site: {}, 
                  report: { 
                    ...remainingReportData, 
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
          totalNumberOfItems={ totalNumberOfReports } 
          handleClick = { handleReportFetching } 
        />
      )}
    </div>
  ); 
}