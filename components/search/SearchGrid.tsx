import SearchCard from "./SearchCard";
import styles from "./SearchGrid.module.css";

type Props = {
  items: any[];
};

export default function SearchGrid({ items }: Props) {
  const getItemKey = (item: any) => {
    const base = item?.newsId || item?._id || "unknown";
    const type = item?.type || "news";
    return `${type}:${base}`;
  };

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <SearchCard key={getItemKey(item)} item={item} />
      ))}
    </div>
  );
}
