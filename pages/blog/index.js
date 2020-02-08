import useCms from "../../src/hooks/useCms";

const BlogIndex = ({ content }) => {
  return <h1>B</h1>;
};

BlogIndex.getInitialProps = async ({ req }) => {
  const cms = await useCms(req);
  const content = await cms.query('');
  
  return {
    content
  }
};

export default BlogIndex;
