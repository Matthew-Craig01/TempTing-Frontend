import { Control, FieldErrors, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React, { FC, FormEvent, useState } from "react";
import { CircleHelp } from "lucide-react";
import { z } from "zod";
import { ErrResponse, OkResponse } from "./SignInResponse";
import { User, useUser } from "./UserProvider";

export type FormType = "Sign In" | "Sign Up";

const FormSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const UserForm: FC<{ ft: FormType }> = ({ ft }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [invalid, setInvalid] = useState<{
    username: string | null;
    password: string | null;
    neither: string | null;
  }>({ username: null, password: null, neither: null });
  const { signin } = useUser();

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return onSubmit(setInvalid, signin, ft, form.getValues());
        }}
      >
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Field
              t="username"
              help={
                ft === "Sign Up"
                  ? "This will be publicly visible. All created templates will be assigned to your username."
                  : undefined
              }
              placeholder="Your Username."
              control={form.control}
            />
            <Field
              t="password"
              placeholder="Don't forget this! There's no recovery system."
              control={form.control}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-4">
          {invalid.username === null && invalid.password === null ? (
            <></>
          ) : (
            <div className="text-red-600">
              <p>{invalid.username}</p>
              <p>{invalid.password}</p>
            </div>
          )}
          <Button type="submit">{ft}</Button>
        </CardFooter>
      </form>
    </Form>
  );
};

const Field: FC<{
  t: "username" | "password";
  help?: string;
  placeholder: string;
  control: Control<{
    username: string;
    password: string;
  }>;
}> = ({ t, help, placeholder, control }) => {
  return (
    <FormField
      control={control}
      name={t}
      render={({ field }) => (
        <div className="flex flex-col space-y-1.5">
          <Lbl text={t} help={help} />
          <FormItem>
            <FormControl>
              <Input placeholder={placeholder} type={t} {...field} />
            </FormControl>
          </FormItem>
        </div>
      )}
    />
  );
};

const Lbl: FC<{
  text: "username" | "password";
  help?: string;
}> = ({ text, help }) => {
  let tooltip = <></>;
  if (help !== undefined) {
    tooltip = (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <CircleHelp />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-32">{help}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return (
    <div className="flex justify-between">
      <Label className="flex flex-col justify-end" htmlFor={text}>
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </Label>
      {tooltip}
    </div>
  );
};

const onSubmit = async (
  setInvalid: React.Dispatch<
    React.SetStateAction<{
      username: string | null;
      password: string | null;
      neither: string | null;
    }>
  >,
  signin: (user: User, sessionKey: string) => void,
  ft: FormType,
  data: z.infer<typeof FormSchema>,
) => {
  setInvalid({ username: null, password: null, neither: null });
  const apiPath = "/api/" + (ft == "Sign In" ? "signin" : "signup");
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(apiPath, request);
    if (response.ok) {
      const json: OkResponse = await response.json();
      signin(data.username, json.sessionKey);
    } else {
      const json: ErrResponse = await response.json();
      onInvalid(setInvalid, json);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const onInvalid = (
  setInvalid: React.Dispatch<
    React.SetStateAction<{
      username: string | null;
      password: string | null;
      neither: string | null;
    }>
  >,
  err: ErrResponse,
) => {
  const is_un = err.field == "username";
  const is_pw = err.field == "password";
  const is_neither = !(is_un || is_pw);
  if (is_neither) {
    console.log(err.message);
  }
  setInvalid({
    username: is_un ? err.message : null,
    password: is_pw ? err.message : null,
    neither: is_neither
      ? "Sorry, our server had an issue during the process. Please try again."
      : null,
  });
};

export default UserForm;
