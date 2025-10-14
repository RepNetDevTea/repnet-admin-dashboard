import { 
  PolarAngleAxis, 
  PolarGrid, 
  Radar, 
  RadarChart, 
} from 'recharts'
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
} from '@/components/ui/card'
import {
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
} from '@/components/ui/chart'

const ChartRadarDots = ({ data }) => {
  const [dataKey, label] = Object.keys(data[0]);

  const chartConfig = {
    [label]: {
      label: label,
      color: 'var(--chart-4)',
    },
  };

  return (
    <ChartContainer
      config={ chartConfig }
      className='max-h-[250px] w-100 mx-auto aspect-square'
    >
      <RadarChart data={ data }>
        <ChartTooltip cursor={ false } content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey={ label } />
        <PolarGrid />

        <Radar
          dataKey={ dataKey }
          fill={'var(--color-'+label+')'}
          fillOpacity={ 0.6 }
          dot={{ r: 4, fillOpacity: 1, }}
        />
      </RadarChart>
  </ChartContainer>
  );
}

export default function SiteStats({ metric }) {

  return (
    <Card>
      <CardHeader className='items-center'>
        <CardTitle>
          Radar Charts - {metric.type}s
        </CardTitle>

        <CardDescription>
          Desplegando el total de {metric.type.toLowerCase()}s a lo largo del tiempo
        </CardDescription>
      </CardHeader>

      <CardContent className='mt-6 sm:flex-row md:flex items-center justify-center'>
        { metric.content.length ? ( 
            <ChartRadarDots data={ metric.content } />
          ) : (
            <div 
              className='p-10 text-lg text-center text-transparent' 
              style={{
                background: '#e11d48',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 5px #e11d48)', 
              }}
            > 
              Sin análisis de {metric.type.toLowerCase()}s que desplegar
            </div>
          )
        }
      </CardContent>
    </Card>
  );
}