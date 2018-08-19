import { Map } from "immutable";
export const normalizeByKey = (data: [{}], key: string) => {
  return {
    ...data.reduce((obj, item) => {
      obj[item[key]] = item;
      return obj;
    }, {})
  };
};

export const getVisibleKeys = (data: [{}], key: string) => {
  return data.map(item => {
    return item[key];
  });
};

export const parseDataList = (dataByKey: Map<{}, {}>, dataKeys: string[]) => {
  return dataKeys.map((item: string) => {
    return dataByKey.get(item);
  });
};
