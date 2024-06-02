import Link from "next/link";

type Proptypes = {
    error?: string;
    title?: string;
    children: React.ReactNode;
    link: string;
    linkText?: string;
}

const AuthLayout = (props: Proptypes) => {
    const { error, title, children, link, linkText } = props;

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="">{title}</h1>
      {error && <p>{error}</p>}
      <div className="bg-slate-500 p-9">
        {children}
      </div>
      <p>
        {linkText}{" "}
        <Link href={link}>here</Link>
      </p>
    </div>
  );
};

export default AuthLayout;
