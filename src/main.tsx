const { google } = require("googleapis");
const keys = require("./keys.json");
export {};

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err: any, tokens: any) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
    gsrun(client);
  }
});

async function gsrun(cl: any) {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  const opt = {
    spreadsheetId: "1VQFOFhXy9BFMET9yp_xL3PIfgKW88J_ymkYc-bTj6lg",
    range: "Tap List Data!A1:P63",
  };
  let data = await gsapi.spreadsheets.values.get(opt);
  let dataArray = data.data.values;
  let newDataArray = dataArray.map(function (row: any) {
    // row.push(row[0] + "-" + row[1]);
    return row;
  });

  // const updateOpt = {
  //   spreadsheetId: "1VQFOFhXy9BFMET9yp_xL3PIfgKW88J_ymkYc-bTj6lg",
  //   range: "Tap List Data!A1:P63",
  //   valueInputOption: "USER_ENTERED",
  //   resource: { values: newDataArray },
  // };
  // let res = await gsapi.spreadsheets.values.update(updateOpt);

  // console.log(res);
  console.log(newDataArray);
}
