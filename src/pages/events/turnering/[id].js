import React from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../../utils/supabaseClient';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function page() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('turneringer')
          .select('*')
          .eq('id', router.query.id);
        if (data) {
          setData(data[0]); // Assuming you expect only one record
        } else {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [router.query.id]);

  console.log(data);

  console.log(router.query);

  return (
    <div>
      {data && (
        <>
          <p>{data.eventNavn}</p>
          <p>{data.beskrivelse}</p>
          <Image
            width={250}
            height={250}
            src={data.background_image}
          />
        </>
      )}
    </div>
  );
}

export default page;
