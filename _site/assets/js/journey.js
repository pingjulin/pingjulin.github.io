(function () {
  var journey = document.querySelector('[data-journey]');
  if (!journey) return;
  var places = JSON.parse(journey.querySelector('[data-journey-data]').textContent);
  var cities = { pku: 'beijing', tsinghua: 'beijing', usc: 'la', gwu: 'dc' };
  var controls = journey.querySelectorAll('[data-select-place]');
  function selectPlace(id) {
    var place = places.find(function (item) { return item.id === id; });
    if (!place) return;
    controls.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.selectPlace === id));
    });
    journey.querySelectorAll('[data-campus]').forEach(function (card) {
      card.classList.toggle('is-selected', card.dataset.campus === id);
    });
    journey.querySelectorAll('[data-city]').forEach(function (dot) {
      dot.classList.toggle('is-selected', dot.dataset.city === cities[id]);
    });
    journey.querySelector('[data-detail-period]').textContent = place.period + ' · ' + place.city;
    journey.querySelector('[data-detail-name]').textContent = place.name;
    journey.querySelector('[data-detail-role]').textContent = place.role;
    journey.querySelector('[data-detail-description]').textContent = place.description;
    journey.querySelector('[data-detail-link]').href = place.url;
  }
  controls.forEach(function (button) {
    button.addEventListener('click', function () { selectPlace(button.dataset.selectPlace); });
  });
  selectPlace('pku');
}());
