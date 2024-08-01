const PersonaPrompts = () => {
  return (
    <div className="h-full w-full p-8">
      {/* The big card */}
      <div className="h-full w-full bg-white rounded-lg border border-slate-300 shadow flex flex-col p-4 gap-2">
        <PersonaProfile />
        <Prompts />
      </div>
    </div>
  );
};

export default PersonaPrompts;

const PersonaProfile = () => {
  return (
    <div className="basis-[35%] border rounded-md bg-pink-400 relative overflow-clip">
      <div className="absolute w-full h-[40%] bottom-0 bg-white">
        <div>Picture here</div>
        <div>
          <h2>%Name AI%</h2>
        </div>
        <p></p>
      </div>
    </div>
  );
};

const Prompts = () => {
  return <div className="basis-[65%] border rounded-md">prompts</div>;
};
