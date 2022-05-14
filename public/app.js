const formatCurrency = (price) => {
  return new Intl.NumberFormat("ru-Ru", {
    currency: "rub",
    style: "currency",
  }).format(price);
}


document.querySelectorAll(".price").forEach((node) => {
  node.textContent = formatCurrency(node.textContent)
});

const $card = document.querySelector("#card");

if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      // console.log(id);

      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.devices.length) {
            const html = card.devices.map(device=> {
              return `
              <tr>
                <td>${device.type}</td>
                <td>${device.count}</td>
                <td>
                  <button
                  class="btn btn-small js-remove"
                  data-id="${device.id}"
                  >Remove</button>
                </td>
              </tr>
              `
            }).join('')
            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').textContent = formatCurrency(card.sumPrice)
          } else {
            $card.innerHTML = "<p>Basket empty</p>";
          }
        });
    }
  });
}
