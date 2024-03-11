window.onload = function() {
    fetch('/test/news/html/news.json') // 修改为你的 JSON 数据源
    .then(response => response.json())
    .then(data => {
        var accordion = document.getElementById('accordion');

        // 只选取前10条新闻
        var topNews = data.slice(0, 10);

        // 遍历 JSON 数据中的每一条新闻
        topNews.forEach((newsItem) => {
            var newsContainer = document.createElement('div');

            // 对 newsItem.category 进行 switch-case 判断
            let icon;
            switch (newsItem.category) {
                case '綜合':
                    icon = 'info';
                    break;
                case '重要':
                    icon = 'danger';
                    break;
                case '維護':
                    icon = 'warning';
                    break;
                case '活動':
                    icon = 'success';
                    break;
                case '更新':
                    icon = 'purple';
                    break;
                default:
                    icon = 'other';
            }

            // 设置新闻容器内容
            newsContainer.innerHTML = `
                <h3 class="accordion-header"><span class="label label-${icon} label-white middle">${newsItem.category}</span> ${newsItem.title}</h3>
                <div>
                    <p>
                        ${newsItem.content}
                    </p>
                </div>
            `;

            // 添加新闻容器到 accordion
            accordion.appendChild(newsContainer);
        });

        // 更新或执行'accordion'
        if($.isFunction($.fn.accordion)){
            $( "#accordion" ).accordion("refresh");
        } else {
            $( "#accordion" ).accordion({
                collapsible: true ,
                heightStyle: "content",
                animate: 250,
                header: ".accordion-header"
            });
        }
    })
    .catch((error) => console.error('Error:', error));
};