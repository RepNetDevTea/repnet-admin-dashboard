// import useFetch from '@/hooks/useFetch'
// import { Navigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
} from '@/components/ui/card'
import PageCard from '@/components/PageCard'
import MetricBadge from '@/components/MetricBadge'
import { Separator } from '@/components/ui/separator'
import SiteStats from '@/components/SiteStats'
import { Globe } from 'lucide-react'

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

export default function Site() {
  // const { siteId } = useParams();
  // const {data} = useFetch(`http://localhost:3000/sites/${siteId}`);

  // if (!localStorage.getItem('accessToken'))
  //   return (<Navigate to='/accounts/log-in' replace={true} />);
  const site = {
    siteDomain: 'AWS.COM', 
    siteReputation: 90, 
    id: 3, 
    impacts: {
      type: 'Impacto', 
      content: [
        {impacto: 'Credential Theft', instancias: 135 }, 
        {impacto: 'Financial loss', instancias: 200 }, 
        {impacto: 'Privacy Loss', instancias: 230 }, 
      ], 
    }, 
    tags: {
      type: 'Categoría', 
      content: [
        { categoría: 'Phishing', instancias: 111 }, 
        { categoría: 'Malware', instancias: 198 }, 
        { categoría: 'Privacy Violation', instancias: 384 }, 
        { categoría: 'Spam', instancias: 1000 }, 
      ], 
    }, 
    createdAt: new Date().toLocaleString('es-MX'), 
  }

  const { siteDomain, siteReputation, id, createdAt } = site;
  const cardConfig = { 
    report: {}, 
    site: {
      icon: <Globe color='#FACC15' />,
      siteDomain,
      siteReputation, 
      createdAt, 
      id, 
    }
  };

  const [color, key] = getSeverityColorAndKey(site.siteReputation);

  return (
    <div className='w-full my-2'>
      {/* {data && <LevelStats levels={data.levels} />} */}
      <Card>
        <CardHeader>
          <div 
            className='text-7xl text-center text-transparent font-bold'
            style={{ 
              background: color, 
              filter: `drop-shadow(0 0 10px ${color})`, 
              backgroundClip: 'text'
            }}
          >
            - {key} -
          </div>

          <Separator className='my-3' />

          <PageCard cardConfig={ cardConfig } />
          
          <CardDescription>
            <CardTitle className='ml-2 mb-3 text-xl'>Impactos</CardTitle>

            <div className='mb-3 pl-10 flex flex-wrap gap-2'>
              {
                site.impacts.content.map(({ impacto }) => {
                  return (<MetricBadge className='text-white' metricName={ impacto } /> );
                })
              }
            </div>

            <CardTitle className='ml-2 mb-3 text-xl'>Categorías</CardTitle>

            <div className='mb-3 pl-10 flex flex-wrap gap-2'>
              {
                site.tags.content.map(({ categoría }) => {
                  return (<MetricBadge className='text-white' metricName={ categoría } />);
                })
              }
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SiteStats metrics={[site.impacts, site.tags]} />
        </CardContent>
      </Card>
    </div>
  );
}