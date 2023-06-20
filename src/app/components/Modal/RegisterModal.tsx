"use client";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";

import useRegisterModal from "@/app/hooks/useRegisterModal";

import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from ".";
import Heading from "../Heading";
import Input from "../Input";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Houve um erro ao cadastrar usuário!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continuar com Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continuar com Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Já tenho conta?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggle}
          >
            Entrar
          </div>
        </div>
      </div>
    </div>
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem-vindo ao Airbnb" subtitle="Criar conta" />
      <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Senha"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Cadastrar-se"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
