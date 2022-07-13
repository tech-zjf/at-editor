class StringTools {
  /**
   * 匹配span标签
   */
  static regSpanLabel = /<span (.*?)>(.*?)<\/span>/g;

  /**
   * 匹配标签中的id属性
   */
  static reglabelAttrId = /id="(\d+)"/;

  /**
   * 匹配字符串中是否包含空格或者换行
   */
  static isIncludeSpacesOrLineBreak(str) {
    return /(\s+)|([\r\n])/gi.test(str);
  }

  /**
   * 获取标签中的id
   */
  static getSpanLabelId(spanStr) {
    return spanStr
      .match(StringTools.reglabelAttrId)[0]
      .split("=")[1]
      .replace(/\"/g, "");
  }
}

export default StringTools;
