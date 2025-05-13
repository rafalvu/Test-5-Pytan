import "@material/web/all.js";
import { styles as typescaleStyles } from "@material/web/typography/md-typescale-styles.js";

document.adoptedStyleSheets.push(typescaleStyles.styleSheet);

const form = document.querySelector("form");
const resultsDiv = document.getElementById("results");
const answersList = document.getElementById("answers-list");
const t5pButton = document.getElementById("t5p-button");
document
  .querySelectorAll(".question3-answer md-checkbox")
  .forEach((checkbox) => {
    let tooltipTimeout;

    checkbox.addEventListener("mouseenter", () => {
      tooltipTimeout = setTimeout(() => {
        checkbox.classList.add("show-tooltip");
      }, 1000); // 2 sekundy opóźnienia
    });

    checkbox.addEventListener("mouseleave", () => {
      clearTimeout(tooltipTimeout); // Anuluj wyświetlanie tooltipa, jeśli kursor opuści element
      checkbox.classList.remove("show-tooltip");
    });
  });

const loader = document.querySelector(".loader");
form.addEventListener("reset", () => {
  loader.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
  }, 600);

  answersList.style.display = "none";
  answersList.classList.remove("show"); // Remove the animation class
  answersList.innerHTML = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loader.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500); // Clear and show the answers list

  answersList.innerHTML = "";

  const question1 = form.querySelector(".question1 md-slider");

  const question1Answer1 =
    "Zatroszcz się o siebie, potrzebujesz troskliwej uwagi i wsparcia. Rozważ rozmowę z przyjaciółmi, członkami rodziny lub specjalistą (psychoterapeuta, psychiatra).";
  const question1Answer2 =
    "To zakres typowy dla większości osób. Zidentyfikuj czynniki, które wzmacniają Twoją odporność i te, które ją osłabiają (pytanie 3 Ci w tym pomoże).";
  const question1Answer3 =
    "Doświadczasz stanów szczęścia i/lub euforii. Zastanów się, co jest ich źródłem i dbaj o utrzymanie równowagi („blisko ziemi”).";

  if (question1.value < 3) {
    answersList.innerHTML += `<md-list-item><span style="font-weight: bold;">1. </span>${question1Answer1} </md-list-item><md-divider></md-divider>`;
  } else if (question1.value < 8) {
    answersList.innerHTML += `<md-list-item><span style="font-weight: bold;">1. </span>${question1Answer2}</md-list-item><md-divider></md-divider>`;
  } else {
    answersList.innerHTML += `<md-list-item><span style="font-weight: bold;">1. </span>${question1Answer3}</md-list-item><md-divider></md-divider>`;
  }

  const question2 = form.querySelector(".question2 md-slider");

  const question2Answer1 =
    "Apatia i bezradność są jednymi z najtrudniejszych stanów do akceptacji i przejścia przez nie. Zastanów się, czy trudności mają charakter obiektywny, czy wynikają z wewnętrznych mechanizmów (depresyjnych). Podejmij wspierającego działania i skorzystaj z pytania nr 3.";
  const question2Answer2 =
    "Zakres typowy dla większości. Zidentyfikuj, co zwiększa Twoją sprawczość, a które obszary wymagają wsparcia (punkt 3 pomoże Ci w tym).";
  const question2Answer3 =
    "Wysoki zakres. Wysoki poziom funkcjonowania często wynika z pozytywnego nastawienia i wytrwałości. Zweryfikuj swoją ocenę z bliskimi i pamiętaj, że bardzo wysokie wyniki mogą wynikać z mechanizmów wyolbrzymienia.";

  if (question2.value < 3) {
    answersList.innerHTML += `<md-list-item><span style="font-weight: bold;">2. </span>${question2Answer1}</md-list-item><md-divider></md-divider>`;
  } else if (question2.value < 8) {
    answersList.innerHTML += `<md-list-item><span style="font-weight: bold;">2. </span>${question1Answer2}</md-list-item><md-divider></md-divider>`;
  } else {
    answersList.innerHTML += `<md-list-item><span style="font-weight: bold;">2. </span>${question2Answer3}</md-list-item><md-divider></md-divider>`;
  }

  const question3 = form.querySelectorAll(".question3-answer md-checkbox");
  const selectedAnswers = Array.from(question3)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({
      text: checkbox.nextElementSibling.textContent,
      tooltip: checkbox.getAttribute("data-tooltip"),
    }));

  if (selectedAnswers.length === 0) {
    answersList.innerHTML += `<md-list-item> <span style="font-weight: bold;">3. </span>W pytaniu 3 nie wybrałeś żadnej odpowiedzi. To świetna wiadomość! Pamiętaj jednak, że zidentyfikowanie trudności to pierwszy krok do ich rozwiązania.</md-list-item><md-divider></md-divider>`;
  }
  for (const answer of selectedAnswers) {
    answersList.innerHTML += `
<md-list-item>
  <span style="font-weight: bold;">3. ${answer.text}:</span> ${answer.tooltip}
</md-list-item>
<md-divider></md-divider>
`;
  }

  document.querySelectorAll('md-radio[name="q4"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelectorAll('md-radio[name="q4"]').forEach((r) => {
        r.removeAttribute("checked");
      });
      radio.setAttribute("checked", "");
    });
  });

  document.querySelectorAll('md-radio[name="q5"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelectorAll('md-radio[name="q5"]').forEach((r) => {
        r.removeAttribute("checked");
      });
      radio.setAttribute("checked", "");
    });
  });

  const question5 = form.querySelector('md-radio[name="q5"][checked]');
  if (question5 && question5.getAttribute("value") === "yes") {
    answersList.innerHTML += `
<md-list-item><span style="font-weight: bold;">5. </span>Świetnie, że wiesz, do kogo się zwrócić po pomoc! Zapisz sobie w odpowiednim miejscu osobę lub instytucję oraz preferowaną formę kontaktu (rozmowa, e-mail, konsultacja online itp.).
</md-list-item>
`;
  } else if (question5) {
    answersList.innerHTML += `
<md-list-item><span style="font-weight: bold;">5. </span>Zastanów się, w jakim obszarze potrzebujesz wsparcia i gdzie możesz go poszukać (punkt 4).</md-list-item>
`;
  }
  answersList.classList.add("show");

  answersList.scrollIntoView({
    behavior: "smooth",
    block: "start", // Ensures the element aligns with the top of the viewport
  });
});