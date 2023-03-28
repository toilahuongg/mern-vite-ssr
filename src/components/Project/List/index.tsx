import Button from '@src/components/Layout/Button';
import { IProject } from '@src/types/project';
import { useNavigate } from 'react-router-dom';

type TProps = {
  items: IProject[];
};
const ListProject: React.FC<TProps> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(({ _id, desc, name, slug, technicals, thumbnail }) => (
        <div className="border-solid border border-gray" key={_id}>
          <div className="aspect-4/3">
            <img src={thumbnail} className="w-full h-full object-cover" alt={name} />
          </div>
          <div className="border-solid border-gray border-y leading-normal text-gray p-2">{technicals.join(' ')}</div>
          <div className="p-4">
            <h4 className="text-2xl text-white font-medium">{name}</h4>
            <p className="mt-4 text-gray">{desc}</p>
            <div className="mt-4">
              <Button onClick={() => navigate(`/projects/${slug}`)}>Live {'<~>'}</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProject;
