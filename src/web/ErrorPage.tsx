import { FC, ReactNode } from "react";

export const Error: FC<{
  title: string;
  description: string;
  children?: ReactNode;
}> = ({ title, description, children }) => {
  return (
    <>
      <div className="font-xl flex justify-center font-bold">{title}</div>
      <div className="font-lg flex justify-center">{description}</div>
      {children}
    </>
  );
};

export default Error;
