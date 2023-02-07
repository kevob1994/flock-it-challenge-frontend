import { FC } from 'react';

interface IHeaderProps {
  headers: Array<string | JSX.Element>;
}

export const Header: FC<IHeaderProps> = ({ headers }) => {
  return (
    <tr>
      {headers.map((headers, index) => (
        <th scope='col' className='px-6 py-8 first:sticky first:left-0 bg-gray-800' key={index}>
          {headers}
        </th>
      ))}
    </tr>
  );
};
