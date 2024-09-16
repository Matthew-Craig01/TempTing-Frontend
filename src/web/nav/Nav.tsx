import Centre from "./Centre";
import Right from "./Right";
import Left from "./Left";

export const Nav = () => {
  return (
    <div className="flex w-full max-w-full flex-col justify-between py-3 sm:flex-row md:justify-between">
      <Left></Left>
      <div className="flex flex-row justify-center max-[320px]:flex-col">
        <Centre></Centre>
      </div>
      <Right></Right>
    </div>
  );
};

export default Nav;
