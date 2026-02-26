import styles from "./AdBlock.module.css";

export default function AdBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.block}>{children}</div>;
}