// import useFetch from "@/hooks/useFetch"
// import { Navigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator";
import PageCard from '@/components/PageCard'

import SiteStats from '@/components/SiteStats'
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

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

  // if (!localStorage.getItem("accessToken"))
  //   return (<Navigate to="/accounts/log-in" replace={true} />);
  
  const site = {
    siteDomain: 'AWS.COM',
    siteReputation: 90,
    id: 3, 
    impacts: {
      type: 'Impacto', 
      content: [
        {impacto: 'Credential Theft', instancias: 135 }, 
        {impacto: 'Financial loss', instancias: 200 }, 
        {impacto: 'Privacy Loss', instancias:230 }, 
      ], 
    },
    tags: {
      type: 'Categoría', 
      content: [
        { categoría: 'Phishing', instancias: 111 }, 
        { categoría: 'Malware', instancias: 198 }, 
        { categoría: 'Privacy Violation', instancias: 384 }, 
        { categoría: 'Spam', instancias: 1000 }
      ], 
    }, 
    createdAt: new Date().toLocaleString("es-MX"), 
    updatedAt: "19-Mar-2026",
  }

  const { siteDomain, siteReputation, id, createdAt } = site;
  const cardConfig = { 
    report: {}, 
    site: {
      icon: <Globe color='#FACC15' />,
      siteDomain,
      siteReputation, 
      createdAt, 
      id
    }
  };

  const [color, key] = getSeverityColorAndKey(site.siteReputation);

  return (
    <div className="w-full my-2">
      {/* {data && <LevelStats levels={data.levels} />} */}
      <Card>
        <CardHeader>
          <div 
            className={`text-6xl text-center text-transparent font-bold`}
            style={{ background: color, filter: `drop-shadow(0 0 10px ${color})`, backgroundClip: 'text'}}
          >
            - {key} -
          </div>
          <Separator className='my-3' orientation={'horiztontal'} />
          <PageCard cardConfig={ cardConfig } />
          <CardDescription className='flex flex-col gap-y-3'>
            <div className="flex flex-wrap">
              {
                site.impacts.content.map(({ impacto }) => {
                  return (
                    <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6  text-white inline-block">
                      <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,#393BB2_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </span>
                      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                        <span>
                          {impacto}
                        </span>
                      </div>
                      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-violet-400/0 via-violet-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </div>
                  );
                })
              }
            </div>
            <div className="flex flex-wrap">
              {
                site.tags.content.map(({ categoría }) => {
                  return (
                    <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6  text-white inline-block">
                      <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,#393BB2_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </span>
                      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                        <span>
                          {categoría}
                        </span>
                      </div>
                      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-violet-400/0 via-violet-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </div>
                  );
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