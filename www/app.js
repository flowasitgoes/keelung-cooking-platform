(function() {
  // 替換為你的 Google Form 嵌入網址（需含 ?embedded=true）
  // Replace with your Google Form embed URL (include ?embedded=true)
  var STUDENT_FORM_URL = '';
  var CHEF_FORM_URL = '';

  window.STUDENT_FORM_URL = STUDENT_FORM_URL || '';
  window.CHEF_FORM_URL = CHEF_FORM_URL || '';
  window.FORM_IS_PLACEHOLDER = function(url) { return !url || url.indexOf('placeholder') !== -1; };

  var courses = [
    { id: '1', dish: '紅燒魚 Braised Fish', chefName: '陳阿嬤 Chef Chen', chefAge: 72, location: '中正區 Zhongzheng District', time: '週六 15:00 Saturday 3pm', price: 'NT$900', image: './assets/images/placeholder.svg' },
    { id: '2', dish: '滷肉飯 Braised Pork Rice', chefName: '林爺爺 Chef Lin', chefAge: 68, location: '仁愛區 Ren\'ai District', time: '週日 10:00 Sunday 10am', price: 'NT$750', image: './assets/images/placeholder.svg' },
    { id: '3', dish: '地瓜球 Sweet Potato Balls', chefName: '王阿姨 Chef Wang', chefAge: 65, location: '信義區 Xinyi District', time: '週六 14:00 Saturday 2pm', price: 'NT$600', image: './assets/images/placeholder.svg' },
    { id: '4', dish: '海鮮羹 Seafood Soup', chefName: '李阿公 Chef Lee', chefAge: 75, location: '中正區 Zhongzheng District', time: '週日 16:00 Sunday 4pm', price: 'NT$850', image: './assets/images/placeholder.svg' },
    { id: '5', dish: '基隆廟口小吃 Keelung Temple Snacks', chefName: '吳奶奶 Chef Wu', chefAge: 70, location: '仁愛區 Ren\'ai District', time: '週六 11:00 Saturday 11am', price: 'NT$800', image: './assets/images/placeholder.svg' },
    { id: '6', dish: '麻油雞 Sesame Oil Chicken', chefName: '黃阿嬤 Chef Huang', chefAge: 58, location: '安樂區 Anle District', time: '週日 12:00 Sunday 12pm', price: 'NT$950', image: './assets/images/placeholder.svg' },
    { id: '7', dish: '鼎邊趖 Dingbiancuo', chefName: '鄭阿嬤 Chef Zheng', chefAge: 69, location: '中正區 Zhongzheng District', time: '週六 10:00 Saturday 10am', price: 'NT$700', image: './assets/images/placeholder.svg' },
    { id: '8', dish: '天婦羅甜不辣 Tempura', chefName: '謝爺爺 Chef Hsieh', chefAge: 71, location: '仁愛區 Ren\'ai District', time: '週日 14:00 Sunday 2pm', price: 'NT$650', image: './assets/images/placeholder.svg' },
    { id: '9', dish: '營養粥品 Congee', chefName: '張阿姨 Chef Chang', chefAge: 62, location: '信義區 Xinyi District', time: '週六 09:00 Saturday 9am', price: 'NT$550', image: './assets/images/placeholder.svg' },
    { id: '10', dish: '家常小炒 Stir-fry', chefName: '劉阿公 Chef Liu', chefAge: 66, location: '安樂區 Anle District', time: '週日 11:00 Sunday 11am', price: 'NT$800', image: './assets/images/placeholder.svg' }
  ];

  function getPageId() {
    var path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('/index.html')) return 'index';
    if (path.includes('courses')) return 'courses';
    if (path.includes('student')) return 'student';
    if (path.includes('chef')) return 'chef';
    return '';
  }

  function setActiveNav() {
    var page = getPageId();
    document.querySelectorAll('.bottom-nav__item').forEach(function(el) {
      el.classList.toggle('is-active', el.getAttribute('data-page') === page);
    });
  }

  function renderCourseCard(course) {
    var joinUrl = './student.html';
    if (course.dish) joinUrl += '?course=' + encodeURIComponent(course.dish);
    return (
      '<article class="card">' +
        '<img class="card__image" src="' + (course.image || './assets/images/placeholder.svg') + '" alt="">' +
        '<div class="card__body">' +
          '<h3 class="card__title">' + escapeHtml(course.dish) + '</h3>' +
          '<p class="card__meta">' + escapeHtml(course.chefName) + (course.chefAge ? ' (' + course.chefAge + ')' : '') + '</p>' +
          '<p class="card__meta">' + escapeHtml(course.location) + '</p>' +
          '<p class="card__meta">' + escapeHtml(course.time) + '</p>' +
          '<p class="card__price">' + escapeHtml(course.price) + '</p>' +
          '<a href="' + joinUrl + '" class="btn btn--primary">加入課程 Join Class</a>' +
        '</div>' +
      '</article>'
    );
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderCourses(containerId, list) {
    var el = document.getElementById(containerId);
    if (!el || !list || !list.length) return;
    el.innerHTML = list.map(renderCourseCard).join('');
  }

  function initCourses() {
    var featured = document.getElementById('featured-courses');
    var grid = document.getElementById('courses-grid');
    var list = courses.slice(0, 6);
    if (featured) renderCourses('featured-courses', list);
    if (grid) renderCourses('courses-grid', courses);
  }

  function initSw() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(function() {});
    }
  }

  setActiveNav();
  initCourses();
  initSw();
})();
