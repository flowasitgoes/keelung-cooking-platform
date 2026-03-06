(function() {
  // 替換為你的 Google Form 嵌入網址（需含 ?embedded=true）
  // Replace with your Google Form embed URL (include ?embedded=true)
  var STUDENT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScNyDcKpabN0jMZY7hBpJJdx4_S_-6QFixjLRSF6lpC-1bfpw/viewform?embedded=true';
  var CHEF_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdGRP3MPlMG-h93p07u-aLASnk4w-AvQ75ZRbHEcGk0My7dmg/viewform?embedded=true';

  window.STUDENT_FORM_URL = STUDENT_FORM_URL || '';
  window.CHEF_FORM_URL = CHEF_FORM_URL || '';
  window.FORM_IS_PLACEHOLDER = function(url) { return !url || url.indexOf('placeholder') !== -1; };

  var courses = [
    { id: '1', dish: '紅燒魚 Braised Fish', chefName: '陳阿嬤 Chef Chen', chefAge: 72, location: '中正區 Zhongzheng District', time: '週六 15:00 Saturday 3pm', price: 'NT$900', videoId: 'KiC-fFSGzlk', channel: 'Made With Lau' },
    { id: '2', dish: '滷肉飯 Braised Pork Rice', chefName: '林爺爺 Chef Lin', chefAge: 68, location: '仁愛區 Ren\'ai District', time: '週日 10:00 Sunday 10am', price: 'NT$750', videoId: 'vclni-aCQBQ', channel: '老娘的草根飯堂' },
    { id: '3', dish: '地瓜球 Sweet Potato Balls', chefName: '王阿姨 Chef Wang', chefAge: 65, location: '信義區 Xinyi District', time: '週六 14:00 Saturday 2pm', price: 'NT$600', videoId: 'X143cayfwP8', channel: '老吳料理研究所' },
    { id: '4', dish: '肉羹湯 Meat Thick Soup', chefName: '李阿公 Chef Lee', chefAge: 75, location: '中正區 Zhongzheng District', time: '週日 16:00 Sunday 4pm', price: 'NT$850', videoId: 'w0Mn3F7A9G0', channel: '莊師傅的廚房' },
    { id: '5', dish: '咖哩烏龍炒麵 Curry Stir-fry Udon', chefName: '吳奶奶 Chef Wu', chefAge: 70, location: '仁愛區 Ren\'ai District', time: '週六 11:00 Saturday 11am', price: 'NT$800', videoId: 'B2CagrHP56k', channel: '潔西廚房' },
    { id: '6', dish: '麻油雞 Sesame Oil Chicken', chefName: '黃阿嬤 Chef Huang', chefAge: 58, location: '安樂區 Anle District', time: '週日 12:00 Sunday 12pm', price: 'NT$950', videoId: 'ohfuL6Iry-E', channel: '砂煲美食學習' },
    { id: '7', dish: '古早味米粉湯 Traditional Rice Noodle Soup', chefName: '鄭阿嬤 Chef Zheng', chefAge: 69, location: '中正區 Zhongzheng District', time: '週六 10:00 Saturday 10am', price: 'NT$700', videoId: '0dybGTfJhQo', channel: 'YouTube' },
    { id: '8', dish: '糯米珍珠丸 Sticky Rice Pearl Balls', chefName: '謝爺爺 Chef Hsieh', chefAge: 71, location: '仁愛區 Ren\'ai District', time: '週日 14:00 Sunday 2pm', price: 'NT$650', videoId: 'h7QiE3q0QI8', channel: 'Chinese Cooking Demystified' },
    { id: '9', dish: '皮蛋瘦肉粥 Preserved Egg & Pork Congee', chefName: '張阿姨 Chef Chang', chefAge: 62, location: '信義區 Xinyi District', time: '週六 09:00 Saturday 9am', price: 'NT$550', videoId: '0JjJCH18_GU', channel: '一鍋搞定' },
    { id: '10', dish: '鴨賞炒飯 Duck Yasan Fried Rice', chefName: '劉阿公 Chef Liu', chefAge: 66, location: '安樂區 Anle District', time: '週日 11:00 Sunday 11am', price: 'NT$800', videoId: 'XE-6FrisksE', channel: 'YouTube' }
  ];

  function getPageId() {
    var path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('/index.html')) return 'index';
    if (path.includes('courses')) return 'courses';
    if (path.includes('student')) return 'student';
    if (path.includes('chef')) return 'chef';
    if (path.includes('about')) return 'about';
    return '';
  }

  function setActiveNav() {
    var page = getPageId();
    document.querySelectorAll('.bottom-nav__item').forEach(function(el) {
      el.classList.toggle('is-active', el.getAttribute('data-page') === page);
    });
  }

  function renderCourseCard(course) {
    var joinUrl = '/student.html';
    if (course.dish) joinUrl += '?course=' + encodeURIComponent(course.dish);
    var media = course.videoId
      ? '<div class="card__video"><iframe src="https://www.youtube.com/embed/' + escapeHtml(course.videoId) + '?rel=0" title="' + escapeHtml(course.dish) + ' 示意影片" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
      : '<img class="card__image" src="' + (course.image || '/public/assets/images/placeholder.svg') + '" alt="">';
    var hint = course.videoId ? '<p class="card__video-hint">影片僅供參考，由廚師親自教授此 YouTuber 所分享的這道菜，或相似的菜</p>' : '';
    var credit = course.videoId && course.channel ? '<p class="card__video-credit">Credit: ' + escapeHtml(course.channel) + ' (YouTube)</p>' : '';
    return (
      '<article class="card">' +
        media +
        '<div class="card__body">' +
          hint +
          credit +
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
    if (!('serviceWorker' in navigator)) return;
    var isLocalhost = /^https?:\/\/localhost(\:|$)/.test(location.origin) || /^https?:\/\/127\.0\.0\.1(\:|$)/.test(location.origin);
    if (isLocalhost) return;
    navigator.serviceWorker.register('/sw.js').catch(function() {});
  }

  setActiveNav();
  initCourses();
  initSw();
})();
