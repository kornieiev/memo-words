import { useState } from "react";
import Button from "../components/Button/Button";
import css from "./Pages.module.css";
import Modal from "../components/Modal/Modal";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";

import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";

export default function Homepage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to='/main' replace />;
  }

  return (
    <div className={`container ${css.pagesWrapper}`}>
      <h1 className={css.title}>
        Wellcome <span>to</span>{" "}
        <span className={css.titleAccent}>MemoWords!</span>
      </h1>

      <div className={css.text}>
        <p>
          <span>Створюйте</span> власні унікальні <span>словники </span>
          та поповнюйте їх новими словами і фразами будь-якою мовою!{" "}
          <span>Додавайте переклади </span> та <span>вивчайте слова </span> у
          зручному форматі.
        </p>
        <p>
          <span>Проходьте</span> інтерактивні <span>тести</span> для кращого
          запам’ятовування. <span>Тренуйте пам’ять</span> за допомогою
          ефективних вправ та інтервальних повторень.
        </p>
        <p>
          <span>Стежте за</span> своїм <span>прогресом</span> за допомогою
          детальної статистики. Відстежуйте, скільки слів ви вже вивчили і які
          потребують повторення.
        </p>
      </div>
      <div className={css.buttonsWrapper}>
        <Button action='confirm' onClick={openLoginModal}>
          Login
        </Button>
        {isLoginModalOpen && (
          <Modal onClose={closeLoginModal}>
            <LoginForm onClose={closeLoginModal} />
          </Modal>
        )}

        <Button action='confirm' onClick={openRegisterModal}>
          Register
        </Button>
        {isRegisterModalOpen && (
          <Modal onClose={closeRegisterModal}>
            <RegisterForm onClose={closeRegisterModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}
