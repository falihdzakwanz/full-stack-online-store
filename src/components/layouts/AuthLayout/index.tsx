import Link from "next/link";

type Proptypes = {
  error?: string;
  title?: string;
  children: React.ReactNode;
};

const AuthLayout = (props: Proptypes) => {
  const { error, title, children } = props;

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {error && <p>{error}</p>}
      <div className="bg-slate-500 p-8 rounded-sm">
        <h1 className="text-center text-xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
