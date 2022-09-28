// logic map

var map = L.map("map").setView([-6.189004, 106.827743], 12);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

var theMarker = {};

var selected_coordinate;

map.on("click", function (e) {
  lat = e.latlng.lat;
  lon = e.latlng.lng;
  selected_coordinate = e.latlng;

  if (theMarker != undefined) {
    map.removeLayer(theMarker);
  }

  theMarker = L.marker([lat, lon]).addTo(map);
});

// logic data handling

var project_list = [];

var items;

class Product {
  constructor(owner, name, category, value, coordinate) {
    this.owner = owner;
    this.name = name;
    this.category = category;
    this.value = value;
    this.coordinate = coordinate;
  }
}

const submit = async () => {
  const owner = document.getElementById("namaOwner").value;
  const nama = document.getElementById("namaProyek").value;
  const category = document.getElementById("categoryProyek").value;
  const value = document.getElementById("nilaiProyek").value;
  const coordinate = selected_coordinate;

  const project = new Product(owner, nama, category, value, coordinate);

  project_list.push(project);

  localStorage.setItem("listProject", JSON.stringify(project_list));

  items = JSON.parse(localStorage.getItem("listProject"));
};

const show = (item = items) => {
  document.querySelector("tbody").innerHTML = "";

  let row_html = "";

  item.forEach((obj) => {
    const row = `<tr>
                        <td>${obj.name}</td>
                        <td>${obj.owner}</td>
                        <td>${obj.category}</td>
                        <td>Rp. ${obj.value}</td>
                        <td><a href="javascript:;" onclick="showMap(${obj.coordinate.lat}, ${obj.coordinate.lng})">Show</a></td>
                   </tr>`;
    row_html += row;
  });

  document.querySelector("tbody").innerHTML += row_html;
};

const filterName = (selected_name) => {
  const hasil = items.filter((obj) => {
    return obj.name.includes(selected_name);
  });

  show(hasil);
};

const filterValue = () => {
  const check_input = document.getElementById("flexSwitchCheckChecked");

  check_input.checked
    ? items.sort((a, b) => b.value - a.value)
    : items.sort((a, b) => a.value - b.value);

  show(items);
};

const showMap = (lat, long) => {
  document.getElementById(
    "gmap_canvas"
  ).src = `https://maps.google.com/maps?q=${lat},${long}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
};

$(window).scroll(function () {
  //- 10 = desired pixel distance from the bottom of the page while scrolling)
  if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
    var box = $(".container");
    //Just append some content here
    box.html(box.html() + $(".page").html());
  }
});
