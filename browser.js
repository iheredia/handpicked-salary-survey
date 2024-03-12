(function () {
  const form = `
    <h2 class="wp-block-heading" id="overview">Compare your salary ⚖️ 💸 ⚖️</h2>
    <p>
      Complete the following form and compare how you stand against the rest
    </p>
    <p>
      <div id="interactive-form">
        <label>Total annual gross salary in EUR (before taxes and deductions)</label>
        <input type="text" />
      </div>
      </p>
  `;
  document.getElementById("salaries").insertAdjacentHTML("beforebegin", form);
})();
