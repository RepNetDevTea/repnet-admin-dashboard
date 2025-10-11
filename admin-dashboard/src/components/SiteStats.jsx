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
        <PolarAngleAxis dataKey={ dataKey } />
        <PolarGrid />

        <Radar
          dataKey={ label }
          fill={'var(--color-'+label+')'}
          fillOpacity={ 0.6 }
          dot={{ r: 4, fillOpacity: 1, }}
        />
      </RadarChart>
  </ChartContainer>
  );
}

export default function SiteStats({ metrics }) {
  return (
    <Card>
      <CardHeader className='items-center'>
        <CardTitle>
          Radar Charts - {metrics[0].type}s y {metrics[1].type}s
        </CardTitle>

        <CardDescription>
          Desplegando el total de {metrics[0].type.toLowerCase()}s y {metrics[1].type.toLowerCase()}s a lo largo del tiempo
        </CardDescription>
      </CardHeader>

      <CardContent className='mt-6 sm:flex-row md:flex'>
        {
          metrics.map((metric) => {
            return <ChartRadarDots data={ metric.content } />
          })
        }
      </CardContent>
    </Card>
  );
}