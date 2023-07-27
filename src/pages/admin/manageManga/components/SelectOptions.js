import { getAuthors } from "../../../../service/api.author";
import { getCategories } from "../../../../service/api.category";

export async function handleAuthorOptions(search) {
  try {
    let res = await getAuthors({ search, excludeDeleted: true });
    return mapToOption(res.data.itemList);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return [];
    }
  }
}

export async function handleCateOptions(search) {
  try {
    let res = await getCategories({ search, excludeDeleted: true });
    return mapToOption(res.data.itemList);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return [];
    }
  }
}

export function mapToOption(items) {
  return items.map((i) => ({
    value: i.id,
    label: i.name,
  }));
}
