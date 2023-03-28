const Skills = () => {
  const languages = ['TypeScript', 'Python', 'PHP', 'JavaScript'];
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-4">
        <div className="border-solid-gray">
          <div className="p-2 text-white">Languages</div>
          <div className="p-2 text-gray border-t-solid-gray">{languages.join(' ')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="border-solid-gray">
          <div className="p-2 text-white">Languages</div>
          <div className="p-2 text-gray border-t-solid-gray">{languages.join(' ')}</div>
        </div>
        <div className="border-solid-gray">
          <div className="p-2 text-white">Languages</div>
          <div className="p-2 text-gray border-t-solid-gray">{languages.join(' ')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="border-solid-gray">
          <div className="p-2 text-white">Languages</div>
          <div className="p-2 text-gray border-t-solid-gray">{languages.join(' ')}</div>
        </div>
        <div className="border-solid-gray">
          <div className="p-2 text-white">Languages</div>
          <div className="p-2 text-gray border-t-solid-gray">{languages.join(' ')}</div>
        </div>
        <div className="border-solid-gray">
          <div className="p-2 text-white">Languages</div>
          <div className="p-2 text-gray border-t-solid-gray">{languages.join(' ')}</div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
