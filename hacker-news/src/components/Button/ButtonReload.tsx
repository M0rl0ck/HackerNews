import sttyles from "./buttonReload.module.css";

interface Iprops {
  callBack: () => void;
  text: string;
}

const ButtonReload = ({ callBack, text }: Iprops) => {
  return (
    <button onClick={callBack} className={sttyles.buttonReload}>
      {text}
    </button>
  );
};

export default ButtonReload;
