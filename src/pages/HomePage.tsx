import css from "./Pages.module.css";

export default function Homepage() {
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
          <span>Додавайте переклади </span> Додавайте переклади та{" "}
          <span>вивчайте слова </span> у зручному форматі.
        </p>
        <p>
          Проходьте інтерактивні тести для кращого запам’ятовування. Тренуйте
          пам’ять за допомогою ефективних вправ та інтервальних повторень.
        </p>
        <p>
          Стежте за своїм прогресом за допомогою детальної статистики.
          Відстежуйте, скільки слів ви вже вивчили і які потребують повторення
        </p>
      </div>
    </div>
  );
}
