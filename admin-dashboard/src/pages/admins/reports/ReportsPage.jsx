import { useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { Navigate } from 'react-router-dom'
import PageCard from '@/components/PageCard'
import PaginationComponent from '@/components/PaginationComponent'
import SearchBar from '@/components/SearchBar'
import { ClipboardPen } from 'lucide-react'

export default function ReportsPage() {
  if (!localStorage.getItem('accessToken'))
    return (<Navigate to='/accounts/log-in' replace={true} />);

  // const [reportsData, setReportsData] = useState(null);

  // const {
  //   data,  
  //   isPending: areReportsPending, 
  //   error,  
  // } = useFetch('http://localhost:3000/reports');

  // if (!error)
  //   setReportsData(data);

  const [reportId, setReportId] = useState('');
  const handleChange = (e) => {setReportId(e.target.value)};

  const [reportData, setReportData] = useState(null);
  const [isReportPending, setIsReportPending] = useState(false);
  const [reportError, setReportError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch(`http://localhost:3000/reports/${reportId}`, {
      method: 'GET',
      headers: {'Authorization': localStorage.getItem('accessToken')}
    })
    .then(res => {
      if (!res.ok)
        throw Error('Could not fetch the data');
      return res.json();
    })
    .then(data => {
      // setReportsData(null); 
      setIsReportPending(false);
      setReportError(null);

      data.site = {};
      setReportData(data);
    })
    .catch(error => {
      setIsReportPending(false);
      setReportError(error.message);
      console.log(error);
    });
  }

  const createCardConfig = (severity) => {
    const cardConfig = {
      site: {},
      report: {
        icon: <ClipboardPen color='#FACC15' />, 
        reportTitle: 'Fake Banking Login Page Stealing Credentials',
        severity: severity,
        createdAt: new Date().toLocaleString('es-MX'),
        id: 3,  
        buttonContent: 'Examinar', 
      } 
    };

    return cardConfig;
  };

  const cardConfig1 = createCardConfig(90);
  const cardConfig2 = createCardConfig(71);
  const cardConfig3 = createCardConfig(49);
  const cardConfig4 = createCardConfig(20);
  const cardConfig5 = createCardConfig(100);

  return (
    <div className='w-full flex-col justify-start items-start'>
      <h1 className='py-10 bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 text-transparent text-7xl text-center font-bold'>
        Reportes
      </h1>

      <SearchBar 
        placeholder='ID' 
        handleChange={ handleChange } 
        handleSubmit={ handleSubmit } 
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

      {/* <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
        { (reportsData && !reportData) && 
          reportsConfig.map((reportDataConfig) => (
            <PageCard cardConfig = { reportDataConfig } />
          ))
        }          
      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
        { (!reportsData && reportData) && 
          <PageCard cardConfig = { reportData } />
        }          
      </div> */}
      
      <PaginationComponent />
    </div>
  ); 
}