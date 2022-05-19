const formatCurrency = (price) => {
  return new Intl.NumberFormat("ru-Ru", {
    currency: "rub",
    style: "currency",
  }).format(price);
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat("ru-Ru", {
    day:'2-digit',
    month:'long',
    year:'numeric',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
  }).format(new Date(date));
}


document.querySelectorAll(".price").forEach((node) => {
  node.textContent = formatCurrency(node.textContent)
});

document.querySelectorAll(".date").forEach((node) => {
  node.textContent = formatDate(node.textContent)
});

const $card = document.querySelector("#card");

if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

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

M.Tabs.init(document.querySelectorAll('.tabs'));