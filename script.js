function get_data(url){
  $.get(url, function(data){
    console.log(data);
    var states_data = parse_states_data(data);
     var table_data = get_states_table(states_data);
    $("#states").html(table_data);
  });
}

function parse_states_data(data){
  var states = [];
  for (var state in data){
    var confirmed = 0;
    var deceased = 0;
    var recovered = 0;
    for (var district in data[state]["districtData"]) {
      confirmed += data[state]["districtData"][district]["confirmed"];
      deceased += data[state]["districtData"][district]["deceased"];
       recovered += data[state]["districtData"][district]["recovered"];
    }
    states.push([state, confirmed, recovered, deceased]);
  }
  return states;
}
function get_states_table(states){
  var html = "";
  html +=
    "<tr><th>State</th><th>Confirmed</th><th>Recovered</th><th>Deceased</th></tr>";
  for (var i = 0; i < states.length; i++){
    html +=
      "<tr><td>" +
      states[i][0] +
       "</td><td>" +
      states[i][1] +
       "</td><td>" +
      states[i][2] +
       "</td><td>" +
      states[i][3] +
       "</td></tr>";
     console.log(html);
  }
  return html;
}
function start_up(){
  get_data("https://api.covid19india.org/state_district_wise.json");
}
$(document).ready(start_up);