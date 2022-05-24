import { Row } from "@douyinfe/semi-ui";
import { isTauriAppContext } from "../../App";

export const SQLFormatterBlock = () => {
  return (
    <isTauriAppContext.Consumer>
      {(isTuari) => <> </>}
    </isTauriAppContext.Consumer>
  );
};
