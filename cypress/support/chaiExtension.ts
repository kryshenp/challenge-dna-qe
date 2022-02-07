chai.Assertion.addMethod("multiple", function(expectedStrings: Array<string>, options?: Partial<Cypress.CaseMatchable> | undefined) {
  const $element = () => {
    if (typeof this._obj === "string") {
      return this._obj;
    } else {
      return this._obj[0].innerText;
    }
  };
  const caseSensitive = options && options.matchCase !== undefined ? options.matchCase : true;

  new chai.Assertion($element()).to.be.exist;

  const actual = caseSensitive ? $element() : $element().toLowerCase();
  const expected = `[${caseSensitive ? expectedStrings.toString() : expectedStrings.toString().toLowerCase()}]`;
  const bla = [];
  expectedStrings.forEach(stringFromArray => {
    if (!actual.includes(caseSensitive ? stringFromArray : stringFromArray.toLowerCase())) {
      bla.push(caseSensitive ? stringFromArray : stringFromArray.toLowerCase());
    }
  });
  this.assert(
    bla.length === 0
    , ` Expected #{this} to contain substrings \n#{exp}, but the following strings are missing #{${bla}}`
    , ""
    , expected
    , actual,
  );
});
