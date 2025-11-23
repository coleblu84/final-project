import { sampleArticles } from "../../utils/apiData";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main() {
  return (
    <main className="main">
      <NewsCardList articles={sampleArticles} />
    </main>
  );
}

export default Main;
