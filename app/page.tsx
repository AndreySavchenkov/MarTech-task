"use client";

import Image from "next/image";
import { List } from "./components/List/List";
import mainImage from "../public/images/MainImage.jpg";
import Modal from "./components/Modal/Modal";
import { useEffect, useState } from "react";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";
import styles from "./page.module.scss";
import { Success } from "./components/Success/Success";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const setSuccessState = () => {
    setIsSuccess(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const resetStates = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  // ****** Redirect with token after loading the page ********
  //
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if (token) {
  //     router.push(`https://www.dating.com/people/#token=${token}`);
  //   }
  // }, [router]);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__imageContainer}>
          <Image
            src={mainImage}
            placeholder="blur"
            quality={100}
            sizes="100vw"
            alt="main image"
          />
        </div>
        <List handle={handleOpenModal} />
      </div>
      <Modal isOpen={isModalOpen} onClose={resetStates}>
        {isSuccess ? <Success /> : <RegisterForm handle={setSuccessState} />}
      </Modal>
    </div>
  );
}
