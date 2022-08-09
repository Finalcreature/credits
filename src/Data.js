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
let currentRole = null;
let isAdded = false;

function evaluateRole(role) {
  if (role !== currentRole) {
    if (role) {
      if (role.includes("Voice") || role.includes("Actor")) {
        currentRole = role;
        isAdded = window.confirm("Include " + role);
      }
    }
  } else {
    console.log("add = " + isAdded);
  }
}

function toSingular(role) {
  if (role.textContent.endsWith("s")) {
    console.log(role.textContent + " is plural");
    role.textContent = role.textContent.slice(0, -1);
  }
  return role;
}

function getRelevantData() {
  const item = document.getElementsByTagName("a");

  try {
    console.log(item[0].textContent);
    for (let index = 0; index < item.length; index++) {
      evaluateRole(
        evaluateRole(
          item[index].parentElement.parentElement.childNodes[0].textContent
        )
      );
      let person = new Personal(
        item[index].textContent,
        toSingular(
          item[index].parentElement.parentElement.childNodes[0]
        ).textContent
      );

      personnels.push(person);
    }
    console.log(personnels);
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
        <CSVLink data={personnels}>Download me</CSVLink>
      </div>
    </div>
  );
};

// console.log(personnels);

export default Data;
