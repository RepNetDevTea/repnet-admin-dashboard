import { useEffect, useState } from 'react';
// import useFetch from '@/hooks/useFetch'
// import { Navigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
} from '@/components/ui/card'
import { FloatingNav } from '@/components/ui/floating-navbar'
import { FloatingReportNav } from '@/components/FloatingReportNav'
import MetricBadge from '@/components/MetricBadge'
import { Separator } from '@/components/ui/separator'
import AIBadge from '@/components/AIBadge'
import { Check, X } from 'lucide-react'

const getSeverityColorAndKey = (score) => {
  if (75 <= score && score <= 100)
    return ['#e11d48', 'CRÍTICO'];
  else if (50 <= score && score <= 75)
    return ['#ef4444', 'ALTO'];
  else if (25 <= score && score <= 50)
    return ['#f59e0b', 'MEDIO'];
  else
    return ['#22c55e', 'BAJO'];
}

export default function Report() {
  // const { reportId } = useParams();
  // const {data} = useFetch(`http://localhost:3000/reports/${reportId}`);

  // if (!localStorage.getItem('accessToken'))
  //   return (<Navigate to='/accounts/log-in' replace={true} />);

  const report = {
    id: 3, 
    reportTitle: 'Fake Banking Login Page Stealing Credentials',
    severity: 10,
    user: { username: 'Jero' },
    site: { id: 3, siteDomain: 'secure-banco-mx-login.com' }, 
    reportUrl: 'https://secure-banco-mx-login.com/verify', 
    reportStatus: 'pending', 
    tags: [
      { tagName: 'Phishing' }, 
      { tagName: 'Malware' }, 
      { tagName: 'Privacy Violation' }, 
      { tagName: 'Spam' }
    ], 
    reportDescription: 'I received an email that looked identical to my bank’s official communications. The link redirected me to a site that mimicked the login page perfectly. After entering my details, the site displayed an error and asked me to retry. Later, I noticed suspicious activity on my bank account.', 
    impacts: [
      {impactName: 'Credential Theft' }, 
      {impactName: 'Financial loss' }, 
      {impactName: 'Privacy Loss' }, 
    ], 
    evidences: [
      {
        id: 10, 
        evidenceKey: '3-10-2025-10-02T19:49:09.817Z.png', 
        evidenceUrl: 'https://repnet-evidences-bucket.s3.us-east-2.amazonaws.com/3-10-2025-10-02T19%3A49%3A09.817Z.png', 
      }, 
    ], 
    createdAt: new Date().toLocaleString('es-MX'), 
  }  

  const [s3File, setS3File] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(report.evidences[0].evidenceUrl)
    .then((res) => {
      return res.blob();
    })
    .then((data) => {
      const file = URL.createObjectURL(data);
      setS3File(file);
      setIsPending(false);
      setError(null);
    })
    .catch((error) => {
      setError(error.message);
      setIsPending(false);
    })
  }, []);

  // const responses = report.evidences.map(({ evidenceUrl }) => );

  const [color, key] = getSeverityColorAndKey(report.severity);

  const navActions = [
    {
      action: 'Validar', 
      icon: Check, 
      color: '#e11d48', 
    },
    {
      action: 'Rechazar', 
      icon: X, 
      color: '#22c55e', 
    },
  ];

  return(
    <Card className='h-fit w-full my-2'>
      <FloatingReportNav navActions={ navActions } />

      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='flex-col text-3xl truncate'>
          <span className='w-[80%]'>{report.reportTitle}</span>

          <CardDescription className='mt-2 truncate'>
            Reporte del sitio <Link to={`/admins/search/sites/${report.site.id}`} className='underline'> {report.site.siteDomain}</Link>, por  
            el usuario {report.user.username }.
          </CardDescription>
        </CardTitle>

        <div className='flex flex-col items-center gap-y-5 text-3xl font-bold'>
          <Badge 
            className='p-4 rounded-full text-3xl font-bold' 
            style={{ 
              background: color, 
              filter: `drop-shadow(0 0 7px ${color})`, 
              aspectRatio: '1/1' 
            }} 
          >
            {report.severity}
          </Badge>

          <span
            style={{ 
              background: color, 
              backgroundClip: 'text', 
              color: 'transparent', 
              filter: `drop-shadow(0 0 7px ${color})`,  
            }}
          >
            {key}
          </span>
        </div>
      </CardHeader>

      <CardContent className='flex flex-col gap-y-5 leading-tight'>
        <Separator />

        <CardTitle className='text-2xl'>URL</CardTitle>
        
        <div className='pl-10'>{report.reportUrl}</div>

        <CardTitle className='text-2xl'>Categorías</CardTitle>

        <div className='flex flex-wrap gap-2 pl-10'>
          {
            report.tags.map(({ tagName }) => {
              return (<MetricBadge metricName={ tagName } />);
            })
          }
        </div>

        <Separator />

        <CardTitle className='text-2xl'>Descripción</CardTitle>

        <div>{report.reportDescription}</div>

        <Separator />

        <CardTitle className='text-2xl'>Impactos</CardTitle>

        <div className='flex flex-wrap gap-2 pl-10'>
          {
            report.impacts.map(({ impactName }) => {
              return (<MetricBadge metricName={ impactName } />);
            })
          }
        </div>

        <Separator />

        <div className='text-2xl flex items-center gap-x-5'>
          <CardTitle>Evidencias</CardTitle>
          <AIBadge />
        </div>
        
        <div className='flex flex-col gap-y-2'>
          <img src={s3File} alt='evidence' className='mx-auto sm:w-[65%] lg:w-[50%] rounded-md' />
        </div>
      </CardContent>
    </Card>
  );
}