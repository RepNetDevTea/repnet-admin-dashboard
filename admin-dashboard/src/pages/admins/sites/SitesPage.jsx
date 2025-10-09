import {useState} from "react";
import {Navigate} from "react-router-dom";

import PageCard from "@/components/PageCard";
import SearchBar from "@/components/SearchBar";
import PaginationComponent from "@/components/PaginationComponent";
import { Globe } from "lucide-react";

export default function SitesPage() {
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {setStudentId(e.target.value)};

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch(`http://localhost:3000/sites`, {
      method: "GET",
      headers: {"Authorization": localStorage.getItem("accessToken")}
    })
    .then(res => {
      if (!res.ok)
        throw Error("Couldn't fetch the data");
      return res.json()
    })
    .then(data => {
      setData(data);
      setIsPending(false);
      setError(null);
    })
    .catch(error => {
      setIsPending(false);
      setError(error.message);
      console.log(error);
    });
  }

  // if (!localStorage.getItem("accessToken"))
  //   return (<Navigate to="/accounts/log-in" replace={true} />);

  // const cardConfig = { 
  //   report: {
  //     icon: <ClipboardPen color='#FACC15' />,
  //     reportTitle: 'asdfasfds',
  //     severity: 23,
  //     createdAt: new Date().toLocaleString('es-MX'), 
  //     id: 4,
  //   },
  //   site: {
  //   //   icon: <Globe color='#FACC15' />,
  //   //   siteDomain: 'aws.com', 
  //   //   siteReputation: 99, 
  //   //   createdAt: new Date().toLocaleString('es-MX'), 
  //   //   id: 4,
  //   }
  // };

  const createCardConfig = (reputation) => { 
    const cardConfig = {
      report: {},
      site: {
        icon: <Globe color='#FACC15' />,
        siteDomain: 'AWS.COM',
        siteReputation: reputation,
        createdAt: new Date().toLocaleString('es-MX'),
        id: 3,
        buttonContent: 'Análisis', 
      }
    }
    return cardConfig;
  };

  const cardConfig1 = createCardConfig(90)
  const cardConfig2 = createCardConfig(71);
  const cardConfig3 = createCardConfig(49);
  const cardConfig4 = createCardConfig(20);
  const cardConfig5 = createCardConfig(100);

  return (
    <div className="w-full flex-col justify-start items-start">
      <h1 className='relative z-10 text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 py-10 text-center font-sans font-bold'>
        Sitios
      </h1>

      <SearchBar 
        placeholder="DOMINIO" 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
      />
      {true && (
        <div className='sm:grid-cols-1 md:grid-cols-2 grid gap-5'>
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
      )}

      <PaginationComponent />
    </div>
  ); 
}