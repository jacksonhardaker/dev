import useCms from "../../hooks/useCms";
import { Predicates } from "prismic-javascript";

const fetchBlogPosts = async (pageSize = 20, page) => {
  try {
    const cms = await useCms();
    const meta = await cms.query(Predicates.at('document.type', 'blog_post'), { pageSize, page })
  
    return meta;
  }
  catch (error) {
    console.error(error);
    return {
      results: []
    };
  }
};

export default fetchBlogPosts;
