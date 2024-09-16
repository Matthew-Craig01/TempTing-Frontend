import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, ReactNode, FC, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";
import { TemplateContext, TemplateErrorContext } from "./TemplateProvider";
import { checkIdentifier } from "./checkIdentifier";

export type ArgError = {
  index: number;
  arg: string;
  message: string;
};

const TemplateArgs: FC<{ locked?: boolean; fixedArgs?: boolean }> = ({
  locked,
  fixedArgs,
}) => {
  const { template, setTemplate } = useContext(TemplateContext);
  const { errors, setErrors } = useContext(TemplateErrorContext);
  const [args, setArgs] = useState(
    template.args.map((a) => {
      return { arg: a, id: uuid() };
    }) as { arg: string; id: string }[],
  );
  return (
    <div className="pt-5">
      <div className="flex justify-center text-lg font-semibold sm:block">
        Arguments
      </div>
      <ul className="flex flex-col justify-start gap-5 py-5 sm:max-h-52 sm:flex-row sm:flex-wrap sm:overflow-auto">
        <AnimatePresence initial={false}>
          {args.map((arg, index) => {
            return (
              <li key={arg.id}>
                <Animator id={arg.id}>
                  <div className="flex border border-solid border-muted-foreground">
                    <Input
                      disabled={locked}
                      value={args[index].arg}
                      onChange={(e) => {
                        args[index].arg = e.target.value;
                        setArgs([...args]);
                        setTemplate({
                          ...template,
                          args: args.map(({ arg, id }) => arg),
                        });
                        const argErrs = checkErrors(args);
                        setErrors({ ...errors, args: argErrs });
                      }}
                      placeholder="Template Argument"
                      className="w-full border-none sm:w-48"
                    />
                    {!locked && !fixedArgs ? (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          const newArgs = [
                            ...args.slice(0, index),
                            ...args.slice(index + 1),
                          ];
                          setArgs(newArgs);
                          setTemplate({
                            ...template,
                            args: newArgs.map(({ arg, id }) => arg),
                          });
                          const argErrs = checkErrors(newArgs);
                          setErrors({ ...errors, args: argErrs });
                        }}
                      >
                        <X />
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </Animator>
              </li>
            );
          })}
          <li key={"add"}>
            <Animator id={"add"}>
              <div className="flex flex-col gap-5 sm:flex-row">
                {args.length === 0 ? (
                  <div className="flex w-full flex-row justify-center text-muted-foreground sm:w-auto sm:flex-col">
                    Add your first argument:
                  </div>
                ) : (
                  <></>
                )}
                {!locked && !fixedArgs ? (
                  <div className="flex w-full justify-center sm:block sm:w-auto">
                    <Button
                      size="icon"
                      onClick={() => {
                        const newArgs = [...args, { arg: "", id: uuid() }];
                        setArgs(newArgs);
                        setTemplate({
                          ...template,
                          args: newArgs.map(({ arg, id }) => arg),
                        });
                        const argErrs = checkErrors(newArgs);
                        setErrors({ ...errors, args: argErrs });
                      }}
                      className="border border-foreground bg-white text-foreground hover:bg-zinc-100 hover:text-zinc-900 dark:border-foreground dark:bg-zinc-950 dark:text-foreground dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                      <Plus />
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Animator>
          </li>
        </AnimatePresence>
      </ul>
    </div>
  );
};

const Animator: FC<{ children: ReactNode; id: string }> = ({
  children,
  id,
}) => {
  return (
    <motion.div
      key={id}
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      style={{ margin: "0 10px" }}
    >
      {children}
    </motion.div>
  );
};

const checkErrors = (args: { arg: string; id: string }[]) => {
  let errors: ArgError[] = [];
  for (let i = 0; i < args.length; ++i) {
    const { arg } = args[i];
    if (arg === "") {
      const message = "Argument cannot be be empty.";
      errors = [...errors, { index: i, arg: arg, message: message }];
      continue;
    }
    const banned = checkIdentifier(arg);
    if (banned !== null) {
      const message = "`" + banned + "`" + " is not allowed in arguments.";
      errors = [...errors, { index: i, arg: arg, message: message }];
    }
  }
  return errors;
};

export default TemplateArgs;
