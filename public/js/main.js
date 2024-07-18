document.addEventListener('DOMContentLoaded', () => {
    const newsArticles = document.getElementById('news-articles');
    const loginForm = document.getElementById('login-form');
    const addNewsForm = document.getElementById('add-news-form');
    const loginButton = document.getElementById('login-button');
    const addNewsButton = document.getElementById('add-news-button');
    const logoutButton = document.getElementById('logout-button');
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };
  
    const fetchNews = async () => {
      const response = await fetch('/api/news');
      const news = await response.json();
      newsArticles.innerHTML = news.map(article => `
        <tr>
          <td>${article.title}</td>
          <td>${article.content}</td>
          <td>${formatDate(article.date)}</td>
        </tr>
      `).join('');
    };
  
    fetchNews();
  
    loginButton.addEventListener('click', () => {
      // Implement login logic here
      loginForm.style.display = 'none';
      addNewsForm.style.display = 'block';
    });
  
    addNewsButton.addEventListener('click', async () => {
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const date = document.getElementById('date').value;
  
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, date }),
      });
  
      if (response.ok) {
        fetchNews();
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('date').value = '';
      }
    });
  
    logoutButton.addEventListener('click', () => {
      // Implement logout logic here
      loginForm.style.display = 'block';
      addNewsForm.style.display = 'none';
    });
  });
  