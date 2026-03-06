(function() {
  var STUDENT_FORM_URL = '';
  var CHEF_FORM_URL = '';

  window.STUDENT_FORM_URL = STUDENT_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSfplaceholder/viewform?embedded=true';
  window.CHEF_FORM_URL = CHEF_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSfplaceholder/viewform?embedded=true';

  var courses = [
    { id: '1', dish: '紅燒魚 Braised Fish', chefName: '陳阿嬤', chefAge: 72, location: '中正區 Zhongzheng District', time: '週六 15:00 Saturday 3pm', price: 'NT$900', image: './assets/images/placeholder.svg' },
    { id: '2', dish: '滷肉飯 Braised Pork Rice', chefName: '林奶奶', chefAge: 68, location: '仁愛區 Renai District', time: '週日 10:00 Sunday 10am', price: 'NT$750', image: './assets/images/placeholder.svg' },
    { id: '3', dish: '地瓜球 Sweet Potato Balls', chefName: '王阿姨', chefAge: 58, location: '信義區 Xinyi District', time: '週六 14:00 Saturday 2pm', price: 'NT$600', image: './assets/images/placeholder.svg' },
    { id: '4', dish: '基隆廟口羹 Temple Thick Soup', chefName: '李師傅', chefAge: 75, location: '中正區 Zhongzheng District', time: '週五 19:00 Friday 7pm', price: 'NT$850', image: './assets/images/placeholder.svg' },
    { id: '5', dish: '古早味油飯 Traditional Glutinous Rice', chefName: '張阿公', chefAge: 80, location: '安樂區 Anle District', time: '週日 11:00 Sunday 11am', price: 'NT$800', image: './assets/images/placeholder.svg' },
    { id: '6', dish: '石花凍 Agar Jelly', chefName: '吳阿姨', chefAge: 62, location: '中正區 Zhongzheng District', time: '週六 16:00 Saturday 4pm', price: 'NT$500', image: './assets/images/placeholder.svg' }
  ];

  function getPageId() {
    var path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('index.html')) return 'index';
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
    if (course.id) joinUrl += '?course=' + encodeURIComponent(course.dish);
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
