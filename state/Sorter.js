import OrderCard from "../artifact/OrderCard.js";

const Sorter = {};

const isJack = (card) => (card ? OrderCard.isJack(card.cardKey) : false);

Sorter.Move = {
  materialRoleSort: R.sortWith([
    R.ascend(R.prop("materialKey")),
    R.ascend(R.prop("roleKey")),
    R.ascend(R.prop("cardId")),
  ]),
  roleMaterialSort: R.sortWith([
    R.ascend(R.prop("roleKey")),
    R.ascend(R.prop("materialKey")),
    R.ascend(R.prop("cardId")),
  ]),
};

Sorter.Order = {
  roleNameSort: R.sortWith([
    R.ascend(isJack),
    R.ascend(R.path(["cardType", "roleKey"])),
    R.ascend(R.path(["cardType", "name"])),
  ]),
  valueMaterialSort: R.sortWith([
    R.ascend(isJack),
    R.ascend(R.path(["cardType", "materialValue"])),
    R.ascend(R.path(["cardType", "materialKey"])),
  ]),
};

Sorter.Site = {
  valueMaterialSort: R.sortWith([
    R.ascend(R.path(["cardType", "materialValue"])),
    R.ascend(R.path(["cardType", "materialKey"])),
  ]),
};

export default Sorter;
