import { primary, white } from "../constants/colors";

const ClearPreviewMode = () => {

  const click = () => {
    window.location = `/api/preview/clear?redirect=${window.location.pathname}`;
  };

  return (
    <aside>
      <button onClick={click}>Leave Preview Mode</button>
      <style jsx>{`
        aside {
          position: fixed;
          right: 30px;
          bottom: 30px;
        }
        button {
          background-color: ${primary};
          color: ${white};
          border: none;
          border-radius: 6px;
          padding: 15px 22px;
          cursor: pointer;
        }
      `}</style>
    </aside>
  );
}

export default ClearPreviewMode;
