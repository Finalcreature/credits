import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Table from "./html";

class Personal {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

const personnels = [{}];
const voices = [{}];
let currentRole = null;
let isAdded = true;

function evaluateRole(role) {
  if (role) {
    if (role !== currentRole) {
      {
        if (
          role.toLowerCase().includes("voice") ||
          role.toLowerCase().includes("actor")
        ) {
          currentRole = role;
          isAdded = window.confirm("Include " + role);
          if (!isAdded) {
            console.log("didn't add " + role);
          }
        } else isAdded = true;
      }
    }
  }
  return isAdded;
}

function toSingular(role) {
  if (
    role.textContent.endsWith("s") &&
    !role.textContent.toLowerCase().includes("thanks")
  ) {
    role.textContent = role.textContent.slice(0, -1);
  }
  return role;
}

function getRelevantData() {
  const item = document.querySelectorAll("a:not(.CSV-link)");

  try {
    console.log(item[0].textContent);
    for (let index = 0; index < item.length; index++) {
      let person = new Personal(
        item[index].textContent,
        toSingular(
          item[index].parentElement.parentElement.childNodes[0]
        ).textContent
      );
      if (
        evaluateRole(
          item[index].parentElement.parentElement.childNodes[0].textContent
        )
      ) {
        personnels.push(person);
      } else {
        voices.push(person);
      }
    }
    console.log(personnels);
    console.log(voices);
  } catch (err) {
    const loadButton = document.createElement("button");
    loadButton.innerHTML = "Load Credits";
    loadButton.addEventListener("click", getRelevantData);
    document.body.append(loadButton);
    console.log(err);
  }
}

//need to turn off on first load
getRelevantData();

const Data = (props) => {
  //   const value = `
  //   `;

  //   let arrayOfCredits = value.split(" ");
  //   let roles = [];

  //   arrayOfCredits.forEach((e) => {
  //     if (e.includes(":")) {
  //       e = e.replace(":", "");
  //       roles.push(e);
  //     } else if (e !== "" && !e.includes(",")) {
  //       props.names.push(e);

  //       let person = new Personal(e, roles[roles.length - 1]);
  //       personnels.push(person);
  //     }
  //   });
  //   props.names.push(personnels);

  return (
    <div>
      <Table />
      <div>
        <CSVLink filename={"Full list.csv"} data={personnels}>
          Download Full list
        </CSVLink>
      </div>
      <div>
        <CSVLink filename={"Voice-Actors.csv"} data={voices}>
          Download Voice Actors
        </CSVLink>
      </div>
    </div>
  );
};

// console.log(personnels);

export default Data;
