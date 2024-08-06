import Link from "next/link";
import Image from "next/image";
import { TypeListProps } from "@/types/type";

const TypeList: React.FC<TypeListProps> = ({ typeList, typeId }) => {
  return (
    <div className="types-list">
      {typeList.map((typeItem, idx) => (
        <Link
          href={`/recipes/${typeId}/${typeItem.type}`}
          className="types-item group"
          key={idx}>
          <Image
            src={typeItem?.image}
            alt={typeItem?.type}
            quality={100}
            rel="preload"
          />
          <span className="types-item-name group-hover:opacity-100">
            {typeItem.type}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default TypeList;
