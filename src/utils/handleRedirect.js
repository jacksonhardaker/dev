export default Location => {
  const Page = () => null;

  Page.getInitialProps = ({ res } ) => {
    if (res) {
      res.writeHead(301, { Location });
      res.end();
    }

    return {};
  };
};
