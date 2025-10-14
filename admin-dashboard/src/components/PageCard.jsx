import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

const getScoreColor = (score) => {
  if (75 <= score && score <= 100)
    return '#e11d48'
  else if (50 <= score && score <= 75)
    return '#ef4444';
  else if (25 <= score && score <= 50)
    return '#f59e0b';
  else
    return '#22c55e';
}

export default function PageCard({ cardConfig }) {
  const site = cardConfig?.site;
  const report = cardConfig?.report;
  const icon = site?.icon ?? report?.icon;
  const domainOrTitle = site?.siteDomain ?? report?.reportTitle;
  const reputationOrSeverity = site?.siteReputation ?? report?.severity;
  const createdAt = site?.createdAt ?? report?.createdAt;
  const id = site?.id ?? report?.id;
  const buttonContent = site?.buttonContent ?? report?.buttonContent;

  return (
    <Card className='mb-2'>
      <CardHeader>
        <CardTitle 
          className='flex items-center justify-between py-4.5 pr-4 overflow-hidden text-xl'
        >
          <div className='flex items-center overflow-hidden'>
            {icon}
            <span className='px-2 pr-10 leading-tight truncate'>
              {domainOrTitle} 
            </span>
          </div>

          <Badge 
            className='mr-1 p-2 rounded-full font-bold' 
            style={{ 
              aspectRatio: '1/1', 
              backgroundColor: getScoreColor(reputationOrSeverity),
              filter: `drop-shadow(0 0 4px ${getScoreColor(reputationOrSeverity)}`,
            }}
          >
            {reputationOrSeverity}
          </Badge>
        </CardTitle>

        <Separator />

        <CardDescription className='leading-none'>
          Se registró el {createdAt}
        </CardDescription>
      </CardHeader>

      { buttonContent && 
        <CardFooter>
          <Button variant='secondary'>
            <Link to={`${id}`}>
              {buttonContent}
            </Link>
          </Button>
        </CardFooter>
      }
    </Card>
  );
}