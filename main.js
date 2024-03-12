(function () {
  const css = `
    .salaries-extra-container label {
      display: block;
      margin-bottom: 5px;
    }

    .salaries-extra-container input {
      margin-bottom: 10px;

    }
  `;
  const head = document.head || document.getElementsByTagName("head")[0];
  const styleElement = document.createElement("style");

  head.appendChild(styleElement);

  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    // This is required for IE8 and below.
    styleElement.styleSheet.cssText = css;
  } else {
    styleElement.appendChild(document.createTextNode(css));
  }

  const salariesForm = `
    <h2 class="wp-block-heading">Compare your salary with the rest ⚖️ 💸 ⚖️</h2>
    <p class="salaries-extra-container">
      <label>Total annual gross salary in EUR (before taxes and deductions)</label>
      <input type="number" />
    </p>
  `;

  document.getElementById("salaries").insertAdjacentHTML("beforebegin", salariesForm);
})();
