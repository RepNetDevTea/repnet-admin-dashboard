import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch'
import { Navigate, useParams } from 'react-router-dom'
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
  if (!localStorage.getItem('accessToken'))
    return (<Navigate to='/accounts/log-in' replace={true} />);

  const { reportId } = useParams();
  const { data, isPending, error } = useFetch(`http://localhost:3000/reports/${reportId}`);

  if (isPending) return(<div className='text-transparent'>...{reportId}</div>);

  const { 
    id, 
    reportTitle, 
    severity, 
    user, 
    site, 
    reportUrl, 
    reportDescription, 
    tags, 
    impacts, 
    evidences,  
  } = data;

  const [color, key] = getSeverityColorAndKey(severity);

  const navActions = [
    {
      action: 'Aprobar', 
      icon: Check, 
      color: '#22c55e', 
      toStatus: 'approved'
    },
    {
      action: 'Rechazar', 
      icon: X, 
      color: '#e11d48', 
      toStatus: 'rejected'
    },
  ];

  return(
    <Card className='h-fit w-full my-2'>
      <FloatingReportNav navActions={ navActions } />

      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='flex-col text-3xl truncate'>
          <span className='w-[80%]'>{id}º {reportTitle}</span>

          <CardDescription className='mt-2 truncate'>
            Reporte del sitio <Link to={`/admins/search/sites/${site.id}`} className='underline'> {site.siteDomain}</Link>, por  
            el usuario {user.username }.
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
            {severity}
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
        
        <div className='pl-10'>{reportUrl}</div>

        <CardTitle className='text-2xl'>Categorías</CardTitle>

        <div className='flex flex-wrap gap-2 pl-10'>
          { tags.length ? (
              tags.map(({ tag }) => {
                return (<MetricBadge metricName={ tag.tagName } />);
              })
            ) : (
              <div 
                className='text-lg text-transparent' 
                style={{
                  background: '#e11d48',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 5px #e11d48)', 
                }}
              > 
                Sin categoría(s) que desplegar
              </div>
            )
          }
        </div>

        <Separator />

        <CardTitle className='text-2xl'>Descripción</CardTitle>

        <div>{reportDescription}</div>

        <Separator />

        <CardTitle className='text-2xl'>Impactos</CardTitle>

        <div className='flex flex-wrap gap-2 pl-10'>
          {
            impacts.length ? (
              impacts.map(({ impact }) => {
                return (<MetricBadge metricName={ impact.impactName } />);
              })
            ) : (
              <div 
                className='text-lg text-transparent' 
                style={{
                  background: '#e11d48',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 5px #e11d48)', 
                }}
              > 
                Sin impacto(s) que desplegar
              </div>
            )
          }
        </div>

        <Separator />

        <div className='text-2xl flex items-center gap-x-5'>
          <CardTitle>Evidencias</CardTitle>
          <AIBadge />
        </div>
        
        <div className='flex flex-col gap-y-2'>
          { evidences.length ? (
              evidences.map(({ evidenceFileUrl }, idx) => (
                <img 
                  src={evidenceFileUrl} 
                  alt={`evidence-${idx}`} 
                  className='mx-auto sm:w-[65%] lg:w-[50%] rounded-md' 
                />
              ))
            ) : (
              <div 
                className='p-10 text-lg text-center text-transparent' 
                style={{
                  background: '#e11d48',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 5px #e11d48)', 
                }}
              > 
                Sin evidencias por desplegar
              </div>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}