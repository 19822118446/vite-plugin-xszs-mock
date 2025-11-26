import Mock from "mockjs";


export const mockDemoApiData = (MockSchema: any) => {
  return Mock.mock(MockSchema);
};

const mockDemoApiData = {
  "list|1-10": [
    {
      "string|1-10": "★",
      "number|1-100": 1,
      "floatNumber|1-100.1-10": 1,
      "boolean|1": true,
      "bool|2-5": false,
      "object|2-4": {
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省"
      },
      "array|2": [
        "AMD",
        "CMD",
        "UMD"
      ],
      "foo": "哇哈哈哈哈",
      "name": function () {
        return this.foo
      },
      "regexp": /\d{5,10}/,
    },
  ],
  code: 200,
  message: "ok",
}

