const useLinkResolver = (doc) => {
  switch (doc.type) {
    case 'blog_post':
      return `/blog/${doc.uid}`
    default:
      return '/'
  }
};

export default useLinkResolver;
