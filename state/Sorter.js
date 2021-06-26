import OrderCard from "../artifact/OrderCard.js";

const Sorter = {};

const isJack = (card) => (card ? OrderCard.isJack(card.cardKey) : false);

Sorter.moveMaterialRoleSort = R.sortWith([
  R.ascend(R.prop("materialKey")),
  R.ascend(R.prop("roleKey")),
  R.ascend(R.prop("cardId")),
]);

Sorter.moveRoleMaterialSort = R.sortWith([
  R.ascend(R.prop("roleKey")),
  R.ascend(R.prop("materialKey")),
  R.ascend(R.prop("cardId")),
]);

Sorter.orderRoleNameSort = R.sortWith([
  R.ascend(isJack),
  R.ascend(R.path(["cardType", "roleKey"])),
  R.ascend(R.path(["cardType", "name"])),
]);

export default Sorter;
