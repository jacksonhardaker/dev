import { RichText } from 'prismic-reactjs';
import { gray } from '../constants/colors';

const Author = ({ name, about, portrait }) => {
  return (
    <footer itemProp="author" itemScope itemType="https://schema.org/Person">
      <img itemProp="image" src={portrait.thumbnail.url} alt={portrait.alt} />
      <h2 itemProp="name">{RichText.asText(name)}</h2>
      <div itemProp="description">{RichText.render(about)}</div>
      <style jsx>{`
        footer {
          display: grid;
          grid-template-columns: auto 1fr;
          border-top: solid 1px ${gray};
        }
        img {
          border-radius: 50%;
          grid-row: 1 / 3;
          padding: 20px
        }
        h2 {
          grid-row: 1 / 2;
          margin-bottom: 0;
        }
        div {
          grid-row: 2 / 3;
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
};

export default Author;
