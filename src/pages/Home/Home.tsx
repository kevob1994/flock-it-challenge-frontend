
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Row, Col, Hidden, useScreenClass } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { IGetProvince, IProvince } from '@/types/interfaces';
import { useClient } from '@/hooks';
import { Header, Input, Map, Modal, Table } from '@/components';

export const Home: FC = () => {
  const { client } = useClient();
  const screenClass = useScreenClass();
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState<IProvince | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);

  const API_URL =
    import.meta.env.VITE_PROVINCE_API_URL || 'VITE_PROVINCE_API_URL';

  const headers = ['Nombre', 'latitud', 'longitud', 'Acciones'];

  const { data, isLoading } = useQuery(
    ['provincias', search],
    async () =>
      await client<IGetProvince>(
        `${API_URL}/provincias${search ? `?nombre=${search}` : ''}`
      ),
    {
      retry: false,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!['xs', 'sm', 'md', 'lg'].includes(screenClass)) setOpenModal(false);
  }, [screenClass]);

  const body = data?.provincias.map((province) => {
    return [
      province.nombre,
      province.centroide.lat,
      province.centroide.lon,
      <div
        className='text-blue-600 cursor-pointer'
        onClick={() => {
          setProvince(province);
          if (['xs', 'sm', 'md', 'lg'].includes(screenClass))
            setOpenModal(true);
        }}
      >
        <FontAwesomeIcon icon={faMapLocationDot} />
      </div>,
    ];
  });

  return (
    <>
      <Modal
        title='Ubicacion de la provincia'
        onClose={() => setOpenModal(false)}
        open={openModal}
      >
        <Map
          coordinates={{
            lat: province?.centroide.lat || -34.6144934119689,
            lng: province?.centroide.lon || -58.4458563545429,
          }}
        />
      </Modal>
      <Header />
      <Container className='md:m-5'>
        <Row>
          <Col className='bg-gray-800 py-6 md:rounded-md shadow-2xl md:m-5'>
            <div className='flex items-center'>
              <p className='font-medium text-2xl text-white mb-5 mr-10'>
                Provincias
              </p>
              <div className='w-full'>
                {' '}
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  searchIcon
                />
              </div>
            </div>

            <Table
              headers={headers}
              body={body || []}
              isLoading={isLoading && !data}
            />
          </Col>
          <Hidden xs sm md lg>
            <Col className='mt-5'>
              <div className='sticky top-[80px] p-5 bg-gray-800 rounded-md shadow-2xl'>
                <Map
                  coordinates={{
                    lat: province?.centroide.lat || -34.6144934119689,
                    lng: province?.centroide.lon || -58.4458563545429,
                  }}
                />
              </div>
            </Col>
          </Hidden>
        </Row>
      </Container>
    </>
  );
};
