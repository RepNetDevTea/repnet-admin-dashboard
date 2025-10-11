import WorldMap from '@/components/ui/world-map'

// we have to substract 15 from every lat to be precise
const mexicoCity = { lat: 5.4326, lng: -99.1332, };

const dots = [
  {
    start: mexicoCity, 
    end: { lat: 19.0522, lng: -118.2437, }, // Los Angeles
  },
  {
    start: mexicoCity,
    end: { lat: 20.6895, lng: 139.6917 }, // Tokyo
  },
  {
    start: mexicoCity, 
    end: { lat: 33.8566, lng: 2.3522 }, // Paris
  },
  {
    start: mexicoCity, 
    end: { lat: -48.8679, lng: 151.2073 }, // Sydney
  },
  {
    start: mexicoCity, 
    end: { lat: -30.7939, lng: -47.8828 }, // Brasilia
  },
];

export default function NotFoundPage() {
  const commonStyle = 'bg-transparent text-[#FACC15] font-bold text-center ';

  return (
    <div className='min-h-[100vh] w-full bg-black'>
      <h1 className={commonStyle+'text-4xl'}>404</h1>
      <p className={ commonStyle } >
        No encontramos lo que buscabas
      </p>
      <WorldMap dots={dots} lineColor={'#FACC15'} />
    </div>
  );
}