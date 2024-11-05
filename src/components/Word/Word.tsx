export default function Word({ words }) {
  return (
    <div>
      {words &&
        words.map((item, index) => {
          const {
            definition,
            folder,
            imageLink,
            learningStatus,
            translation,
            word,
          } = item;

          return (
            <div key={index}>
              <ul>
                <li>
                  <p>
                    Folder:<b> {folder}</b>
                  </p>
                  <p>
                    Word:<b> {word}</b>
                  </p>
                  <p>
                    Translation:<b> {translation}</b>
                  </p>
                  <p>
                    Definition:<b> {definition}</b>
                  </p>
                  <p>
                    LearningStatus:<b> {learningStatus}</b>
                  </p>
                  <img width='100px' src={imageLink} alt={word} />
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}
