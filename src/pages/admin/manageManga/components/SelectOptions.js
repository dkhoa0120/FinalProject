import * as authorApi from "../../../../service/api.author";
import * as categoryApi from "../../../../service/api.category";

export async function handleAuthorOptions(search) {
  try {
    let res = await authorApi.getAuthors({ search });
    return mapToOption(res.data.itemList);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return [];
    }
  }
}

export async function handleCateOptions(search) {
  try {
    let res = await categoryApi.getCategories({ search });
    return mapToOption(res.data.itemList);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return [];
    }
  }
}

export function mapToOption(items) {
  return items?.map((i) => ({
    value: i.id,
    label: i.name,
  }));
}
