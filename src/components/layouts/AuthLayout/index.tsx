import Link from "next/link";

type PropTypes = {
  title?: string;
  children: React.ReactNode;
};

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-slate-500 p-8 rounded-sm">
        <h1 className="text-center text-xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
