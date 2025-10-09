// import useFetch from "@/hooks/useFetch"
// import { Navigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator";
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

import { FloatingNav } from '@/components/ui/floating-navbar'
import { Check, X, BrainCircuit } from "lucide-react";

import { useEffect, useState } from 'react';

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

  // if (!localStorage.getItem("accessToken"))
  //   return (<Navigate to="/accounts/log-in" replace={true} />);

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
    createdAt: new Date().toLocaleString("es-MX"), 
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

  // const { siteDomain, siteReputation, id, createdAt } = site;
  // const cardConfig = { 
  //   report: {}, 
  //   site: {
  //     icon: <Globe color='#FACC15' />,
  //     siteDomain,
  //     siteReputation, 
  //     createdAt, 
  //     id
  //   }
  // };

  const [color, key] = getSeverityColorAndKey(report.severity);

  const navItems = [
    {
      name: "Validar",
      link: "/safdsdfsdf",
      icon: <Check />,
    },
    {
      name: "Rechazar",
      link: "/abouasdfasdft",
      icon: <X />,
    },
  ];

  return(
    <Card className="w-full my-2">
      <FloatingNav navItems={navItems} />
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='flex-col text-3xl truncate'>
          <span className='w-[80%]'>{report.reportTitle}</span>
          <CardDescription className='mt-2 truncate'>
            Reporte del sitio <Link to={`/admins/search/sites/${report.site.id}`} className='underline'> {report.site.siteDomain}</Link>, por  
            el usuario {report.user.username }.
          </CardDescription>
        </CardTitle>
        <div className='flex flex-col items-center gap-y-5 font-bold text-3xl' >
          <Badge className='rounded-full p-4 text-3xl font-bold' style={{ background: color, filter: `drop-shadow(0 0 7px ${color})`, aspectRatio: '1/1' }} >{report.severity}</Badge>
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

      <CardContent className='text-lg leading-tight flex flex-col gap-y-5'>
        <Separator />

        <CardTitle className='text-2xl'>URL</CardTitle>
        
        <div className='pl-10'>{report.reportUrl}</div>

        <CardTitle className='text-2xl'>Categorías</CardTitle>

        <div className='flex flex-wrap gap-2 pl-10'>
          {
            report.tags.map(({ tagName }) => {
              return (
                <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6 text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,#393BB2_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                      <span>
                        {tagName}
                      </span>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-violet-400/0 via-violet-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </div>
              );
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
              return (
                <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6 text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,#393BB2_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                      <span>
                        {impactName}
                      </span>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-violet-400/0 via-violet-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </div>
              );
            })
          }
        </div>

        <Separator />

        <div className='text-2xl flex items-center gap-x-5'>
          <CardTitle>Evidencias</CardTitle>
          <div className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]"> 
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" /> 
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl"> 
                <BrainCircuit color='#9177c7'/> <span className='ml-2'>Asistido por IA </span>
              </span> 
          </div>
        </div>
        
        <div className='w-full aspect-[4/3]'>
          <img src={s3File} alt="evidence" className='mx-auto sm:w-[80%] sm:h-[60%] lg:w-[70%] lg:h-[%57] rounded-md' />
        </div>
      </CardContent>

      <CardFooter>
        
      </CardFooter>
    </Card>
  );
}