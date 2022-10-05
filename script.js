// Dit kan dmv .getElementById(‘id_hier’).value

// document.createElement geeft je het element terug. hier kun je
// bijvoorbeeld de element.classList of element.className gebruiken om de juiste classes te geven.
// zelfde geld met element.id
//
// var newNode = document.createElement('div');
// newNode.className = 'textNode news content';

//
//   -----------------Get Data At Start--------------------
//

async function getDataStart() {
  try {
    let res = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    let json = await res.json();
    console.log("json geconverteerd is: ", json);

    //
    //   -----------------Data in de DOM plaatsen At Start--------------------
    //

    for (let nummer of json) {
      const listItem = document.createElement("li"); // Create element
      listItem.className = "todoItem";

      listItem.innerHTML = nummer.description;

      const huidigeList = document.querySelector("ul"); //  Selecteer waarin het moet
      huidigeList.appendChild(listItem); // plaats element

      // nu de prullenbak image plaatsen

      let prullenbakImage = document.createElement("img"); // creeer een image element in de DOM
      prullenbakImage.className = "prullenbak";
      prullenbakImage.src = "/img/prullenbak.jpg";

      prullenbakImage.innerHTML = prullenbakImage;
      const prul = document.querySelector("ul");
      prul.appendChild(prullenbakImage);
    }

    return json;
  } catch (error) {
    console.log("foutmelding: ", error);
  }
}

getDataStart();

//
//   -----------------Start addEvent Listener--------------------
//

const pakButton = document.querySelector("button");
pakButton.addEventListener("click", function (event) {
  event.preventDefault();
  let resultaat = document.getElementById("taak").value;
  console.log("test resultaat:", resultaat);

  // ------------------Na click, verwijder oude data en prullenbak uit de DOM------------
  //  aan het uit proberen:
  //const eenPrullenbak = document.getElementById("ingevoerdeLijst");
  //while (eenPrullenbak.firstChild) {
  // eenPrullenbak.removeChild(eenPrullenbak)};

  //

  async function getDataStart() {
    try {
      let res = await fetch("http://localhost:3000/", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      let json = await res.json();

      function verwijder() {
        for (let x of json) {
          const huidigeList = document.getElementById("ingevoerdeLijst");
          const kind = huidigeList.getElementsByTagName("li")[0];
          huidigeList.removeChild(kind);
        }
      }
      verwijder();

      return json;
    } catch (error) {
      console.log("foutmelding: ", error);
    }
  }
  getDataStart();
  //
  //   -----------------Post nieuwe Data--------------------
  //
  const data = { description: resultaat, done: false };

  async function postData() {
    try {
      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      let json = await res.json();
      return json;
    } catch (error) {
      console.log("foutmelding: ", error);
    }
  }

  console.log(postData());

  //
  //   -----------------Get new Data--------------------
  //

  async function getData() {
    try {
      let res = await fetch("http://localhost:3000/", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      let json = await res.json();
      console.log("json geconverteerd is: ", json);

      //
      //   -----------------Data in de DOM plaatsen--------------------
      //

      for (let nummer of json) {
        console.log("gevraagde elementen:", nummer.description);
        const listItem = document.createElement("li"); // Create element

        listItem.innerHTML = nummer.description;

        const huidigeList = document.querySelector("ul"); //  Selecteer waarin het moet
        huidigeList.appendChild(listItem); // plaats element
      }

      return json;
    } catch (error) {
      console.log("foutmelding: ", error);
    }
  }
  console.log("get data() is: ", getData());
});
