class StringTools {
  static isIncludeSpacesOrLineBreak(str) {
    return /(\s+)|([\r\n])/gi.test(str);
  }
}

export default StringTools;
