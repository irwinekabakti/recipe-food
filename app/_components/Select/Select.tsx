import { cuisinesData, dishTypeData, mealTypeData } from "@/utils/data";

interface TypeData {
  typeOf: "cuisine" | "dish" | "meal";
  typeName: string;
}

interface SelectProps {
  typeData: TypeData;
  handleSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ typeData, handleSelection }) => {
  let typeOfList: { type: string }[] = [];

  if (typeData.typeOf === "cuisine") {
    typeOfList = cuisinesData;
  } else if (typeData.typeOf === "dish") {
    typeOfList = dishTypeData;
  } else if (typeData.typeOf === "meal") {
    typeOfList = mealTypeData;
  }

  return (
    <div className="select">
      <select
        id="type-select"
        defaultValue={typeData?.typeName}
        onChange={handleSelection}>
        {typeOfList.map((typeItem) => (
          <option key={typeItem.type} value={typeItem.type}>
            {typeItem.type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
