import useCms from "../../hooks/useCms";
import { Predicates } from "prismic-javascript";

const fetchBlogPost = async (slug, ref) => {
  try {
    const cms = await useCms();
    const meta = await cms.query(Predicates.at('my.blog_post.uid', slug), {
      ref: ref,
      fetchLinks: [
        'author.name',
        'author.portrait',
        'author.about'
      ]
    });
    const [post] = meta.results;
  
    return post;
  }
  catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchBlogPost;
