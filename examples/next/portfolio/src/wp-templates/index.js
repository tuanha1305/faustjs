import page from "./page";
import archive from "./archive";
import single from "./single";
import home from "./home";
import categoryUncategorised from "./category-uncategorised";

export default {
  page,
  archive,
  single,
  index: home,
  ['category-uncategorised']: categoryUncategorised
};
