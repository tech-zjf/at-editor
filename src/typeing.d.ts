declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "omit.js";
declare module "numeral";
declare module "@antv/data-set";
declare module "mockjs";
declare module "react-fittext";
declare module "bizcharts-plugin-slider";
declare namespace API {
  type Event = {
    target: {
      value: string;
    };
  };
  type Options = { name: string; id: number | string };

  type Position = { x: number; y: number };

  type AtInputProps = {
    target?: string;
    height: number;
    placement?: "top" | "bottom";
    onRequest: (keyword?: string) => Options[];
    onChange: (content: string, selectList: Options[] | []) => void;
  };
  type SelectComProps = {
    visible: boolean;
    options: Options[];
    cursorPosition: Position;
    onSelect: (e: Options) => void;
  };
}
