class StringTools {
  static isIncludeSpacesOrLineBreak(str) {
    return !/ /.test(str) && !/\n/gi.test(str);
  }
}

export default StringTools;
