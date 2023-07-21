import { FC, useState } from "react";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
interface FontFamilyComponentProps {}

const FontFamilyComponent: FC<FontFamilyComponentProps> = () => {
  const editImageProperties = useEditImageProperties();
  const setStoreFontFamily = editImageProperties.setFontFamily;
  const isDisabled = editImageProperties.editImageProperties.isDisabled;
  const storeFontFamily = editImageProperties.editImageProperties.fontFamily;
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const cssFontFamilies = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Comic Sans MS",
    "Palatino Linotype",
    "Book Antiqua",
    "Lucida Sans Unicode",
    "Lucida Grande",
    "Garamond",
    "Arial Black",
    "Arial Narrow",
    "Century Gothic",
    "Lucida Console",
    "Courier",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
    "BlinkMacSystemFont",
    "Roboto",
    "Open Sans",
    "Ubuntu",
    // Add more font families as needed
  ];
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.currentTarget.value);
    setStoreFontFamily(e.currentTarget.value);
  };
  return (
    <>
      <br />
      <h1>Font Family:</h1>
      <select style={{ fontFamily: `${fontFamily}` }}value={storeFontFamily} disabled={isDisabled} onChange={(e) => handleFontFamilyChange(e)}>
        {cssFontFamilies.map((family, i) => {
          return <option key={i} style={{ fontFamily: `${family}` }} value={family}>
            {family}
          </option>
        })}
      </select>
    </>
  );
};
export default FontFamilyComponent;
