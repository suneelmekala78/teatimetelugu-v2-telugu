import styles from "./NoResults.module.css";

type Props = {
  text: string;
};

export default function NoResults({ text }: Props) {
  return (
    <p className={styles.text}>
      "<b>{text}</b>" కి ఫలితాలు దొరకలేదు. ఇంకో పదంతో ప్రయత్నించండి.
    </p>
  );
}
