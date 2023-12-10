import styles from "./loading.module.css";

interface ILoading {
  font_size?: string;
}

function Loading({ font_size }: ILoading) {
  return (
    <div style={font_size ? { fontSize: font_size } : { fontSize: "18px" }}>
      <h3 className={styles.loading}>Loading </h3>
    </div>
  );
}

export default Loading;
