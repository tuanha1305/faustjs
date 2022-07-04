import page from "./page";
import archive from "./archive";
import single from "./single";
import home from "./home";
import categoryUncategorised from "./category-uncategorised";
import pageSearch from "./page-search";

export default {
  page,
  archive,
  single,
  index: home,
  ['page-search']: pageSearch,
  ['category-uncategorised']: categoryUncategorised
};
