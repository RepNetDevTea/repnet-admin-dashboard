import useFetch from '@/hooks/useFetch'
import { Navigate, useParams } from 'react-router-dom'
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

const getMetricNamesAndFreqs = (metric, reports) => {
  const metricNamesAndFreqs = new Map();

  reports.forEach((report) => {
    report[`${metric}s`].forEach((metricObject) => {
      const metricName = metricObject[metric][`${metric}Name`];
      const prevFreqs = metricNamesAndFreqs.get(metricName) ?? 0;
      metricNamesAndFreqs.set(metricName, prevFreqs + 1);
    })
  })

  return metricNamesAndFreqs;
};

const getMetricData = (map, dataKey) => {
  const content = [];
  map.forEach((frequency, metricName) => {
    content.push({ 
      frecuencia: frequency, 
      [dataKey]: metricName 
    });
  });

  return content;
}

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
  if (!localStorage.getItem('accessToken'))
    return (<Navigate to='/accounts/log-in' replace={true} />);

  const { siteId } = useParams();
  const { data, isPending, error } = useFetch(`http://localhost:3000/sites/${siteId}`);

  if (isPending) return (<div>Pérame wey...</div>);

  const { updatedAt, reports, ...remainingData } = data;
  const { id, siteDomain, siteReputation, createdAt } = remainingData;

  const tagNamesAndFreqs = getMetricNamesAndFreqs('tag', reports);
  const tagNames = [];
  tagNamesAndFreqs.forEach((frequency, tagName) => tagNames.push(tagName));

  const impactNamesAndFreqs = getMetricNamesAndFreqs('impact', reports);
  const impactNames = [];
  impactNamesAndFreqs.forEach((frequency, impactName) => impactNames.push(impactName));

  const tagsChartData = { 
    type: 'Categoría', 
    content: getMetricData(tagNamesAndFreqs, 'categoría'), 
  };

  const impactsChartData = {
    type: 'Impacto',
    content: getMetricData(impactNamesAndFreqs, 'impacto'), 
  };

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

  const [color, key] = getSeverityColorAndKey(siteReputation);

  return (
    <div className='w-full my-2'>
      {data &&
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
              <CardTitle className='ml-2 mb-3 text-xl'>Categorías</CardTitle>

              <div className='mb-3 pl-10 flex flex-wrap gap-2'>
                { tagNames.length ? (
                    tagNames.map((tagName) => {
                      return (<MetricBadge className='text-white' metricName={ tagName } /> );
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

              <CardTitle className='ml-2 mb-3 text-xl'>Impactos</CardTitle>

              <div className='mb-3 pl-10 flex flex-wrap gap-2'>
                { impactNames.length ? (
                    impactNames.map((impactName) => {
                      return (<MetricBadge className='text-white' metricName={ impactName } />);
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
            </CardDescription>
          </CardHeader>

          <CardContent className = 'flex flex-col gap-y-3'>
            <SiteStats metric={tagsChartData} />
            <SiteStats metric={impactsChartData} />
          </CardContent>
        </Card>
      }
    </div>
  );
}